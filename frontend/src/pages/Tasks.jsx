import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

const API =
  "http://localhost:5002/api";

export default function Tasks() {

  const token =
    localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [tasks, setTasks] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [form, setForm] =
    useState({
      title: "",
      description: "",
      priority: "Medium",
      dueDate: "",
    });

  const fetchTasks = async () => {
    try {

      const res = await axios.get(
        `${API}/tasks`,
        {
          headers: {
            "x-auth-token":
              token,
          },
        }
      );

      setTasks(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async () => {
    try {

      if (
        !form.title ||
        !form.description ||
        !form.dueDate
      ) {
        return alert(
          "Please fill all fields"
        );
      }

      await axios.post(
        `${API}/tasks`,
        form,
        {
          headers: {
            "x-auth-token":
              token,
          },
        }
      );

      setForm({
        title: "",
        description: "",
        priority: "Medium",
        dueDate: "",
      });

      fetchTasks();

      alert("Task Created");

    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus =
    async (id, status) => {

      try {

        await axios.put(
          `${API}/tasks/${id}`,
          { status },
          {
            headers: {
              "x-auth-token":
                token,
            },
          }
        );

        fetchTasks();

      } catch (err) {
        console.log(err);
      }
    };

  const deleteTask =
    async (id) => {

      try {

        await axios.delete(
          `${API}/tasks/${id}`,
          {
            headers: {
              "x-auth-token":
                token,
            },
          }
        );

        fetchTasks();

      } catch (err) {
        console.log(err);
      }
    };

  const filteredTasks =
    tasks.filter((task) =>
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

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
        <h1>Tasks</h1>

        <input
          placeholder="Search Tasks"
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            ...input,
            width: "300px",
          }}
        />
      </div>

      {/* Admin Only */}
      {
        user?.role ===
          "Admin" && (

          <div style={card}>
            <h2>Create Task</h2>

            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title:
                    e.target.value,
                })
              }
              style={input}
            />

            <textarea
              placeholder="Description"
              value={
                form.description
              }
              onChange={(e) =>
                setForm({
                  ...form,
                  description:
                    e.target.value,
                })
              }
              style={textarea}
            />

            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({
                  ...form,
                  dueDate:
                    e.target.value,
                })
              }
              style={input}
            />

            <select
              value={form.priority}
              onChange={(e) =>
                setForm({
                  ...form,
                  priority:
                    e.target.value,
                })
              }
              style={input}
            >
              <option>
                Low
              </option>

              <option>
                Medium
              </option>

              <option>
                High
              </option>
            </select>

            <button
              onClick={
                createTask
              }
              style={button}
            >
              Create Task
            </button>
          </div>
        )
      }

      {/* Task Cards */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {filteredTasks.map(
          (task) => {

            const overdue =
              new Date(
                task.dueDate
              ) < new Date() &&
              task.status !==
                "Completed";

            return (
              <div
                key={task._id}
                style={{
                  ...card,
                  border:
                    overdue
                      ? "2px solid red"
                      : "none",
                }}
              >
                <div
                  style={{
                    display:
                      "flex",

                    justifyContent:
                      "space-between",
                  }}
                >
                  <h2>
                    {task.title}
                  </h2>

                  <span
                    style={{
                      background:
                        task.priority ===
                        "High"
                          ? "red"
                          : task.priority ===
                            "Medium"
                          ? "orange"
                          : "green",

                      padding:
                        "6px 12px",

                      borderRadius:
                        "20px",

                      fontSize:
                        "12px",
                    }}
                  >
                    {
                      task.priority
                    }
                  </span>
                </div>

                <p>
                  {
                    task.description
                  }
                </p>

                <p>
                  <strong>
                    Due:
                  </strong>{" "}
                  {
                    task.dueDate?.slice(
                      0,
                      10
                    )
                  }
                </p>

                {
                  overdue && (
                    <p
                      style={{
                        color:
                          "red",
                      }}
                    >
                      Overdue
                    </p>
                  )
                }

                {/* Status */}
                <select
                  value={
                    task.status
                  }
                  onChange={(e) =>
                    updateStatus(
                      task._id,
                      e.target
                        .value
                    )
                  }
                  style={input}
                >
                  <option>
                    Pending
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Review
                  </option>

                  <option>
                    Completed
                  </option>
                </select>

                {/* Progress */}
                <div
                  style={{
                    marginTop:
                      "20px",
                  }}
                >
                  <div
                    style={{
                      height:
                        "10px",

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
                          task.status ===
                          "Completed"
                            ? "100%"
                            : task.status ===
                              "Review"
                            ? "80%"
                            : task.status ===
                              "In Progress"
                            ? "50%"
                            : "20%",

                        height:
                          "100%",

                        background:
                          "#3b82f6",
                      }}
                    />
                  </div>
                </div>

                {/* Admin Delete */}
                {
                  user?.role ===
                    "Admin" && (

                    <button
                      onClick={() =>
                        deleteTask(
                          task._id
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
            );
          }
        )}
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