import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = () => {
    fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("User registered:", data);
        navigate("/login"); // Redirect to login page
      })
      .catch((error) => console.error("Error registering user:", error));
  };

  const containerStyle = {
    position: "relative",
    textAlign: "center",
    fontFamily: "'Inter', Arial, sans-serif",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const backButtonStyle = {
    position: "absolute",
    top: "20px",
    left: "30px",
    borderRadius: "50%",
    height: "40px",
    width: "40px",
    padding: "5px",
    fontSize: "1.5rem",
    color: "black",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "color 0.3s",
  };

  const formBoxStyle = {
    backgroundColor: "#fff",
    padding: "50px 40px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    width: "500px",
    marginTop: "20px",
  };

  const headingStyle = {
    marginBottom: "20px",
    fontSize: "1.8rem",
  };

  const inputGroupStyle = {
    marginBottom: "15px",
    textAlign: "left",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.9rem",
    color: "#555",
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    marginTop: "5px",
  };

  const rememberMeStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
    fontSize: "0.85rem",
  };

  const checkboxStyle = {
    marginRight: "10px",
  };

  const linkStyle = {
    color: "#6c63ff",
    textDecoration: "none",
  };

  const buttonStyle = {
    backgroundColor: "#6c63ff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.5s",
  };

  const signUpTextStyle = {
    marginTop: "20px",
    fontSize: "0.9rem",
  };

  return (
    <div style={containerStyle}>
      {/* Back Button */}
      <a
        href="/"
        style={backButtonStyle}
        onMouseOver={(e) => (e.target.style.color = "#554bcc")}
        onMouseOut={(e) => (e.target.style.color = "black")}
      >
        &larr;
      </a>
      <div style={formBoxStyle}>
        <h3 style={headingStyle}>Sign up</h3>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="example.email@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="Enter at least 8+ characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={rememberMeStyle}>
          <input type="checkbox" style={checkboxStyle} required />
          <label>
            By signing up, I agree with the{" "}
            <a href="#" style={linkStyle}>
              Terms of Use
            </a>{" "}
            &
            <a href="#" style={linkStyle}>
              Privacy Policy
            </a>
          </label>
        </div>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#554bcc")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#6c63ff")}
          onClick={handleRegister}
        >
          Register
        </button>
        <p style={signUpTextStyle}>
          Already have an account?{" "}
          <a href="/login" style={linkStyle}>
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
