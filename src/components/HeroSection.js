import React from "react";
import heroImage from "../assets/hero.jpg"; // Add this import at the top

function HeroSection() {
  const heroSectionStyle = {
    marginBottom: "4.5rem",
    padding: "9rem 1rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "9rem",
    alignItems: "center",
    maxWidth: "72rem",
    margin: "0 auto",
  };

  const heroTextStyle = {
    textAlign: "left",
  };

  const headingPrimaryStyle = {
    fontSize: "2.4rem",
    lineHeight: "1.05",
    fontWeight: "700",
    color: "#333",
    marginBottom: "3.2rem",
  };

  const firstWordStyle = {
    color: "#3b5bdb",
    marginLeft: "2rem",
  };

  const heroDescriptionStyle = {
    fontSize: "1.6rem",
    marginBottom: "2.4rem",
    textAlign: "center",
  };

  const btnStyle = {
    display: "inline-block",
    padding: "1rem 2.8rem",
    borderRadius: "50px",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.4s",
    marginRight: "4rem",
  };

  const joinWebinarStyle = {
    ...btnStyle,
    backgroundColor: "#768ce6",
    color: "#fff",
  };

  const registerNowStyle = {
    ...btnStyle,
    backgroundColor: "#ebeffb",
    color: "#0c122c",
  };

  const heroImgStyle = {
    width: "500px",
    height: "auto",
    borderRadius: "20px",
  };

  return (
    <section style={heroSectionStyle}>
      <div style={heroTextStyle}>
        <h1 style={headingPrimaryStyle}>
          <span style={firstWordStyle}>Join</span> a Thriving Learning Community
          with Real-Time Webinars and Hands-On Workshops
        </h1>
        <p style={heroDescriptionStyle}>
          Empowering learners and educators through interactive, real-time
          sessions that inspire growth and knowledge. Join live webinars, attend
          workshops, and access valuable resources — all in one seamless
          platform.
        </p>
        <a href="#" style={joinWebinarStyle}>
          Join webinar
        </a>
        <a href="#" style={registerNowStyle}>
          Register now
        </a>
      </div>
      <div>
        <img src={heroImage} alt="Hero" style={heroImgStyle} />
      </div>
    </section>
  );
}

export default HeroSection;
