import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5002/api";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teams, setTeams] = useState([]);

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const taskRes = await axios.get(`${API}/tasks`, {
        headers: {
          "x-auth-token": token,
        },
      });

      const projectRes = await axios.get(
        `${API}/projects`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      const teamRes = await axios.get(
        `${API}/teams`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setTasks(taskRes.data);
      setProjects(projectRes.data);
      setTeams(teamRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const overdueTasks = tasks.filter(
    (task) =>
      new Date(task.dueDate) < new Date() &&
      task.status !== "Completed"
  ).length;

  return (
    <div>
      <h1>Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px,1fr))",
          gap: "20px",
          marginTop: "25px",
        }}
      >
        <Card
          title="Total Tasks"
          value={tasks.length}
        />

        <Card
          title="Completed"
          value={completedTasks}
        />

        <Card
          title="Pending"
          value={pendingTasks}
        />

        <Card
          title="In Progress"
          value={inProgressTasks}
        />

        <Card
          title="Overdue"
          value={overdueTasks}
        />

        <Card
          title="Projects"
          value={projects.length}
        />

        <Card
          title="Teams"
          value={teams.length}
        />
      </div>

      <div style={section}>
        <h2>Recent Tasks</h2>

        {tasks.slice(0, 5).map((task) => (
          <div key={task._id} style={taskCard}>
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              <strong>Status:</strong>{" "}
              {task.status}
            </p>

            <p>
              <strong>Priority:</strong>{" "}
              {task.priority}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        background: "#1e293b",
        padding: "25px",
        borderRadius: "12px",
      }}
    >
      <h3>{title}</h3>

      <h1>{value}</h1>
    </div>
  );
}

const section = {
  marginTop: "40px",
};

const taskCard = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "15px",
};