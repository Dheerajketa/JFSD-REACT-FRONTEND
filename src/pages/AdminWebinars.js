import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [registeredWebinars, setRegisteredWebinars] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUsername(parsedUser.username);

    // Fetch all webinars
    fetch("https://jfsd-backend-production.up.railway.app/webinars")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => setWebinars(data))
      .catch((error) => console.error("Error fetching webinars:", error));

    // Fetch registered webinars for the user
    fetch(
      `https://jfsd-backend-production.up.railway.app/api/registrations?username=${parsedUser.username}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => setRegisteredWebinars(data.map((reg) => reg.webinarId)))
      .catch((error) =>
        console.error("Error fetching registered webinars:", error)
      );
  }, [navigate]);

  const handleOpenWebinar = (webinarId) => {
    // Navigate to the VideoChatComponent
    navigate(`/video-chat/${webinarId}`);
  };

  const handleUploadResources = (webinarId) => {
    navigate(`/upload-resources/${webinarId}`);
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
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "2rem",
    padding: "20px",
  };

  const listItemStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    transition: "transform 0.3s ease",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const listItemHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "0.5rem",
    color: "#2c3e50",
  };

  const descriptionStyle = {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
  };

  const dateStyle = {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
  };

  const categoryStyle = {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
  };

  const slotsStyle = {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
  };

  const instructorStyle = {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
  };

  const statusStyle = {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
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
    alignSelf: "flex-end",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Admin Webinars</h1>
      <div style={listStyle}>
        {webinars.map((webinar) => (
          <div
            key={webinar.webinarId}
            style={listItemStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, listItemHoverStyle);
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, listItemStyle);
            }}
          >
            <div>
              <h2 style={titleStyle}>{webinar.title}</h2>
              <p style={descriptionStyle}>{webinar.description}</p>
              <p style={dateStyle}>
                Date: {new Date(webinar.date).toLocaleString()}
              </p>
              <p style={categoryStyle}>Category: {webinar.category}</p>
              <p style={slotsStyle}>Slots: {webinar.slots}</p>
              <p style={instructorStyle}>
                Instructor: {webinar.instructorUsername}
              </p>
              <p style={statusStyle}>
                <strong>Status:</strong> {webinar.status}
              </p>
            </div>
            <button
              style={buttonStyle}
              onClick={() => handleOpenWebinar(webinar.webinarId)}
            >
              Open
            </button>
            <button
              style={buttonStyle}
              onClick={() => handleUploadResources(webinar.webinarId)}
            >
              Resources
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminWebinars;
