import React from "react";

const webinars = [
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    name: "Advanced React Techniques",
    description: "Dive deep into advanced concepts of React.",
    time: "2023-12-05 02:00 PM",
    instructor: "Alex Thompson",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
    name: "Digital Marketing Strategies",
    description: "Explore effective strategies for digital marketing.",
    time: "2023-12-10 11:00 AM",
    instructor: "Prof. Maria Garcia",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    name: "Machine Learning Basics",
    description: "Get started with machine learning and its applications.",
    time: "2023-12-20 01:00 PM",
    instructor: "Michael Chen",
  },
];

const WebinarHome = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
    padding: "20px",
  };

  const innerContainerStyle = {
    textAlign: "center",
    maxWidth: "1200px",
    width: "100%",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "2rem",
    color: "#2c3e50",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    justifyContent: "center",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    cursor: "pointer",
  };

  const cardHoverStyle = {
    transform: "translateY(-5px)",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "1rem",
  };

  const nameStyle = {
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

  const timeStyle = {
    fontSize: "1rem",
    marginBottom: "1rem",
    color: "#666",
  };

  const instructorStyle = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "#2c3e50",
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <h2 style={titleStyle}>Upcoming Webinars</h2>
        <div style={gridStyle}>
          {webinars.map((webinar) => (
            <div
              key={webinar.id}
              style={cardStyle}
              onMouseEnter={(e) => {
                Object.assign(e.currentTarget.style, cardHoverStyle);
              }}
              onMouseLeave={(e) => {
                Object.assign(e.currentTarget.style, cardStyle);
              }}
            >
              <img src={webinar.image} alt={webinar.name} style={imageStyle} />
              <h3 style={nameStyle}>{webinar.name}</h3>
              <p style={descriptionStyle}>{webinar.description}</p>
              <p style={timeStyle}>{webinar.time}</p>
              <p style={instructorStyle}>Instructor: {webinar.instructor}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WebinarHome;
