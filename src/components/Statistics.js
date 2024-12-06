import React, { useState } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CalendarCheck, Video, Clock, TrendingUp } from "lucide-react";

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
      icon: Users,
      title: "Total Users",
      value: "2,453",
      color: "bg-blue-100",
    },
    {
      icon: CalendarCheck,
      title: "Total Events",
      value: "90",
      color: "bg-green-100",
    },
    {
      icon: Video,
      title: "Instructors",
      value: "32",
      color: "bg-purple-100",
    },
  ],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Statistics = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Webinar Platform Dashboard
      </h1>

      {/* Top Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        {dashboardData.topCards.map((card, index) => (
          <Card
            key={index}
            className={`${card.color} shadow-md hover:shadow-lg transition-shadow`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {card.title}
              </CardTitle>
              <card.icon className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">
                {card.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* User Growth Line Chart */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={600} height={300} data={dashboardData.userStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#8884d8" />
            </LineChart>
          </CardContent>
        </Card>

        {/* Event Types Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Event Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Statistics;
