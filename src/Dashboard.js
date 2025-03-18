import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Draggable from "react-draggable";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const sections = [
  "Daily Progress",
  "Current Studies",
  "Concepts to Remember",
  "Important Web Links",
  "YouTube Study Material",
  "Coding Progress",
];

const Dashboard = () => {
  const [data, setData] = useState({});
  const [darkMode, setDarkMode] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const storedData = localStorage.getItem("dashboardData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboardData", JSON.stringify(data));
  }, [data]);

  const handleChange = (section, value) => {
    setData({ ...data, [section]: value });
  };

  return (
    <div className={`container py-4 ${darkMode ? "bg-dark text-light" : ""}`}>
      <h1 className="text-center mb-4">Personal Dashboard</h1>
      <button className="btn btn-secondary mb-3" onClick={() => setDarkMode(!darkMode)}>
        Toggle Dark Mode
      </button>
      <nav className="nav nav-pills justify-content-center mb-4">
        <Link to="/" className="nav-link btn btn-primary">Home</Link>
        <Link to="/coding" className="nav-link btn btn-success">Coding</Link>
        <Link to="/ml" className="nav-link btn btn-warning">ML</Link>
        <Link to="/quant" className="nav-link btn btn-danger">Quant</Link>
      </nav>
      <div className="row">
        {sections.map((section) => (
          <div key={section} className="col-md-6 mb-3">
            <Draggable>
              <div className="card p-3">
                <h5>{section}</h5>
                <textarea
                  className="form-control"
                  value={data[section] || ""}
                  onChange={(e) => handleChange(section, e.target.value)}
                  placeholder={`Enter your ${section.toLowerCase()}...`}
                />
              </div>
            </Draggable>
          </div>
        ))}
      </div>
      <h2 className="mt-4">Calendar</h2>
      <Calendar onChange={setDate} value={date} />
      <h2 className="mt-4">Coding Progress</h2>
      <Line
        data={{
          labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
          datasets: [
            {
              label: "Coding Hours",
              data: [2, 3, 5, 4, 6],
              borderColor: "blue",
              fill: false,
            },
          ],
        }}
      />
    </div>
  );
};

export default Dashboard;
