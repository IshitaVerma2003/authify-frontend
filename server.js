const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123@Ishita",
  database: "tododb"
});

db.connect((err) => {
  if (err) {
    console.log("Database connection error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/", (req, res) => {
  res.send("Backend working 🚀");
});

app.post("/api/auth/register", (req, res) => {
  console.log("REGISTER DATA:", req.body);

  res.json({
    message: "Register working"
  });
});

/* SAVE TASK */
app.post("/tasks", (req, res) => {

  console.log("FULL TASK BODY:");
  console.log(req.body);

  const {
    title,
    description,
    status,
    assignee,
    startTime,
    dueDate,
    endTime
  } = req.body;

  console.log("TITLE:", title);
  console.log("DESCRIPTION:", description);
  console.log("STATUS:", status);
  console.log("ASSIGNEE:", assignee);
  console.log("START TIME:", startTime);
  console.log("DUE DATE:", dueDate);
  console.log("END TIME:", endTime);

  const sql = `
    INSERT INTO tasks
    (title, description, status, assignee, startTime, dueDate, endTime)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      title,
      description,
      status,
      assignee,
      startTime,
      dueDate,
      endTime
    ],
    (err, result) => {

      if (err) {

        console.log("DATABASE INSERT ERROR:", err);

        return res.status(500).json({
          error: err.sqlMessage || "Database insert failed"
        });
      }

      console.log("TASK SAVED SUCCESSFULLY");
      console.log("INSERT ID:", result.insertId);

      res.json({
        message: "Task Saved Successfully",
        id: result.insertId
      });

    }
  );
});

/* GET ALL TASKS */
app.get("/tasks", (req, res) => {

  db.query(
    "SELECT * FROM tasks ORDER BY id DESC",
    (err, result) => {

      if (err) {

        console.log("DATABASE FETCH ERROR:", err);

        return res.status(500).json({
          error: err.sqlMessage || "Database fetch failed"
        });
      }

      res.json(result);

    }
  );

});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});