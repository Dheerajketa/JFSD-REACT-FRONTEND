import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch the list of users
    axios
      .get(
        `https://jfsd-backend-production.up.railway.app/api/users/regular-users`
      )
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleEnableDisable = (username, enabled) => {
    const newStatus = !enabled;
    axios
      .put(
        `https://jfsd-backend-production.up.railway.app/api/users/status/change?username=${username}&enabled=${newStatus}`
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.username === username ? { ...user, enabled: newStatus } : user
          )
        );
      })
      .catch((error) => {
        console.error(
          `Error ${enabled ? "disabling" : "enabling"} user:`,
          error
        );
      });
  };

  const handleMakeInstructor = (username) => {
    axios
      .put(
        `https://jfsd-backend-production.up.railway.app/api/users/role/change?username=${username}&newRole=Instructor`
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.username === username ? { ...user, role: "Instructor" } : user
          )
        );
      })
      .catch((error) => {
        console.error("Error making user an instructor:", error);
      });
  };

  const containerStyle = {
    padding: "40px 20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
  };

  const headerStyle = {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "30px",
  };

  const listStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const listItemStyle = {
    display: "flex",
    flexDirection: "column",
    padding: "10px 0",
    borderBottom: "1px solid #ccc",
  };

  const userInfoStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const instructorButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#2ecc71",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>User List</h1>
      <div style={listStyle}>
        {users.map((user) => (
          <div key={user.username} style={listItemStyle}>
            <div style={userInfoStyle}>
              <span>
                <strong>Username:</strong> {user.username}
              </span>
              <span>
                <strong>Email:</strong> {user.email}
              </span>
              <span>
                <strong>Role:</strong> {user.role}
              </span>
            </div>
            <div style={buttonContainerStyle}>
              <button
                style={buttonStyle}
                onClick={() => handleEnableDisable(user.username, user.enabled)}
              >
                {user.enabled ? "Disable" : "Enable"}
              </button>
              <button
                style={instructorButtonStyle}
                onClick={() => handleMakeInstructor(user.username)}
              >
                Make Instructor
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
