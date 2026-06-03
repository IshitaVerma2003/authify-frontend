import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        console.log("TASK DATA:", data);
        setTasks(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={styles.page}>
      
      {/* TOP HEADER */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.heading}>Assigned Tasks</h1>

          <p style={styles.subHeading}>
            Manage and track all assigned tasks easily
          </p>
        </div>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/todo")}
        >
          ← Back
        </button>
      </div>

      {/* TASK TABLE */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          
          <thead>
            <tr>
              <th style={styles.th}>📌 Title</th>
              <th style={styles.th}>📝 Description</th>
              <th style={styles.th}>📊 Status</th>
              <th style={styles.th}>👤 Assignee</th>
              <th style={styles.th}>⏰ Start Time</th>
              <th style={styles.th}>📅 Due Date</th>
              <th style={styles.th}>⌛ End Time</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                style={styles.tr}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f8fafc";
                  e.currentTarget.style.transform = "scale(1.01)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#ffffff";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <td style={styles.td}>
                  {task.title || "-"}
                </td>

                <td style={styles.td}>
                  {task.description || "-"}
                </td>

                <td
                  style={{
                    ...styles.td,
                    color:
                      task.status === "Completed"
                        ? "#16a34a"
                        : task.status === "In Progress"
                        ? "#2563eb"
                        : task.status === "On Hold"
                        ? "#d97706"
                        : "#111827",
                    fontWeight: "800",
                  }}
                >
                  {task.status || "-"}
                </td>

                <td style={styles.td}>
                  {task.assignee || "-"}
                </td>

                <td style={styles.td}>
                  {task.startTime || "-"}
                </td>

                <td style={styles.td}>
                  {task.dueDate || "-"}
                </td>

                <td style={styles.td}>
                  {task.endTime || "-"}
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
<div style={styles.footer}>
  © 2026 Authify | Built by Ishita
</div>
    </div>
  );
}

const styles = {
  
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    padding: "45px",
    fontFamily: "'Poppins', sans-serif",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "35px",
  },

  heading: {
    fontSize: "64px",
    fontWeight: "900",
    color: "#111827",
    marginBottom: "10px",
    letterSpacing: "-2px",
  },

  subHeading: {
    color: "#64748b",
    fontSize: "18px",
    fontWeight: "500",
  },

  backBtn: {
    background: "#355c7d",
    color: "white",
    border: "none",
    padding: "14px 28px",
    borderRadius: "16px",
    fontSize: "17px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },

  tableContainer: {
    background: "#ffffff",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0,0,0,0.06)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    background: "#355c7d",
    color: "white",
    padding: "22px",
    textAlign: "center",
    fontSize: "17px",
    fontWeight: "800",
    letterSpacing: "0.5px",
    textTransform: "uppercase",
  },

  tr: {
    transition: "0.3s",
    cursor: "pointer",
  },

  td: {
    padding: "22px",
    textAlign: "center",
    borderBottom: "1px solid #e5e7eb",
    color: "#111827",
    fontSize: "16px",
    fontWeight: "600",
    background: "#ffffff",
  },
  footer: {
  marginTop: "40px",
  textAlign: "center",
  color: "#64748b",
  fontSize: "15px",
  fontWeight: "500",
},
};

export default TaskList;