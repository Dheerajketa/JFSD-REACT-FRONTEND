import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Webinars from "./pages/Webinars";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import InstructorDashboard from "./pages/InstructorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import VideoChatComponent from "./components/VideoChatComponent";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in by looking for user data in localStorage
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      {/* {!isLoggedIn && <Navbar />} */}
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/webinars" element={<Webinars />} />
        <Route path="/contact-us" element={<ContactUs />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/user-dashboard/*" element={<UserDashboard />} />
        <Route
          path="/instructor-dashboard/*"
          element={<InstructorDashboard />}
        />
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
        <Route path="/video-chat/:webinarId" element={<VideoChatComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
