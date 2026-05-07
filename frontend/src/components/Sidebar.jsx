import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "250px",
        background: "#1e293b",
        padding: "25px",
        borderRight: "1px solid #334155",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>
        Dashboard
      </h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Link style={linkStyle} to="/dashboard">
          Dashboard
        </Link>

        <Link style={linkStyle} to="/projects">
          Projects
        </Link>

        <Link style={linkStyle} to="/tasks">
          Tasks
        </Link>

        <Link style={linkStyle} to="/teams">
          Teams
        </Link>
      </div>
    </div>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "white",
  fontSize: "18px",
};