import React, { useState } from "react";
import axios from "axios";

function ScheduleWebinar() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [slots, setSlots] = useState("");

  const handleSchedule = () => {
    axios
      .post("/webinars", { title, description, date, category, slots })
      .then((response) => {
        console.log("Webinar scheduled:", response.data);
        // Redirect to instructor dashboard
      })
      .catch((error) => console.error("Error scheduling webinar:", error));
  };

  return (
    <div>
      <h1>Schedule Webinar</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Slots"
        value={slots}
        onChange={(e) => setSlots(e.target.value)}
      />
      <button onClick={handleSchedule}>Schedule</button>
    </div>
  );
}

export default ScheduleWebinar;
