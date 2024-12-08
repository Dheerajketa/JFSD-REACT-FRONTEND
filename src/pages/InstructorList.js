import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function InstructorList() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch the list of instructors
    axios
      .get(
        `https://jfsd-backend-production.up.railway.app/api/users/instructors`
      )
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

  const handleRevokeInstructor = (username) => {
    axios
      .put(
        `https://jfsd-backend-production.up.railway.app/api/users/role/change?username=${username}&newRole=USER`
      )
      .then(() => {
        setInstructors((prevInstructors) =>
          prevInstructors.filter(
            (instructor) => instructor.username !== username
          )
        );
      })
      .catch((error) => {
        console.error("Error revoking instructor role:", error);
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

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#e74c3c",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
    alignSelf: "flex-end",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Instructor List</h1>
      <div style={listStyle}>
        {instructors.map((instructor) => (
          <div key={instructor.username} style={listItemStyle}>
            <div style={userInfoStyle}>
              <span>
                <strong>Username:</strong> {instructor.username}
              </span>
              <span>
                <strong>Email:</strong> {instructor.email}
              </span>
              <span>
                <strong>Role:</strong> {instructor.role}
              </span>
            </div>
            <button
              style={buttonStyle}
              onClick={() => handleRevokeInstructor(instructor.username)}
            >
              Revoke Instructor
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructorList;
