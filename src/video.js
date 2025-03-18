import React, { useState } from 'react';

function Videos() {
  const [video, setVideo] = useState('');
  const [videoList, setVideoList] = useState([]);

  const handleAddVideo = () => {
    setVideoList([...videoList, video]);
    setVideo('');
  };

  return (
    <div>
      <h2>YouTube Videos</h2>
      <input
        type="text"
        placeholder="Enter YouTube video link"
        value={video}
        onChange={(e) => setVideo(e.target.value)}
      />
      <button onClick={handleAddVideo}>Add Video</button>
      <ul>
        {videoList.map((v, index) => (
          <li key={index}>{v}</li>
        ))}
      </ul>
    </div>
  );
}

export default Videos;

