import React from "react";
import { Route, Routes } from "react-router-dom";
import InstructorNavbar from "../components/InstructorNavbar";
import Profile from "./Profile";
import Webinars from "./Webinars";
import RegisteredWebinars from "./RegisteredWebinars";
import CompletedWebinars from "./CompletedWebinars";
import MyWebinars from "./MyWebinars";

function InstructorDashboard() {
  return (
    <div>
      <InstructorNavbar />
      <Routes>
        <Route path="my-webinars" element={<MyWebinars />} />
        <Route path="webinars" element={<Webinars />} />
        <Route path="registered-webinars" element={<RegisteredWebinars />} />
        <Route path="completed-webinars" element={<CompletedWebinars />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default InstructorDashboard;
