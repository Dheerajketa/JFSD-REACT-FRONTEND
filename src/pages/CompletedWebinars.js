import React, { useState, useEffect } from "react";
import axios from "axios";

function CompletedWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Check if the user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      return; // Redirect to login if not logged in
    }

    const parsedUser = JSON.parse(userData);
    setUsername(parsedUser.username);

    // Fetch completed webinars for the user
    axios
      .get(
        `http://localhost:8082/api/registrations/user/${parsedUser.username}/completed`
      )
      .then((response) => {
        const registrations = response.data;
        const webinarIds = registrations.map((reg) => reg.webinarId);

        // Fetch details for each webinar
        Promise.all(
          webinarIds.map((webinarId) =>
            axios.get(`http://localhost:8081/webinars/${webinarId}`)
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
        console.error("Error fetching completed webinars:", error)
      );
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
    margin: "0px 300px",
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
    marginBottom: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#3498db",
    color: "#fff",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    alignSelf: "flex-end",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Completed Webinars</h1>
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
            <a
              href={webinar.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={buttonStyle}
            >
              Watch Recording
            </a>
            <a href={webinar.materialUrl} download style={buttonStyle}>
              Download Material
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CompletedWebinars;
