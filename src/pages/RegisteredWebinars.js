import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisteredWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUsername(parsedUser.username);

    // Fetch registered webinars for the user
    axios
      .get(
        `https://registrationservice.up.railway.app//api/registrations/user/${parsedUser.username}`
      )
      .then((response) => {
        const registrations = response.data;
        const webinarIds = registrations.map((reg) => reg.webinarId);

        // Fetch details for each webinar
        Promise.all(
          webinarIds.map((webinarId) =>
            axios.get(
              `https://webinarservice.up.railway.app/webinars/${webinarId}`
            )
          )
        )
          .then((responses) => {
            const webinarDetails = responses.map((res) => res.data);
            setWebinars(webinarDetails);
          })
          .catch((error) =>
            console.error("Error fetching webinar details:", error)
          );
      })
      .catch((error) =>
        console.error("Error fetching registered webinars:", error)
      );
  }, []);

  const joinButtonStyle = {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#28a745",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
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

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Registered Webinars</h1>
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
            {webinar.status === "Ongoing" && (
              <button
                style={joinButtonStyle}
                onClick={() => navigate(`/video-chat/${webinar.webinarId}`)}
              >
                Join
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RegisteredWebinars;
