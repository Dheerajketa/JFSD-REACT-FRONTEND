import React from "react";
import logoImage from "../assets/logo.png";

function Footer() {
  const footerStyle = {
    backgroundColor: "#002244", // Dark blue background
    color: "#ffffff", // White text
    padding: "3rem 1rem",
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    textAlign: "left",
  };

  const leftSectionStyle = {
    flex: "1",
    marginBottom: "2rem",
  };

  const logoContainerStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  };

  const logoStyle = {
    height: "40px",
    width: "auto",
    marginRight: "10px",
  };

  const logoTextStyle = {
    fontSize: "1.8rem",
    fontWeight: "600",
  };

  const newsletterHeadingStyle = {
    fontSize: "1.5rem",
    fontWeight: "600",
    marginBottom: "1rem",
  };

  const newsletterInputStyle = {
    padding: "0.8rem",
    borderRadius: "25px",
    border: "1px solid #ffffff",
    width: "300px",
    fontSize: "1rem",
    marginRight: "0.5rem",
    backgroundColor: "#ffffff", // White background for the input
    color: "#002244", // Dark blue text
  };

  const newsletterButtonStyle = {
    backgroundColor: "#a8c1ff", // Light blue button
    color: "#002244", // Dark blue text
    padding: "0.8rem 1.5rem",
    borderRadius: "25px",
    border: "none",
    fontSize: "1rem",
    cursor: "pointer",
  };

  const linksContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "2rem",
    flexWrap: "wrap",
    flex: "2",
  };

  const columnStyle = {
    flex: "1",
  };

  const columnHeadingStyle = {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "1rem",
  };

  const linkListStyle = {
    listStyle: "none",
    padding: "0",
    margin: "0",
  };

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
    marginBottom: "0.5rem",
    display: "block",
    fontSize: "1rem",
  };

  const socialLinksContainerStyle = {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  };

  const socialLinkStyle = {
    color: "#ffffff",
    fontSize: "1.5rem",
    textDecoration: "none",
  };

  const copyrightStyle = {
    textAlign: "center",
    width: "100%",
    marginTop: "2rem",
    fontSize: "1rem",
    color: "#ffffff", // White text
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Left Section with Logo, Title, and Newsletter */}
        <div style={leftSectionStyle}>
          <div style={logoContainerStyle}>
            <img src={logoImage} alt="EventSphere Logo" style={logoStyle} />
            <h2 style={logoTextStyle}>EventSphere</h2>
          </div>
          <div>
            <p>To always be informed</p>
            <h2 style={newsletterHeadingStyle}>Sign up for our newsletter.</h2>
            <form style={{ display: "flex", alignItems: "center" }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={newsletterInputStyle}
              />
              <button style={newsletterButtonStyle}>Subscribe</button>
            </form>
          </div>
        </div>

        {/* Links Section */}
        <div style={linksContainerStyle}>
          <div style={columnStyle}>
            <h3 style={columnHeadingStyle}>Product</h3>
            <ul style={linkListStyle}>
              <li>
                <a href="#" style={linkStyle}>
                  Features
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          <div style={columnStyle}>
            <h3 style={columnHeadingStyle}>Resources</h3>
            <ul style={linkListStyle}>
              <li>
                <a href="#" style={linkStyle}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  User guides
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Webinars
                </a>
              </li>
            </ul>
          </div>
          <div style={columnStyle}>
            <h3 style={columnHeadingStyle}>Company</h3>
            <ul style={linkListStyle}>
              <li>
                <a href="#" style={linkStyle}>
                  About us
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div style={columnStyle}>
            <h3 style={columnHeadingStyle}>Plans & Pricing</h3>
            <ul style={linkListStyle}>
              <li>
                <a href="#" style={linkStyle}>
                  Personal
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Start-up
                </a>
              </li>
              <li>
                <a href="#" style={linkStyle}>
                  Organization
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div style={socialLinksContainerStyle}>
          <a href="#" style={socialLinkStyle}>
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" style={socialLinkStyle}>
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" style={socialLinkStyle}>
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#" style={socialLinkStyle}>
            <i className="fab fa-youtube"></i>
          </a>
        </div>
      </div>

      {/* Copyright Text with Symbol */}
      <div style={copyrightStyle}>
        <p>© All rights reserved to DheerajKeta</p>
      </div>
    </footer>
  );
}

export default Footer;
