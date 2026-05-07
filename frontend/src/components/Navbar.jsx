import React from "react";

export default function Navbar() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div
      style={{
        height: "70px",
        background: "#1e293b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 25px",
        borderBottom: "1px solid #334155",
      }}
    >
      <h2>Team Task Manager</h2>

      <button
        onClick={logout}
        style={{
          padding: "10px 18px",
          border: "none",
          borderRadius: "8px",
          background: "#ef4444",
          color: "white",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}