import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("Overall");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchProjects();
    fetchTasks();
  }, []);

  const fetchProjects = () => {
    fetch("http://localhost:8080/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.log(err));
  };

  const fetchTasks = () => {
    fetch("http://localhost:8080/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log(err));
  };

  // ✅ LOGOUT ADDED
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredTasks =
    selectedProject === "Overall"
      ? tasks
      : tasks.filter(
          (task) =>
            task.projectName === selectedProject ||
            task.project_name === selectedProject
        );

  const totalTasks = filteredTasks.length;

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const notStartedTasks = filteredTasks.filter(
    (task) => task.status === "Not Started"
  ).length;

  const onHoldTasks = filteredTasks.filter(
    (task) => task.status === "On Hold"
  ).length;

  const progress =
    totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0;

  const handleNewProject = () => {
    const projectName = prompt("Enter project name");

    if (projectName && projectName.trim() !== "") {
      fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectName: projectName.trim(),
        }),
      })
        .then((res) => res.json())
        .then(() => {
          fetchProjects();
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteProject = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (confirmDelete) {
      fetch(`http://localhost:8080/projects/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          fetchProjects();
          setSelectedProject("Overall");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <h2 style={styles.logo}>⚡ Authify</h2>

        <button style={styles.newProjectBtn} onClick={handleNewProject}>
          + New Project
        </button>

        <div
          style={
            selectedProject === "Overall"
              ? styles.activeMenu
              : styles.normalMenu
          }
          onClick={() => setSelectedProject("Overall")}
        >
          📊 Overall Dashboard
        </div>

        <button style={styles.todoButton} onClick={() => navigate("/todo")}>
          ✨ Task Management
        </button>

        {projects.map((project) => (
          <div key={project.id} style={styles.projectRow}>
            <span
              style={styles.projectName}
              onClick={() => setSelectedProject(project.projectName)}
            >
              {project.projectName}
            </span>

            <button
              style={styles.deleteBtn}
              onClick={() => handleDeleteProject(project.id)}
            >
              ✕
            </button>
          </div>
        ))}

        {/* ✅ LOGOUT BUTTON (added only this) */}
        <button style={styles.logoutBtn} onClick={handleLogout}>
          🚪 Logout
        </button>
      </aside>

      <main style={styles.main}>
        <div style={styles.topBar}>
          <div>
            <h1 style={styles.heading}>
              {selectedProject === "Overall"
                ? "Dashboard"
                : `${selectedProject} Dashboard`}
            </h1>

            <p style={styles.subHeading}>
              Welcome back! Here's your productivity overview
            </p>

            <div style={styles.quickTabs}>
              <button style={styles.tabBtn}>📋 Tasks</button>
              <button style={styles.tabBtn}>📝 Projects</button>
              <button style={styles.tabBtn}>🔥 Progress</button>
            </div>
          </div>

          <button style={styles.selectButton}>
            {selectedProject} ▾
          </button>
        </div>

        <div style={styles.cardGrid}>
          <div style={styles.card}>
            <p style={styles.cardTitle}>Projects</p>
            <h2 style={styles.cardNumberBlue}>{projects.length}</h2>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}>Tasks</p>
            <h2 style={styles.cardNumberDark}>{totalTasks}</h2>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}>Completed Tasks</p>
            <h2 style={styles.cardNumberGreen}>{completedTasks}</h2>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}>In Progress</p>
            <h2 style={styles.cardNumberBlue}>{inProgressTasks}</h2>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}>Not Started</p>
            <h2 style={styles.cardNumberDark}>{notStartedTasks}</h2>
          </div>

          <div style={styles.card}>
            <p style={styles.cardTitle}>On Hold</p>
            <h2 style={styles.cardNumberOrange}>{onHoldTasks}</h2>
          </div>
        </div>

        <div style={styles.progressCard}>
          <h2 style={styles.progressNumber}>{progress}%</h2>
          <p style={styles.progressText}>Complete</p>
        </div>

        <div style={styles.progressSection}>
          <h3 style={styles.progressTitle}>Overall Progress</h3>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${progress}%`,
              }}
            ></div>
          </div>

          <p style={styles.progressPercent}>{progress}%</p>
        </div>
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
    background: "linear-gradient(135deg, #eef2ff, #f8fafc)",
    fontFamily: "'Poppins', sans-serif",
  },

  sidebar: {
    width: "270px",
    background: "#355c7d",
    color: "white",
    padding: "30px 20px",
    boxShadow: "5px 0 18px rgba(0,0,0,0.08)",
  },

  logo: {
    fontSize: "38px",
    fontWeight: "800",
    marginBottom: "45px",
    color: "#ffffff",
  },

  activeMenu: {
    background: "#9cc9ea",
    color: "#264653",
    padding: "16px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "18px",
    marginBottom: "18px",
    cursor: "pointer",
  },

  normalMenu: {
    background: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    padding: "16px",
    borderRadius: "14px",
    fontWeight: "700",
    fontSize: "18px",
    marginBottom: "18px",
    cursor: "pointer",
  },

  newProjectBtn: {
    width: "100%",
    padding: "16px",
    background: "rgba(255,255,255,0.08)",
    border: "2px solid rgba(255,255,255,0.25)",
    color: "#ffffff",
    borderRadius: "16px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "20px",
  },

  todoButton: {
    width: "100%",
    padding: "16px",
    background: "rgba(255,255,255,0.08)",
    border: "2px solid rgba(255,255,255,0.25)",
    color: "#ffffff",
    borderRadius: "16px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    marginBottom: "22px",
  },

  projectRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "rgba(255,255,255,0.08)",
    padding: "12px 14px",
    borderRadius: "12px",
    marginBottom: "10px",
  },

  projectName: {
    cursor: "pointer",
    color: "#ffffff",
    fontWeight: "600",
    flex: 1,
  },

  deleteBtn: {
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    padding: "6px 10px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  // ✅ ONLY NEW STYLE ADDED
  logoutBtn: {
    width: "100%",
    padding: "16px",
    background: "#ef4444",
    border: "none",
    color: "white",
    borderRadius: "16px",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "20px",
  },

  main: {
    flex: 1,
    padding: "45px",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "35px",
  },

  heading: {
    fontSize: "64px",
    color: "#264653",
    fontWeight: "900",
    marginBottom: "10px",
  },

  subHeading: {
    color: "#5c6770",
    fontSize: "16px",
    marginBottom: "22px",
    fontWeight: "500",
  },

  quickTabs: {
    display: "flex",
    gap: "14px",
  },

  tabBtn: {
    background: "#355c7d",
    color: "white",
    border: "none",
    padding: "12px 22px",
    borderRadius: "30px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  selectButton: {
    background: "#ffffff",
    color: "#355c7d",
    border: "1px solid #dbeafe",
    padding: "14px 22px",
    borderRadius: "14px",
    fontSize: "15px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 18px rgba(0,0,0,0.08)",
  },

  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "20px",
    marginBottom: "30px",
  },

  card: {
    height: "180px",
    background: "#ffffff",
    borderRadius: "24px",
    padding: "22px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  cardTitle: {
    color: "#355c7d",
    fontSize: "22px",
    fontWeight: "700",
    margin: 0,
  },

  cardNumberBlue: {
    fontSize: "48px",
    color: "#2563eb",
    margin: 0,
    fontWeight: "900",
  },

  cardNumberDark: {
    fontSize: "48px",
    color: "#111827",
    margin: 0,
    fontWeight: "900",
  },

  cardNumberGreen: {
    fontSize: "48px",
    color: "#16a34a",
    margin: 0,
    fontWeight: "900",
  },

  cardNumberOrange: {
    fontSize: "48px",
    color: "#d97706",
    margin: 0,
    fontWeight: "900",
  },

  progressCard: {
    width: "240px",
    height: "220px",
    background: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "35px",
  },

  progressNumber: {
    fontSize: "58px",
    color: "#0ea5e9",
    margin: 0,
    fontWeight: "900",
  },

  progressText: {
    color: "#5c6770",
    fontSize: "22px",
    marginTop: "10px",
    fontWeight: "600",
  },

  progressSection: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "24px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.06)",
  },

  progressTitle: {
    color: "#111827",
    marginBottom: "22px",
    fontSize: "34px",
    fontWeight: "800",
  },

  progressBar: {
    width: "100%",
    height: "18px",
    background: "#d1d5db",
    borderRadius: "30px",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    background: "#14b8a6",
    borderRadius: "30px",
  },

  progressPercent: {
    textAlign: "right",
    color: "#475569",
    marginTop: "12px",
    fontSize: "28px",
    fontWeight: "700",
  },
  footer: {
  marginTop: "40px",
  textAlign: "center",
  color: "#64748b",
  fontSize: "15px",
  fontWeight: "500",
},
};

export default Dashboard;