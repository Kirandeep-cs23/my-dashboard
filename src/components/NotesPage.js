import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

export default NotesPage;
