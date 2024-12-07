import React, { useState, useEffect } from "react";
import axios from "axios";

function InstructorList() {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    // Fetch the list of instructors
    axios
      .get("https://userservice.up.railway.app/api/users/instructors")
      .then((response) => {
        setInstructors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructors:", error);
      });
  }, []);

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
    padding: "10px 0",
    borderBottom: "1px solid #ccc",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
  };

  const detailStyle = {
    fontSize: "1rem",
    color: "#666",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Instructors</h1>
      <div style={listStyle}>
        {instructors.map((instructor) => (
          <div key={instructor.username} style={listItemStyle}>
            <p style={titleStyle}>{instructor.username}</p>
            <p style={detailStyle}>Email: {instructor.email}</p>
            <p style={detailStyle}>Full Name: {instructor.fullName}</p>
            <p style={detailStyle}>Role: {instructor.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InstructorList;
