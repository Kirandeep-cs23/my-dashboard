import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
    <div className="container py-4">
      <h1 className="text-center mb-4">Personal Dashboard</h1>
      <nav className="nav nav-pills justify-content-center mb-4">
        <Link to="/coding" className="nav-link btn btn-success">Coding</Link>
        <Link to="/ml" className="nav-link btn btn-warning">ML</Link>
        <Link to="/quant" className="nav-link btn btn-danger">Quant</Link>
      </nav>
      <div className="row">
        {sections.map((section) => (
          <div key={section} className="col-md-6 mb-3">
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
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
