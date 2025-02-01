import React, { useState } from 'react';
import axios from 'axios';
import GameForm from '../../components/GameForm';

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
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    if (image) {
      formDataToSend.append('image', image);
    }

    try {
      await axios.post('http://localhost:8080/game', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Game added successfully!');
    } catch (error) {
      console.error(error);
      alert('Failed to add game.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add Game</h2>
      <GameForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleFileChange={handleFileChange}
      />
    </div>
  );
};

export default AddGamePage;