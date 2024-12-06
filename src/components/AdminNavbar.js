import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/logo.png";

function AdminNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

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

  const logoutButtonStyle = {
    textDecoration: "none",
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "16px",
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  return (
    <nav style={navbarStyle}>
      <div>
        <Link to="/admin-dashboard" style={logoStyle}>
          <img src={logoImage} alt="EventSphere Logo" style={logoImgStyle} />
          EventSphere
        </Link>
      </div>
      <ul style={navLinksStyle}>
        <li>
          <Link to="/admin-dashboard/webinars" style={navLinkStyle}>
            Webinars
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/user-list" style={navLinkStyle}>
            User List
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/instructor-list" style={navLinkStyle}>
            Instructor List
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/approve-Instructor" style={navLinkStyle}>
            Approve Instructor
          </Link>
        </li>
        <li>
          <Link to="/admin-dashboard/profile" style={navLinkStyle}>
            Profile
          </Link>
        </li>
      </ul>
      <button style={logoutButtonStyle} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}

export default AdminNavbar;
