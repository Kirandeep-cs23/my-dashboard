import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Draggable from "react-draggable";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
    <div className={`container py-4 ${darkMode ? "bg-dark text-white" : ""}`}>
      <h1 className="text-center mb-4">Personal Dashboard</h1>
      <button className="btn btn-secondary mb-3" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
      <nav className="nav nav-pills justify-content-center mb-4">
        <Link to="/" className="nav-link btn btn-primary">Home</Link>
        <Link to="/coding" className="nav-link btn btn-success">Coding</Link>
        <Link to="/ml" className="nav-link btn btn-warning">ML</Link>
        <Link to="/quant" className="nav-link btn btn-danger">Quant</Link>
      </nav>
      <div className="row">
        {sections.map((section) => (
          <Draggable key={section}>
            <div className="col-md-6 mb-3">
              <div className="card p-3">
                <h5>{section}</h5>
                <textarea
                  className="form-control"
                  value={data[section] || ""}
                  onChange={(e) => handleChange(section, e.target.value)}
                  placeholder={`Enter your ${section.toLowerCase()}...`}
                />
              </div>
            </div>
          </Draggable>
        ))}
      </div>
      <div className="mt-4">
        <h3>Calendar</h3>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  );
};

const NotesPage = ({ title }) => {
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const storedNotes = localStorage.getItem(title);
    if (storedNotes) setNotes(storedNotes);
  }, [title]);

  useEffect(() => {
    localStorage.setItem(title, notes);
  }, [notes, title]);

  return (
    <div className="container py-4">
      <h1 className="mb-4">{title} Notes</h1>
      <textarea
        className="form-control mb-3"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={`Write your ${title.toLowerCase()} notes here...`}
      />
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/coding" element={<NotesPage title="Coding" />} />
        <Route path="/ml" element={<NotesPage title="Machine Learning" />} />
        <Route path="/quant" element={<NotesPage title="Quant Prep" />} />
      </Routes>
    </Router>
  );
}
