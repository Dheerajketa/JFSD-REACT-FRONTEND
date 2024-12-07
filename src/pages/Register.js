import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

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
      color: "#333",
      fontSize: "1.5rem",
    },
    formBox: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "8px",
      boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
      width: "380px",
      textAlign: "center",
    },
    formHeading: {
      marginBottom: "20px",
      color: "#6c63ff",
      fontSize: "1.8rem",
      fontWeight: "bold",
    },
    inputGroup: {
      marginBottom: "15px",
      textAlign: "left",
    },
    label: {
      fontSize: "0.9rem",
      color: "#555",
      display: "block",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "12px",
      borderRadius: "6px",
      border: "1px solid #ddd",
      fontSize: "1rem",
      transition: "all 0.3s ease",
    },
    errorInput: {
      borderColor: "#ff4d4d",
    },
    errorText: {
      color: "#ff4d4d",
      fontSize: "0.8rem",
      marginTop: "5px",
    },
    button: {
      backgroundColor: "#6c63ff",
      color: "#fff",
      padding: "12px 15px",
      border: "none",
      borderRadius: "6px",
      width: "100%",
      cursor: "pointer",
      transition: "all 0.5s ease",
      fontSize: "1rem",
      marginTop: "10px",
    },
    buttonDisabled: {
      backgroundColor: "#a9a9a9",
      cursor: "not-allowed",
    },
    switchText: {
      marginTop: "20px",
      fontSize: "0.9rem",
    },
    switchLink: {
      color: "#6c63ff",
      textDecoration: "none",
      fontWeight: "bold",
    },
  };

  const handleGenerateOtp = () => {
    fetch(
      `http://localhost:8080/api/users/generate-otp?email=${encodeURIComponent(
        email
      )}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((data) => {
        console.log("OTP sent:", data);
        setIsOtpSent(true);
      })
      .catch((error) => console.error("Error generating OTP:", error));
  };

  const handleVerifyOtp = () => {
    fetch(
      `http://localhost:8080/api/users/verify-otp?email=${encodeURIComponent(
        email
      )}&otp=${encodeURIComponent(otp)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((data) => {
        console.log("OTP verified:", data);
        setIsOtpVerified(true);
      })
      .catch((error) => console.error("Error verifying OTP:", error));
  };

  const handleRegister = () => {
    fetch(
      `http://localhost:8080/api/users/register?otp=${encodeURIComponent(otp)}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log("User registered:", data);
        navigate("/login");
      })
      .catch((error) => console.error("Error registering user:", error));
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    if (password.length < minLength) {
      return `Password must be at least ${minLength} characters long.`;
    }
    if (!hasNumber.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar.test(password)) {
      return "Password must contain at least one special character.";
    }
    return "";
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    const error = validatePassword(newPassword);
    setPasswordError(error);
  };

  return (
    <div style={styles.container}>
      <a href="/" style={styles.backButton}>
        &larr;
      </a>
      <h3 style={styles.heading}>Welcome to Our Platform!</h3>
      <div style={styles.formBox}>
        <h3 style={styles.formHeading}>Create Account</h3>
        <form autoComplete="off">
          <div style={styles.inputGroup}>
            <label htmlFor="username" style={styles.label}>
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a unique username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
              autoComplete="off"
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              autoComplete="off"
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Create a strong password"
              value={password}
              onChange={handlePasswordChange}
              style={{
                ...styles.input,
                ...(passwordError ? styles.errorInput : {}),
              }}
              autoComplete="new-password"
            />
            {passwordError && <p style={styles.errorText}>{passwordError}</p>}
          </div>
          {isOtpSent && (
            <div style={styles.inputGroup}>
              <label htmlFor="otp" style={styles.label}>
                OTP
              </label>
              <input
                type="text"
                id="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
                autoComplete="off"
              />
            </div>
          )}
        </form>
        {!isOtpSent && (
          <button
            onClick={handleGenerateOtp}
            disabled={passwordError !== ""}
            style={{
              ...styles.button,
              ...(passwordError !== "" ? styles.buttonDisabled : {}),
            }}
          >
            Generate OTP
          </button>
        )}
        {isOtpSent && !isOtpVerified && (
          <button onClick={handleVerifyOtp} style={styles.button}>
            Verify OTP
          </button>
        )}
        {isOtpVerified && (
          <button onClick={handleRegister} style={styles.button}>
            Create Account
          </button>
        )}
        <p style={styles.switchText}>
          Already have an account?{" "}
          <a href="/login" style={styles.switchLink}>
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
