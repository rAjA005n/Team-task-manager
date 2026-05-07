import React, { useState } from "react";
import axios from "axios";

const API = "http://localhost:5002/api";

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
  });

  const submit = async () => {
    try {
      const endpoint = isLogin ? "login" : "signup";

      const res = await axios.post(
        `${API}/auth/${endpoint}`,
        form
      );

      localStorage.setItem(
  "token",
  res.data.token
);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

      alert(
        isLogin
          ? "Login Successful"
          : "Signup Successful"
      );

      window.location.reload();

    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "#1e293b",
          padding: "30px",
          borderRadius: "12px",
          color: "white",
        }}
      >
        <h1>
          {isLogin ? "Login" : "Signup"}
        </h1>

        {!isLogin && (
          <input
            placeholder="Name"
            style={inputStyle}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        )}

        <input
          placeholder="Email"
          style={inputStyle}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          type="password"
          placeholder="Password"
          style={inputStyle}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {!isLogin && (
          <select
            style={inputStyle}
            onChange={(e) =>
              setForm({
                ...form,
                role: e.target.value,
              })
            }
          >
            <option>Member</option>
            <option>Admin</option>
          </select>
        )}

        <button
          onClick={submit}
          style={buttonStyle}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        <p style={{ marginTop: "20px" }}>
          {isLogin
            ? "New user?"
            : "Already have an account?"}

          <span
            onClick={() =>
              setIsLogin(!isLogin)
            }
            style={{
              color: "skyblue",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "none",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
};