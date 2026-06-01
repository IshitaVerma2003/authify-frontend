import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Todo() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const emptyTask = {
    title: "",
    description: "",
    status: "Not Started",
    assignee: "",
    startTime: "",
    dueDate: "",
    endTime: "",
  };

  const [task, setTask] = useState(emptyTask);

  if (!token) {
    return <Navigate to="/" />;
  }

  const handleChange = (e) => {

    const { name, value } = e.target;

    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSave = async () => {

    if (!task.title || !task.description) {
      alert("Please enter title and description");
      return;
    }

    try {

      const response = await fetch("http://localhost:8080/tasks", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(task),

      });

      const data = await response.json();

      if (data.message) {
        alert(data.message);
      } else {
        alert("Task Saved Successfully 🚀");
      }

      setTask(emptyTask);

    } catch (error) {

      console.log(error);

      alert("Error saving task");

    }

  };

  const handleCancel = () => {
    setTask(emptyTask);
  };

  return (

    <div style={styles.page}>

      {/* SIDEBAR */}

      <aside style={styles.sidebar}>

        <h2 style={styles.logo}>
          ⚡ Authify
        </h2>

        <button style={styles.newProject}>
          + New Project
        </button>

        <button
          style={styles.dashboardButton}
          onClick={() => navigate("/dashboard")}
        >
          📊 Overall Dashboard
        </button>

      </aside>

      {/* MAIN CONTENT */}

      <main style={styles.main}>

        <button
          style={styles.backButton}
          onClick={() => navigate("/tasklist")}
        >
          ← Back to Tasks
        </button>

        {/* GLASS CARD */}

        <div style={styles.card}>

          <div style={styles.cardHeader}>
            🚀 Add New Task
          </div>

          {/* TITLE */}

          <label style={styles.label}>
            Title *
          </label>

          <input
            type="text"
            name="title"
            placeholder="Enter task title"
            value={task.title}
            onChange={handleChange}
            style={styles.input}
          />

          {/* DESCRIPTION */}

          <label style={styles.label}>
            Description
          </label>

          <textarea
            name="description"
            placeholder="Describe your task..."
            value={task.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          {/* STATUS + ASSIGNEE */}

          <div style={styles.row}>

            <div style={styles.field}>

              <label style={styles.label}>
                Status
              </label>

              <select
                name="status"
                value={task.status}
                onChange={handleChange}
                style={styles.input}
              >

                <option value="Not Started">
                  Not Started
                </option>

                <option value="In Progress">
                  In Progress
                </option>

                <option value="Completed">
                  Completed
                </option>

              </select>

            </div>

            <div style={styles.field}>

              <label style={styles.label}>
                Assignee
              </label>

              <input
                type="text"
                name="assignee"
                placeholder="Enter assignee"
                value={task.assignee}
                onChange={handleChange}
                style={styles.input}
              />

            </div>

          </div>

          {/* DATE ROW */}

          <div style={styles.row}>

            <div style={styles.field}>

              <label style={styles.label}>
                Start Time
              </label>

              <input
                type="datetime-local"
                name="startTime"
                value={task.startTime}
                onChange={handleChange}
                style={styles.input}
              />

            </div>

            <div style={styles.field}>

              <label style={styles.label}>
                Due Date
              </label>

              <input
                type="date"
                name="dueDate"
                value={task.dueDate}
                onChange={handleChange}
                style={styles.input}
              />

            </div>

          </div>

          {/* END TIME */}

          <div style={styles.row}>

            <div style={styles.field}>

              <label style={styles.label}>
                End Time
              </label>

              <input
                type="datetime-local"
                name="endTime"
                value={task.endTime}
                onChange={handleChange}
                style={styles.input}
              />

            </div>

          </div>

          {/* BUTTONS */}

          <div style={styles.buttons}>

            <button
              style={styles.saveButton}
              onClick={handleSave}
            >
              ✓ Save Task
            </button>

            <button
              style={styles.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>

          </div>

        </div>

        {/* FOOTER */}

        <div style={styles.footer}>
          © 2026 Authify | Built by Ishita
        </div>

      </main>

    </div>

  );
}

const styles = {

  page: {

    minHeight: "100vh",

    display: "flex",

    fontFamily: "'Poppins', sans-serif",

    backgroundImage:
      "linear-gradient(rgba(15,23,42,0.55), rgba(15,23,42,0.55)), url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2070&auto=format&fit=crop')",

    backgroundSize: "cover",

    backgroundPosition: "center",

    backgroundRepeat: "no-repeat",
  },

  sidebar: {

    width: "270px",

    background: "rgba(15,23,42,0.78)",

    backdropFilter: "blur(16px)",

    color: "white",

    padding: "30px 20px",

    borderRight: "1px solid rgba(255,255,255,0.08)",
  },

  logo: {

    fontSize: "34px",

    fontWeight: "800",

    marginBottom: "40px",
  },

  newProject: {

    width: "100%",

    padding: "15px",

    background: "rgba(255,255,255,0.08)",

    border: "1px solid rgba(255,255,255,0.12)",

    borderRadius: "16px",

    color: "#ffffff",

    fontWeight: "700",

    fontSize: "17px",

    cursor: "pointer",

    marginBottom: "18px",
  },

  dashboardButton: {

    width: "100%",

    padding: "15px",

    background: "linear-gradient(135deg, #2563eb, #3b82f6)",

    border: "none",

    borderRadius: "16px",

    color: "white",

    fontWeight: "700",

    fontSize: "17px",

    cursor: "pointer",

    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  },

  main: {

    flex: 1,

    padding: "40px",

    overflowY: "auto",
  },

  backButton: {

    padding: "12px 18px",

    border: "1px solid rgba(255,255,255,0.15)",

    borderRadius: "12px",

    background: "rgba(255,255,255,0.08)",

    color: "#ffffff",

    fontWeight: "600",

    cursor: "pointer",

    backdropFilter: "blur(10px)",

    marginBottom: "22px",
  },

  card: {

    maxWidth: "950px",

    margin: "auto",

    background: "rgba(255,255,255,0.08)",

    backdropFilter: "blur(18px)",

    WebkitBackdropFilter: "blur(18px)",

    border: "1px solid rgba(255,255,255,0.18)",

    borderRadius: "28px",

    overflow: "hidden",

    boxShadow: "0 8px 32px rgba(0,0,0,0.30)",
  },

  cardHeader: {

    background: "rgba(255,255,255,0.06)",

    color: "#ffffff",

    padding: "22px 28px",

    fontSize: "30px",

    fontWeight: "800",

    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  label: {

    display: "block",

    fontWeight: "600",

    margin: "20px 25px 10px",

    color: "#ffffff",

    fontSize: "15px",
  },

  input: {

    width: "calc(100% - 50px)",

    margin: "0 25px",

    padding: "15px",

    background: "rgba(255,255,255,0.07)",

    border: "1px solid rgba(255,255,255,0.15)",

    borderRadius: "16px",

    fontSize: "15px",

    color: "#ffffff",

    outline: "none",

    boxSizing: "border-box",

    backdropFilter: "blur(8px)",
  },

  textarea: {

    width: "calc(100% - 50px)",

    height: "130px",

    margin: "0 25px",

    padding: "15px",

    background: "rgba(255,255,255,0.07)",

    border: "1px solid rgba(255,255,255,0.15)",

    borderRadius: "16px",

    fontSize: "15px",

    color: "#ffffff",

    resize: "none",

    outline: "none",

    boxSizing: "border-box",

    backdropFilter: "blur(8px)",
  },

  row: {

    display: "flex",

    gap: "20px",

    paddingRight: "25px",
  },

  field: {
    flex: 1,
  },

  buttons: {

    display: "flex",

    gap: "15px",

    padding: "30px 25px",
  },

  saveButton: {

    background: "linear-gradient(135deg, #2563eb, #3b82f6)",

    color: "white",

    border: "none",

    padding: "14px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "700",

    boxShadow: "0 10px 25px rgba(37,99,235,0.35)",
  },

  cancelButton: {

    background: "rgba(255,255,255,0.08)",

    color: "#ffffff",

    border: "1px solid rgba(255,255,255,0.15)",

    padding: "14px 24px",

    borderRadius: "14px",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "600",

    backdropFilter: "blur(8px)",
  },

  footer: {

    marginTop: "40px",

    textAlign: "center",

    color: "rgba(255,255,255,0.75)",

    fontSize: "15px",

    fontWeight: "500",

    letterSpacing: "0.5px",
  },

};

export default Todo;