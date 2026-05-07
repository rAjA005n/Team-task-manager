import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Teams from "./pages/Teams";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const token = localStorage.getItem("token");

  // If not logged in
  if (!token) {
    return <Auth />;
  }

  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#0f172a",
          color: "white",
        }}
      >
        {/* Sidebar */}
        <Sidebar />

        {/* Main Section */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Navbar */}
          <Navbar />

          {/* Page Content */}
          <div
            style={{
              padding: "25px",
              flex: 1,
            }}
          >
            <Routes>
              {/* Default Route */}
              <Route
                path="/"
                element={<Navigate to="/dashboard" />}
              />

              {/* Dashboard */}
              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              {/* Projects */}
              <Route
                path="/projects"
                element={<Projects />}
              />

              {/* Tasks */}
              <Route
                path="/tasks"
                element={<Tasks />}
              />

              {/* Teams */}
              <Route
                path="/teams"
                element={<Teams />}
              />

              {/* Fallback */}
              <Route
                path="*"
                element={<Navigate to="/dashboard" />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}