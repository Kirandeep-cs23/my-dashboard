import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./components/Dashboard";
import NotesPage from "./components/NotesPage";

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
