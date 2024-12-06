import React from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll"; // Import for smooth scrolling
import logoImage from "../assets/logo.png";

function Navbar() {
  const navbarStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 200px",
    backgroundColor: "white",
    boxShadow: "0px 1px 1px rgba(0, 0, 0, 0.1)",
  };

  const logoStyle = {
    textDecoration: "none",
    color: "#000",
    fontSize: "24px",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  };

  const logoImgStyle = {
    height: "40px",
    width: "auto",
    marginRight: "5px",
  };

  const navLinksStyle = {
    listStyle: "none",
    display: "flex",
    gap: "20px",
  };

  const navLinkStyle = {
    textDecoration: "none",
    color: "#000",
    fontSize: "16px",
    padding: "10px",
    cursor: "pointer",
  };

  const authButtonsStyle = {
    display: "flex",
    gap: "15px",
  };

  const signInStyle = {
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "16px",
    backgroundColor: "#edf2ff",
    color: "#000",
  };

  const registerStyle = {
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "16px",
    backgroundColor: "#364fc7",
    color: "white",
  };

  return (
    <nav style={navbarStyle}>
      <div>
        <Link to="/" style={logoStyle}>
          <img src={logoImage} alt="EventSphere Logo" style={logoImgStyle} />
          EventSphere
        </Link>
      </div>
      <ul style={navLinksStyle}>
        {/* Smooth scroll to About Us */}
        <li>
          <ScrollLink
            to="about-us"
            smooth={true}
            duration={100}
            offset={-70}
            style={navLinkStyle}
          >
            About Us
          </ScrollLink>
        </li>
        {/* Navigate to Webinars page */}
        <li>
          <Link to="/webinars" style={navLinkStyle}>
            Webinars
          </Link>
        </li>
        {/* Navigate to Resources page */}

        {/* Smooth scroll to Contact Us */}
        <li>
          <ScrollLink
            to="contact-us"
            smooth={true}
            duration={100}
            offset={-70}
            style={navLinkStyle}
          >
            Contact Us
          </ScrollLink>
        </li>
      </ul>

      <div style={authButtonsStyle}>
        <Link to="/login" style={signInStyle}>
          Sign in
        </Link>
        <Link to="/register" style={registerStyle}>
          Register
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
