import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Send } from "lucide-react";

const VideoChatComponent = () => {
  const [messages, setMessages] = useState([
    { id: 1, user: "Alice", text: "Great video!" },
    { id: 2, user: "Bob", text: "Really informative content." },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [webinarTitle, setWebinarTitle] = useState("");
  const navigate = useNavigate();
  const { webinarId } = useParams();

  useEffect(() => {
    // Fetch the video URL for the webinar
    fetch(
      `https://webinarservice.up.railway.app/webinars/${webinarId}/videoUrl`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((url) => {
        setVideoUrl(url);
      })
      .catch((error) => {
        console.error("Error fetching video URL:", error);
      });

    // Fetch the webinar details to get the title
    fetch(`https://webinarservice.up.railway.app/webinars/${webinarId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        setWebinarTitle(data.title);
      })
      .catch((error) => {
        console.error("Error fetching webinar details:", error);
      });
  }, [webinarId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          user: "You",
          text: newMessage.trim(),
        },
      ]);
      setNewMessage("");
    }
  };

  const handleBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <button
        onClick={handleBack}
        style={{
          alignSelf: "flex-start",
          padding: "10px 20px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "#3498db",
          color: "#fff",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          marginBottom: "20px",
        }}
      >
        Back
      </button>
      <h1
        style={{
          marginBottom: "20px",
          fontSize: "2rem",
          color: "#2c3e50",
          textAlign: "left", // Aligns the title to the left
          width: "100%", // Ensures the title spans the full width
        }}
      >
        {webinarTitle}
      </h1>

      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: "1600px", // Increased max width for a larger layout
          height: "80vh", // Defined a fixed height for better proportions
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        {/* Video Section */}
        <div style={{ flex: 4, padding: "20px" }}>
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              aspectRatio: "16 / 9", // Maintain 16:9 ratio
              position: "relative", // Necessary for absolute positioning of iframe
            }}
          >
            <iframe
              style={{
                width: "300%", // Scale iframe width to hide unwanted areas
                height: "100%",
                marginLeft: "-100%", // Center the visible portion
                position: "absolute",
                top: 0,
                left: 0,
              }}
              src={`${videoUrl}?controls=1&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* Chat Section */}
        <div
          style={{
            flex: 2,
            padding: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              marginBottom: "20px",
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "5px",
                  backgroundColor:
                    message.user === "You" ? "#d1ecf1" : "#f8d7da",
                }}
              >
                <strong>{message.user}:</strong> {message.text}
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: "5px 0 0 5px",
                border: "1px solid #ccc",
              }}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              style={{
                padding: "10px",
                borderRadius: "0 5px 5px 0",
                border: "none",
                backgroundColor: "#3498db",
                color: "#fff",
                cursor: "pointer",
                fontSize: "1.5rem",
              }}
              onClick={handleSendMessage}
            >
              <Send />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoChatComponent;
