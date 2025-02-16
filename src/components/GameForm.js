import React from 'react';

const GameForm = ({ formData, handleChange, handleSubmit, handleFileChange, campaignStatuses, multiplayerStatuses, 
  achievementsStatuses, SelectField }) => {

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" class="gameform">
      <div>
        <label>Name: </label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>

      <SelectField 
        label="Campaign Status" 
        name="campaignStatusEnum" 
        options={campaignStatuses} 
        value={formData.campaignStatusEnum} 
        onChange={handleChange} 
      />

      <SelectField 
        label="Multiplayer Status" 
        name="multiplayerStatusEnum" 
        options={multiplayerStatuses} 
        value={formData.multiplayerStatusEnum} 
        onChange={handleChange} 
      />

      <SelectField 
        label="Achievements Status" 
        name="achievementsStatusEnum" 
        options={achievementsStatuses} 
        value={formData.achievementsStatusEnum} 
        onChange={handleChange} 
      />

      <div>
        <label>Finish Date: </label>
        <input 
          type="text" 
          name="finishDate" 
          value={formData.finishDate} 
          onChange={handleChange} 
          placeholder="dd/mm/aaaa"
          pattern="\d{2}/\d{2}/\d{4}" 
          maxLength="10"
          required
        />
      </div>

      <div>
        <label>100% Completion Date: </label>
        <input 
          type="text"  
          name="oneHundredPercentDate" 
          value={formData.oneHundredPercentDate} 
          onChange={handleChange} 
          placeholder="dd/mm/yyyy"
          pattern="\d{2}/\d{2}/\d{4}" 
          maxLength="10"
          required
        />
      </div>

      <div>
        <label>All Achievements Date: </label>
        <input 
          type="text"  
          name="allAchievementsDate" 
          value={formData.allAchievementsDate} 
          onChange={handleChange} 
          placeholder="dd/mm/yyyy"
          pattern="\d{2}/\d{2}/\d{4}" 
          maxLength="10"
          required
        />
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