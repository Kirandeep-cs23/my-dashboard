import React, { useState } from 'react';

function Progress() {
  const [progress, setProgress] = useState('');
  const handleProgressChange = (e) => setProgress(e.target.value);

  return (
    <div>
      <h2>Your Daily Progress</h2>
      <input
        type="text"
        placeholder="Track your ML and coding progress"
        value={progress}
        onChange={handleProgressChange}
      />
      <p>{progress}</p>
    </div>
  );
}

export default Progress;

