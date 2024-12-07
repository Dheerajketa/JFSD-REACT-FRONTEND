import React from "react";
import { Route, Routes } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";
import Profile from "./Profile";
import Webinars from "./Webinars";
import RegisteredWebinars from "./RegisteredWebinars";
import CompletedWebinars from "./CompletedWebinars";

function UserDashboard() {
  return (
    <div>
      <UserNavbar />
      <Routes>
        <Route path="/" element={<Webinars />} />
        <Route path="webinars" element={<Webinars />} />
        <Route path="registered-webinars" element={<RegisteredWebinars />} />
        <Route path="completed-webinars" element={<CompletedWebinars />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default UserDashboard;
