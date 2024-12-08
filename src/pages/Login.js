import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const url = new URL(
      "https://jfsd-backend-production.up.railway.app/api/users/login"
    );
    url.searchParams.append("username", username);
    url.searchParams.append("password", password);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = await response.json();
    console.log("User logged in:", data);

    localStorage.setItem("user", JSON.stringify(data));
    setIsLoggedIn(true);

    if (data.role === "USER" || data.role === "INSTRUCTOR_REQUESTED") {
      navigate("/user-dashboard");
    } else if (data.role === "Instructor" || data.role === "Instructor") {
      navigate("/instructor-dashboard");
    } else if (data.role === "ADMIN") {
      navigate("/admin-dashboard");
    }
  };

  return (
    <div style={styles.container}>
      <a href="/" style={styles.backButton}>
        &larr;
      </a>
      <h3 style={styles.heading}>Let's pick up where you left off!</h3>
      <div style={styles.formBox}>
        <h3 style={styles.formHeading}>Sign In</h3>
        <div style={styles.inputGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
          />
          <a href="#" style={styles.forgotPassword}>
            Forgot password?
          </a>
        </div>
        <div style={styles.rememberMe}>
          <input type="checkbox" id="remember" style={styles.checkbox} />
          <label htmlFor="remember" style={styles.checkboxLabel}>
            Remember me
          </label>
        </div>
        <button onClick={handleLogin} style={styles.button}>
          Sign In
        </button>
        <p style={styles.signUpText}>
          Don't have an account?{" "}
          <a href="/register" style={styles.signUpLink}>
            Sign up
          </a>
        </p>
        <div style={styles.socialLogin}>
          <p style={styles.orText}>OR</p>
          <div style={styles.socialIcons}>
            <button style={styles.socialButton}>
              <img
                src="/images/icons/google_logo-google_icongoogle-512.webp"
                alt="Google"
                style={styles.iconImage}
              />
            </button>
            <button style={styles.socialButton}>
              <img
                src="/images/icons/facebook.png"
                alt="Facebook"
                style={styles.iconImage}
              />
            </button>
            <button style={styles.socialButton}>
              <img
                src="/images/icons/X_icon_2.svg"
                alt="Apple"
                style={styles.iconImage}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },
  backButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    borderRadius: "50%",
    padding: "5px",
    fontSize: "1.5rem",
    color: "black",
    textDecoration: "none",
  },
  heading: {
    marginBottom: "20px",
  },
  formBox: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "8px",
    boxShadow: "0 0 15px rgba(0, 0, 0, 0.1)",
    width: "320px",
    textAlign: "center",
  },
  formHeading: {
    marginBottom: "20px",
  },
  inputGroup: {
    marginBottom: "15px",
    textAlign: "left",
  },
  label: {
    fontSize: "0.9rem",
    color: "#555",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    marginTop: "5px",
  },
  forgotPassword: {
    fontSize: "0.85rem",
    color: "#6c63ff",
    float: "right",
    marginTop: "-20px",
    textDecoration: "none",
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  checkbox: {
    marginRight: "10px",
  },
  checkboxLabel: {
    fontSize: "0.9rem",
  },
  button: {
    backgroundColor: "#6c63ff",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    width: "100%",
    cursor: "pointer",
    transition: "all 0.5s",
  },
  buttonHover: {
    backgroundColor: "#554bcc",
  },
  signUpText: {
    marginTop: "20px",
    fontSize: "0.9rem",
  },
  signUpLink: {
    color: "#6c63ff",
    textDecoration: "none",
  },
  socialLogin: {
    marginTop: "15px",
  },
  orText: {
    marginBottom: "10px",
  },
  socialIcons: {
    display: "flex",
    gap: "10px",
  },
  socialButton: {
    color: "#fff",
    backgroundColor: "white",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    padding: "10px",
  },
  iconImage: {
    width: "30px",
    height: "auto",
    borderRadius: "50%",
  },
};

export default Login;
