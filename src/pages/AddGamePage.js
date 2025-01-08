import React, { useState } from 'react';
import axios from 'axios';
import GameForm from '../components/GameForm';

const AddGamePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    storyModeStatusEnum: '',
    multiplayerStatusEnum: '',
    achievementsStatusEnum: '',
    finishDate: '',
    oneHundredPercentDate: '',
    allAchievementsDate: '',
    launcher: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/game', formData);
      alert('Game added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add game.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Game</h2>
      <GameForm formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} />
    </div>
  );
};

export default AddGamePage;