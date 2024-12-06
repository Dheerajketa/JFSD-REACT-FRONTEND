import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Webinars from "./Webinars";
import Profile from "./Profile";
import ApproveInstructor from "./ApproveInstructor";
import UserList from "./UserList";
import InstructorList from "./InstructorList";
import AdminWebinars from "./AdminWebinars";
import Statistics from "../components/Statistics";

function AdminDashboard() {
  return (
    <div>
      <AdminNavbar />
      <Routes>
        <Route path="webinars" element={<AdminWebinars />} />
        <Route path="instructor-list" element={<InstructorList />} />
        <Route path="user-list" element={<UserList />} />
        <Route path="approve-Instructor" element={<ApproveInstructor />} />
        <Route path="profile" element={<Profile />} />
      </Routes>
      <Statistics />
    </div>
  );
}

export default AdminDashboard;
