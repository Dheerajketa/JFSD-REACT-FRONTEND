import React, { useState, useEffect } from "react";
import axios from "axios";

function ApproveInstructor() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch the list of users who have requested to become instructors
    axios
      .get(
        "https://jfsd-backend-production.up.railway.app/api/users/instructor-requests"
      )
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching instructor requests:", error);
      });
  }, []);

  const handleApprove = (username) => {
    axios
      .put(
        `https://jfsd-backend-production.up.railway.app/api/users/role/change?username=${username}&newRole=Instructor`
      )
      .then(() => {
        // Remove the approved user from the list
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.username !== username)
        );
      })
      .catch((error) => {
        console.error("Error approving instructor:", error);
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
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #ccc",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Approve Instructor Requests</h1>
      <div style={listStyle}>
        {requests.map((request) => (
          <div key={request.username} style={listItemStyle}>
            <span>{request.username}</span>
            <button
              style={buttonStyle}
              onClick={() => handleApprove(request.username)}
            >
              Approve
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApproveInstructor;
