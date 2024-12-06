import React from "react";

function AboutUs() {
  const aboutUsStyle = {
    padding: "50px",
    backgroundColor: "#f8f9fa",
    color: "#333",
    textAlign: "center",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const subtitleStyle = {
    fontSize: "1.2rem",
    marginBottom: "2rem",
    lineHeight: "1.8",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    padding: "20px",
    marginTop: "3rem",
  };

  const cardStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  };

  const imageStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    margin: "0 auto 1rem",
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Professional",
      image: "https://i.pravatar.cc/150?img=1",
      quote: "EventSphere has transformed how I approach online learning.",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      image: "https://i.pravatar.cc/150?img=2",
      quote: "The quality of instructors and content is outstanding.",
    },
    {
      name: "Emma Williams",
      role: "Design Lead",
      image: "https://i.pravatar.cc/150?img=3",
      quote: "A game-changer for professional development.",
    },
  ];

  const instructors = [
    {
      name: "Dr. James Wilson",
      expertise: "Data Science",
      image: "https://i.pravatar.cc/150?img=4",
      rating: "4.9",
    },
    {
      name: "Prof. Maria Garcia",
      expertise: "Digital Marketing",
      image: "https://i.pravatar.cc/150?img=5",
      rating: "4.8",
    },
    {
      name: "Alex Thompson",
      expertise: "UX Design",
      image: "https://i.pravatar.cc/150?img=6",
      rating: "4.9",
    },
  ];

  return (
    <div id="about-us" style={aboutUsStyle}>
      <div style={containerStyle}>
        <h1 style={titleStyle}>About Us</h1>
        <p style={subtitleStyle}>
          At EventSphere, we are passionate about connecting people through
          knowledge sharing and interactive learning experiences. Our platform
          brings together experts and learners from around the globe.
        </p>

        <h2 style={titleStyle}>What Our Users Say</h2>
        <div style={gridStyle}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={cardStyle}>
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={imageStyle}
              />
              <h3>{testimonial.name}</h3>
              <p style={{ color: "#666" }}>{testimonial.role}</p>
              <p style={{ fontStyle: "italic" }}>"{testimonial.quote}"</p>
            </div>
          ))}
        </div>

        <h2 style={{ ...titleStyle, marginTop: "4rem" }}>
          Our Top Instructors
        </h2>
        <div style={gridStyle}>
          {instructors.map((instructor, index) => (
            <div key={index} style={cardStyle}>
              <img
                src={instructor.image}
                alt={instructor.name}
                style={imageStyle}
              />
              <h3>{instructor.name}</h3>
              <p style={{ color: "#666" }}>{instructor.expertise}</p>
              <p>⭐ {instructor.rating}/5.0</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
