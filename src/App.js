import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading backend status...");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // No http://localhost:5000 here! Nginx/ALB handles the routing.
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => setMessage(data.status))
      .catch(() => setMessage("Backend Unreachable"));

    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Users API failed", err));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontFamily: "sans-serif" }}>
      <h1>🏦 DevBank Digital Platform</h1>
      <div style={{ padding: "10px", backgroundColor: "#f4f4f4", display: "inline-block" }}>
         {message}
      </div>

      <h3>Users List</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {users.length > 0 ? (
          users.map((u) => (
            <li key={u.id} style={{ margin: "10px 0", fontSize: "18px" }}>
              👤 {u.name}
            </li>
          ))
        ) : (
          <li>No users loaded</li>
        )}
      </ul>
    </div>
  );
}

export default App;
