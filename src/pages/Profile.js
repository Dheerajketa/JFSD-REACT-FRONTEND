import React, { useEffect, useState } from "react";

function Profile() {
  const [user, setUser] = useState(null);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditFormData({
        username: parsedUser.username,
        email: parsedUser.email,
      });
    }
  }, []);

  const handleRequestInstructor = async () => {
    if (user && user.username) {
      try {
        const response = await fetch(
          `https://jfsd-backend-production.up.railway.app/api/users/role/request?username=${user.username}`,
          { method: "POST" }
        );
        if (response.ok) {
          alert("Instructor request submitted successfully!");
        } else {
          alert("Failed to submit instructor request.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while submitting the request.");
      }
    }
  };

  const handleEditProfile = async () => {
    if (!editFormData.currentPassword) {
      alert("Please enter your current password to confirm changes.");
      return;
    }
    try {
      const response = await fetch(
        `https://jfsd-backend-production.up.railway.app/api/users/profile?username=${editFormData.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: editFormData.email,
            currentPassword: editFormData.currentPassword,
            newPassword: editFormData.newPassword,
          }),
        }
      );
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
        setIsEditPopupOpen(false);
      } else {
        alert("Failed to update profile. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };

  const toggleEditPopup = () => setIsEditPopupOpen(!isEditPopupOpen);

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>Loading...</div>
    );
  }

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "80vh",
    backgroundColor: "#f3f4f6",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    maxWidth: "400px",
    width: "100%",
    textAlign: "center",
  };

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 8px 15px rgba(0, 0, 0, 0.2)",
    zIndex: 1000,
    maxWidth: "400px",
    width: "100%",
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
  };

  const inputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "16px",
  };

  const buttonStyle = {
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "16px",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    marginTop: "10px",
  };

  const cancelButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#ef4444",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: "#3b82f6", marginBottom: "20px" }}>Profile</h1>
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Role:</strong> {user.role}
        </p>
        <button style={buttonStyle} onClick={handleRequestInstructor}>
          Request Instructor
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: "#10b981" }}
          onClick={toggleEditPopup}
        >
          Edit Profile
        </button>
      </div>

      {isEditPopupOpen && (
        <>
          <div style={overlayStyle} onClick={toggleEditPopup}></div>
          <div style={popupStyle}>
            <h2 style={{ color: "#3b82f6", marginBottom: "20px" }}>
              Edit Profile
            </h2>
            <input
              type="text"
              placeholder="Username"
              style={inputStyle}
              value={editFormData.username}
              readOnly
            />
            <input
              type="email"
              placeholder="Email"
              style={inputStyle}
              value={editFormData.email}
              onChange={(e) =>
                setEditFormData({ ...editFormData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Current Password"
              style={inputStyle}
              value={editFormData.currentPassword}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  currentPassword: e.target.value,
                })
              }
            />
            <input
              type="password"
              placeholder="New Password"
              style={inputStyle}
              value={editFormData.newPassword}
              onChange={(e) =>
                setEditFormData({
                  ...editFormData,
                  newPassword: e.target.value,
                })
              }
            />
            <div>
              <button style={buttonStyle} onClick={handleEditProfile}>
                Save Changes
              </button>
              <button style={cancelButtonStyle} onClick={toggleEditPopup}>
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
