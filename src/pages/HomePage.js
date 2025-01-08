import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Game Library</h1>
      <button onClick={() => navigate('/add-game')} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Add Game
      </button>
    </div>
  );
};

export default HomePage;