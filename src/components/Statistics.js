import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

// Custom CSS
const styles = {
  dashboard: {
    padding: "24px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "24px",
    color: "#333",
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    padding: "16px",
    transition: "box-shadow 0.3s ease",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
  },
  cardTitle: {
    fontSize: "14px",
    color: "#666",
  },
  cardValue: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  chartsContainer: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "24px",
  },
};

// Sample data - in a real app, this would come from your backend
const dashboardData = {
  userStats: [
    { month: "Jan", users: 400 },
    { month: "Feb", users: 300 },
    { month: "Mar", users: 200 },
    { month: "Apr", users: 278 },
    { month: "May", users: 189 },
    { month: "Jun", users: 239 },
  ],
  eventTypes: [
    { name: "Scheduled", value: 45 },
    { name: "Ongoing", value: 12 },
    { name: "Upcoming", value: 33 },
  ],
  topCards: [
    {
      title: "Total Users",
      value: "2,453",
      backgroundColor: "#e6f2ff",
    },
    {
      title: "Total Events",
      value: "90",
      backgroundColor: "#e6f9f0",
    },
    {
      title: "Instructors",
      value: "32",
      backgroundColor: "#f4e6ff",
    },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Statistics = () => {
  return (
    <div style={styles.dashboard}>
      <h1 style={styles.heading}>Webinar Platform Dashboard</h1>

      {/* Top Cards */}
      <div style={styles.cardContainer}>
        {dashboardData.topCards.map((card, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              backgroundColor: card.backgroundColor,
            }}
          >
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>{card.title}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div style={styles.cardValue}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div style={styles.chartsContainer}>
        {/* User Growth Line Chart */}
        <div style={styles.card}>
          <h2
            style={{
              ...styles.cardTitle,
              fontSize: "18px",
              marginBottom: "16px",
            }}
          >
            User Growth
          </h2>
          <LineChart width={600} height={300} data={dashboardData.userStats}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#8884d8" />
          </LineChart>
        </div>

        {/* Event Types Pie Chart */}
        <div style={styles.card}>
          <h2
            style={{
              ...styles.cardTitle,
              fontSize: "18px",
              marginBottom: "16px",
            }}
          >
            Event Distribution
          </h2>
          <PieChart width={300} height={300}>
            <Pie
              data={dashboardData.eventTypes}
              cx={150}
              cy={150}
              labelLine={false}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {dashboardData.eventTypes.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
