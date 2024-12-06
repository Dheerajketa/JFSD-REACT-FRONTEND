import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MyWebinars() {
  const [webinars, setWebinars] = useState([]);
  const [username, setUsername] = useState("");
  const [newWebinar, setNewWebinar] = useState({
    title: "",
    description: "",
    date: "",
    category: "",
    slots: 1,
    instructorUsername: "",
    status: "UPCOMING",
    resources: [],
    videoUrl: "",
  });
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
    setNewWebinar((prev) => ({
      ...prev,
      instructorUsername: parsedUser.username,
    }));

    // Fetch webinars scheduled by the instructor
    fetch(`http://localhost:8081/webinars/instructor/${parsedUser.username}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => setWebinars(data))
      .catch((error) => console.error("Error fetching webinars:", error));
  }, [navigate]);

  const handleStartWebinar = (webinarId) => {
    fetch(`http://localhost:8081/webinars/start/${webinarId}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setWebinars((prevWebinars) =>
          prevWebinars.map((webinar) =>
            webinar.webinarId === webinarId
              ? { ...webinar, status: "ONGOING" }
              : webinar
          )
        );
      })
      .catch((error) => console.error("Error starting webinar:", error));
  };

  const handleEndWebinar = (webinarId) => {
    fetch(`http://localhost:8081/webinars/end/${webinarId}`, {
      method: "PUT",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then(() => {
        setWebinars((prevWebinars) =>
          prevWebinars.map((webinar) =>
            webinar.webinarId === webinarId
              ? { ...webinar, status: "COMPLETED" }
              : webinar
          )
        );
      })
      .catch((error) => console.error("Error ending webinar:", error));
  };

  const handleUploadResources = (webinarId) => {
    navigate(`/upload-resources/${webinarId}`);
  };

  const handleCreateWebinar = (e) => {
    e.preventDefault();
    fetch("http://localhost:8081/webinars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWebinar),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setWebinars((prevWebinars) => [...prevWebinars, data]);
        setNewWebinar({
          title: "",
          description: "",
          date: "",
          category: "",
          slots: 1,
          instructorUsername: username,
          status: "UPCOMING",
          resources: [],
          videoUrl: "",
        });
      })
      .catch((error) => console.error("Error creating webinar:", error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWebinar((prev) => ({ ...prev, [name]: value }));
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

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto 40px",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const selectStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };

  const categories = [
    "Development",
    "Marketing",
    "Design",
    "Business",
    "Technology",
  ];

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>My Webinars</h1>
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
            {webinar.status === "UPCOMING" && (
              <>
                <button
                  style={buttonStyle}
                  onClick={() => handleStartWebinar(webinar.webinarId)}
                >
                  Start
                </button>
                <button
                  style={buttonStyle}
                  onClick={() => handleUploadResources(webinar.webinarId)}
                >
                  Upload Resources
                </button>
              </>
            )}
            {webinar.status === "Ongoing" && (
              <button
                style={buttonStyle}
                onClick={() => handleEndWebinar(webinar.webinarId)}
              >
                End
              </button>
            )}
            {webinar.status === "COMPLETED" && (
              <button
                style={buttonStyle}
                onClick={() => handleUploadResources(webinar.webinarId)}
              >
                Upload Resources
              </button>
            )}
          </div>
        ))}
      </div>
      <form style={formStyle} onSubmit={handleCreateWebinar}>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={newWebinar.title}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="description">
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={newWebinar.description}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="date">
            Date
          </label>
          <input
            type="datetime-local"
            id="date"
            name="date"
            value={newWebinar.date}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={newWebinar.category}
            onChange={handleInputChange}
            style={selectStyle}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="slots">
            Slots
          </label>
          <input
            type="number"
            id="slots"
            name="slots"
            value={newWebinar.slots}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle} htmlFor="videoUrl">
            Video URL
          </label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={newWebinar.videoUrl}
            onChange={handleInputChange}
            style={inputStyle}
            required
          />
        </div>
        <button type="submit" style={buttonStyle}>
          Create Webinar
        </button>
      </form>
    </div>
  );
}

export default MyWebinars;
