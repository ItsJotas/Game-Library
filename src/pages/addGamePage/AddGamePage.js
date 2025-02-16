import React, { useState } from 'react';
import axios from 'axios';
import GameForm from '../../components/GameForm';
import './AddGamePage.css';

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

  const campaignStatuses = [
    { value: "NO_CAMPAIGN", label: "The Game doesn't have Campaign." },
    { value: "NOT_FINISHED", label: "The Player has not finished the Campaign." },
    { value: "FINISHED", label: "The Player has finished the Campaign." },
    { value: "ONE_HUNDRED_PERCENT", label: "The Player got 100% in the Campaign." },
    { value: "NOT_PLAYED", label: "The Game has a Campaign but the Player hasn't played it." },
    { value: "JUST_LORE", label: "The Game doesn't have a Story Mode, but has Lore." }
  ];
  
  const multiplayerStatuses = [
    { value: "NO_MULTIPLAYER", label: "The Game doesn't have Multiplayer." },
    { value: "HAS_MULTIPLAYER", label: "The Game has Multiplayer." },
    { value: "COMPETITIVE", label: "The Game is Multiplayer Competitive." },
    { value: "COOP_STORY_MODE", label: "The Game has COOP Story Mode." },
    { value: "NOT_PLAYED", label: "The Game has Multiplayer but the Player hasn't played it." }
  ];

  const achievementsStatuses = [
    { value: "NO_ACHIEVEMENTS", label: "The Game doesn't have Achievements." },
    { value: "PLAYER_HAS_NO_ACHIEVEMENTS", label: "The Player doesn't have any Achievements." },
    { value: "PLAYER_HAS_SOME_ACHIEVEMENTS", label: "The Player has some Achievements." },
    { value: "ALL_ACHIEVEMENTS", label: "The Player got all Achievements." }
  ]

  const SelectField = ({ label, name, options, value, onChange }) => (
    <div>
      <label htmlFor={name}>{label}: </label>
      <select name={name} value={value} onChange={onChange} required>
        <option value="">Select a status</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );

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
    <div class="addgamepage">

      <div class="header-addgamepage">
        <h1>Add a New Game</h1>
      </div>
      
      <div class="addgame-main">
        <GameForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleFileChange={handleFileChange}
          campaignStatuses={campaignStatuses}
          multiplayerStatuses={multiplayerStatuses}
          achievementsStatuses={achievementsStatuses}
          SelectField={SelectField}
        />
      </div>  
    </div>
  );
};

export default AddGamePage;