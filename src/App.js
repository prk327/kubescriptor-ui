import React, { useState } from 'react';
import './App.css';

function App() {
  const [script, setScript] = useState('');
  const [output, setOutput] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/run-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ script })
    });
    const result = await response.json();
    setOutput(result.output);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Bash Script Editor</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            value={script}
            onChange={(e) => setScript(e.target.value)}
            rows="10"
            cols="50"
            placeholder="Write your bash script here..."
          />
          <br />
          <button type="submit">Run Script</button>
        </form>
        <h2>Output</h2>
        <pre>{output}</pre>
      </header>
    </div>
  );
}

export default App;
