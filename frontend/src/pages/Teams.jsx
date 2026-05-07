import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5002/api";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    members: "",
  });

  const token = localStorage.getItem("token");

  const fetchTeams = async () => {
    try {
      const res = await axios.get(`${API}/teams`, {
        headers: {
          "x-auth-token": token,
        },
      });

      setTeams(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const createTeam = async () => {
    try {
      const memberArray = form.members
        .split(",")
        .map((m) => m.trim());

      await axios.post(
        `${API}/teams`,
        {
          name: form.name,
          description: form.description,
          memberNames: memberArray,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      setForm({
        name: "",
        description: "",
        members: "",
      });

      fetchTeams();

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <div>
      <h1>Teams</h1>

      {/* Create Team */}
      <div style={card}>
        <h2>Create Team</h2>

        <input
          placeholder="Team Name"
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
          placeholder="Team Description"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
          style={textarea}
        />

        <input
          placeholder="Members (comma separated)"
          value={form.members}
          onChange={(e) =>
            setForm({
              ...form,
              members: e.target.value,
            })
          }
          style={input}
        />

        <button
          onClick={createTeam}
          style={button}
        >
          Create Team
        </button>
      </div>

      {/* Team List */}
      <div
        style={{
          marginTop: "30px",
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(320px,1fr))",
          gap: "20px",
        }}
      >
        {teams.map((team) => (
          <div key={team._id} style={card}>
            <h2>{team.name}</h2>

            <p>{team.description}</p>

            <p>
              <strong>Members:</strong>
            </p>

            <div style={{ marginTop: "10px" }}>
              {team.memberNames?.map(
                (member, index) => (
                  <span
                    key={index}
                    style={memberBadge}
                  >
                    {member}
                  </span>
                )
              )}
            </div>

            <div style={{ marginTop: "20px" }}>
              <p>
                <strong>Total Members:</strong>{" "}
                {team.memberNames?.length || 0}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {new Date(
                  team.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
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
  padding: "12px",
  marginTop: "12px",
  borderRadius: "8px",
  border: "none",
  minHeight: "100px",
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

const memberBadge = {
  display: "inline-block",
  background: "#334155",
  padding: "8px 12px",
  borderRadius: "20px",
  marginRight: "10px",
  marginBottom: "10px",
};