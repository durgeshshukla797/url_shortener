import React, { useState } from 'react';
import axios from 'axios';

function Create() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState(null);
  const backendBase = 'http://localhost:8001';

  const handleSubmit = () => {
    if (!url.trim()) {
      alert("Please enter a valid URL");
      return;
    }

    axios.post(`${backendBase}/url`, { url })
      .then(res => {
        const generatedShortId = res.data.id;  
        setShortUrl(`${backendBase}/${generatedShortId}`);
        setUrl("");
      })
      .catch(err => {
        console.error(err);
        alert("Failed to create short URL");
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>URL Shortener</h1>

      <input
        type="text"
        placeholder="Enter the URL"
        value={url}
        onChange={e => setUrl(e.target.value)}
        style={{ padding: '10px', width: '300px', marginRight: '10px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '10px' }}>
        Create Short URL
      </button>

      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Your short URL:</p>
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a>
        </div>
      )}
    </div>
  );
}

export default Create;
