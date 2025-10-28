// src/App.tsx
import React from 'react';
import TestApi from './components/TestApi';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React + Laravel Integration</h1>
        <TestApi />
      </header>
    </div>
  );
};

export default App;