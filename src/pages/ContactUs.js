import React from "react";

function ContactUs() {
  const contactUsStyle = {
    padding: "50px",
    backgroundColor: "#f8f9fa",
    color: "#333",
    textAlign: "center",
  };

  const titleStyle = {
    fontSize: "2rem",
    marginBottom: "1rem",
  };

  const textStyle = {
    fontSize: "1.2rem",
    marginBottom: "2rem",
  };

  const formStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "left",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "5px",
    fontSize: "1rem",
  };

  const buttonStyle = {
    backgroundColor: "#5f73ff",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
  };

  return (
    <div id="contact-us" style={contactUsStyle}>
      <h1 style={titleStyle}>Get in Touch</h1>
      <p style={textStyle}>
        We'd love to hear from you! Please fill out the form below to contact
        us.
      </p>
      <form style={formStyle}>
        <input
          type="text"
          placeholder="Your Name"
          required
          style={inputStyle}
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          style={inputStyle}
        />
        <textarea
          placeholder="Your Message"
          required
          style={{ ...inputStyle, height: "100px" }}
        />
        <button type="submit" style={buttonStyle}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export default ContactUs;
