import React from 'react';

const GameForm = ({ formData, handleChange, handleSubmit, handleFileChange, campaignStatuses, multiplayerStatuses, 
  achievementsStatuses, SelectField, image, imagePreview }) => {

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" class="gameform">

      <div class="namecampaignstatus">
        <div class="gameform-inputs">
          <label class="gameform-text">Name: </label>
          <input class="gameform-textinput" type="text" name="name" value={formData.name} onChange={handleChange} required autoComplete="off"/>
        </div>

        <SelectField 
          label="Campaign Status" 
          name="campaignStatusEnum" 
          options={campaignStatuses} 
          value={formData.campaignStatusEnum} 
          onChange={handleChange} 
        />
      </div>

      <div class="namecampaignstatus">
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

        <div class="gameform-inputs">
          <label class="gameform-text">Launcher: </label>
          <input class="gameform-textinput" type="text" name="launcher" value={formData.launcher} onChange={handleChange} required autoComplete="off"/>
        </div>
      </div>

      <div class="datesimage">
        <div class="namecampaignstatus gameform-dates">
          <div class="gameform-inputs">
            <label class="gameform-text">Finish Date: </label>
            <input class="gameform-textinput gameform-dateinput"
              type="text" 
              name="finishDate" 
              value={formData.finishDate} 
              onChange={handleChange} 
              placeholder="dd/mm/yyyy"
              pattern="\d{2}/\d{2}/\d{4}" 
              maxLength="10"
            />
          </div>

          <div class="gameform-inputs" >
            <label class="gameform-text">100% Completion Date: </label>
            <input class="gameform-textinput gameform-dateinput"
              type="text"  
              name="oneHundredPercentDate" 
              value={formData.oneHundredPercentDate} 
              onChange={handleChange} 
              placeholder="dd/mm/yyyy"
              pattern="\d{2}/\d{2}/\d{4}" 
              maxLength="10"
            />
          </div>

          <div class="gameform-inputs">
            <label class="gameform-text">All Achievements Date: </label>
            <input class="gameform-textinput gameform-dateinput" 
              type="text"  
              name="allAchievementsDate" 
              value={formData.allAchievementsDate} 
              onChange={handleChange} 
              placeholder="dd/mm/yyyy"
              pattern="\d{2}/\d{2}/\d{4}" 
              maxLength="10"
            />
          </div> 
        </div>

        <div class="gameform-uploadimage">
          <div className='gameform-uploadbutton-container'>
            <label class="gameform-text">Upload Image:</label>
            <input class="uploadbutton" type="file" onChange={handleFileChange} accept="image/*" id="imageInput"/>
            <label htmlFor="imageInput" className="uploadlabel">Choose an Image</label>
            <div class="gameform-imagecontainer">
              {imagePreview && (<img src={imagePreview} alt="Game Preview" className="gameform-imagepreview"/>)}
            </div>
          </div>  
        </div>
      </div>

      <div class="addgamebutton-container">
        <button type="submit" class="addgamebutton">Save Game</button>
      </div>
    </form>
  );
};

export default GameForm;