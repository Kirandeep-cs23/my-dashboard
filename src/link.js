import React, { useState } from 'react';

function Links() {
  const [link, setLink] = useState('');
  const [linksList, setLinksList] = useState([]);

  const handleAddLink = () => {
    setLinksList([...linksList, link]);
    setLink('');
  };

  return (
    <div>
      <h2>Important Web Links</h2>
      <input
        type="text"
        placeholder="Enter a link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <button onClick={handleAddLink}>Add Link</button>
      <ul>
        {linksList.map((l, index) => (
          <li key={index}>{l}</li>
        ))}
      </ul>
    </div>
  );
}

export default Links;

