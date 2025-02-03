import React, { useState } from 'react';
import axios from 'axios';

const RecipeAssistant = () => {
  const [query, setQuery] = useState('');
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    if (image) {
      formData.append('image', image);
    } else if (query) {
      formData.append('query', query);
    }

    try {
      const res = await axios.post('http://localhost:8000/process_input/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResponse(res.data.response);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <h1>Recipe Assistant</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe ingredients or ask a question..."
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Get Recipe</button>
      </form>
      <div className="response-box">
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default RecipeAssistant;