import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

import {
  FaCompass,
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";

import Login from "./Login.js";
import Todo from "./Todo.js";
import Dashboard from "./Dashboard";
import TaskList from "./TaskList";

/* BACKGROUND IMAGE */
import homeBg from "./assets/home.jpg";

/* HOME PAGE */
function Home() {

  const navigate = useNavigate();

  return (

    <div
      className="container"
      style={{

        backgroundImage: `
          linear-gradient(
            rgba(0,0,0,0.25),
            rgba(0,0,0,0.25)
          ),
          url(${homeBg})
        `,

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

      }}
    >

      {/* EXPLORE BUTTON */}

      <button className="explore-btn">
        <FaCompass />
        Explore
      </button>

      {/* BOTTOM BUTTONS */}

      <div className="bottom-buttons">

        <button
          className="explore-btn"
          onClick={() => navigate("/login")}
        >
          <FaSignInAlt />
          Sign In
        </button>

        <button
          className="explore-btn"
          onClick={() => navigate("/login")}
        >
          <FaUserPlus />
          Register
        </button>

      </div>

    </div>

  );
}

/* MAIN APP */

function App() {

  return (

    <Router>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/todo"
          element={<Todo />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/tasklist"
          element={<TaskList />}
        />

      </Routes>

    </Router>

  );
}

export default App;