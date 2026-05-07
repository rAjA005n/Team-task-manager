import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5002/api";

export default function Projects() {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const token = localStorage.getItem("token");

  const [projects, setProjects] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    status: "Active",
  });

  const fetchProjects = async () => {
    try {
      const res = await axios.get(
        `${API}/projects`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setProjects(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {

      if (
        !form.name ||
        !form.description
      ) {
        return alert(
          "Please fill all fields"
        );
      }

      await axios.post(
        `${API}/projects`,
        form,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setForm({
        name: "",
        description: "",
        status: "Active",
      });

      fetchProjects();

      alert("Project Created");

    } catch (err) {

      alert(
        err?.response?.data?.msg ||
        "Error"
      );
    }
  };

  const deleteProject = async (id) => {
    try {

      await axios.delete(
        `${API}/projects/${id}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      fetchProjects();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <h1>Projects</h1>

        <h3>
          Total Projects:
          {" "}
          {projects.length}
        </h3>
      </div>

      {/* Admin Only */}
      {
        user?.role === "Admin" && (

          <div style={card}>
            <h2>Create Project</h2>

            <input
              placeholder="Project Name"
              value={form.name}
              onChange={(e) =>
                setForm({
                  ...form,
                  name: e.target.value,
                })
              }
              style={input}
            />

            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
              style={textarea}
            />

            <select
              value={form.status}
              onChange={(e) =>
                setForm({
                  ...form,
                  status: e.target.value,
                })
              }
              style={input}
            >
              <option>
                Active
              </option>

              <option>
                Completed
              </option>

              <option>
                On Hold
              </option>
            </select>

            <button
              onClick={createProject}
              style={button}
            >
              Create Project
            </button>
          </div>
        )
      }

      {/* Projects Grid */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {projects.map((project) => (

          <div
            key={project._id}
            style={card}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
              }}
            >
              <h2>{project.name}</h2>

              <span
                style={{
                  background:
                    project.status ===
                    "Completed"
                      ? "green"
                      : project.status ===
                        "On Hold"
                      ? "orange"
                      : "#2563eb",

                  padding:
                    "6px 12px",

                  borderRadius:
                    "20px",

                  fontSize: "12px",
                }}
              >
                {project.status}
              </span>
            </div>

            <p>
              {project.description}
            </p>

            <div
              style={{
                marginTop: "15px",
              }}
            >
              <p>
                <strong>
                  Created By:
                </strong>{" "}
                {
                  project.createdBy
                    ?.name
                }
              </p>

              <p>
                <strong>
                  Created:
                </strong>{" "}
                {
                  new Date(
                    project.createdAt
                  ).toLocaleDateString()
                }
              </p>
            </div>

            {/* Progress */}
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <p>
                Progress
              </p>

              <div
                style={{
                  height: "10px",
                  background:
                    "#334155",

                  borderRadius:
                    "10px",

                  overflow:
                    "hidden",
                }}
              >
                <div
                  style={{
                    width:
                      project.status ===
                      "Completed"
                        ? "100%"
                        : project.status ===
                          "On Hold"
                        ? "40%"
                        : "70%",

                    height: "100%",

                    background:
                      "#3b82f6",
                  }}
                />
              </div>
            </div>

            {/* Admin Actions */}
            {
              user?.role ===
                "Admin" && (

                <button
                  onClick={() =>
                    deleteProject(
                      project._id
                    )
                  }
                  style={{
                    ...button,
                    background:
                      "#ef4444",

                    marginTop:
                      "20px",
                  }}
                >
                  Delete
                </button>
              )
            }
          </div>
        ))}
      </div>
    </div>
  );
}

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
};

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "none",
};

const textarea = {
  width: "100%",
  minHeight: "120px",
  padding: "12px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "none",
};

const button = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  borderRadius: "8px",
  border: "none",
  background: "#3b82f6",
  color: "white",
  cursor: "pointer",
};