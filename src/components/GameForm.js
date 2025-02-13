import React from 'react';

const GameForm = ({ formData, handleChange, handleSubmit, handleFileChange }) => {
  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" class="gameform">
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Campaign Status: </label>
        <input type="text" name="campaignStatusEnum" value={formData.campaignStatusEnum} onChange={handleChange} required />
      </div>
      <div>
        <label>Multiplayer Status: </label>
        <input type="text" name="multiplayerStatusEnum" value={formData.multiplayerStatusEnum} onChange={handleChange} required />
      </div>
      <div>
        <label>Achievements Status: </label>
        <input type="text" name="achievementsStatusEnum" value={formData.achievementsStatusEnum} onChange={handleChange} required />
      </div>
      <div>
        <label>Finish Date: </label>
        <input type="date" name="finishDate" value={formData.finishDate} onChange={handleChange} />
      </div>
      <div>
        <label>100% Completion Date: </label>
        <input type="date" name="oneHundredPercentDate" value={formData.oneHundredPercentDate} onChange={handleChange} />
      </div>
      <div>
        <label>All Achievements Date: </label>
        <input type="date" name="allAchievementsDate" value={formData.allAchievementsDate} onChange={handleChange} />
      </div>
      <div>
        <label>Launcher: </label>
        <input type="text" name="launcher" value={formData.launcher} onChange={handleChange} required />
      </div>
      <div>
        <label>Upload Image:</label>
        <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
      </div>
      <button type="submit" style={{ padding: '10px 20px', marginTop: '20px' }}>Save</button>
    </form>
  );
};

export default GameForm;