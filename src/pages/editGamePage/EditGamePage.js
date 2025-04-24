import { useState } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import GameForm from '../../components/GameForm';

const EditGamePage = () => {
    const backendIP = process.env.REACT_APP_BACKEND_IP;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    const apiUrl = `http://${backendIP}:${backendPort}/game`

    const location = useLocation();
    const game = location.state?.game;

    const formatDate = (value) => {
        let cleaned = value.replace(/\D/g, "");
      
        if (cleaned.length > 2) cleaned = cleaned.replace(/(\d{2})(\d)/, "$1/$2");
        if (cleaned.length > 5) cleaned = cleaned.replace(/(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
      
        return cleaned.slice(0, 10);
    };

    const formatToBRDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const [formData, setFormData] = useState({
        name: game.name || '',
        campaignModeStatusEnum: game.campaignModeStatusEnum || '',
        multiplayerStatusEnum: game.multiplayerStatusEnum || '',
        achievementsStatusEnum: game.achievementsStatusEnum || '',
        finishDate: game.finishDate ? formatDate(formatToBRDate(game.finishDate)) : '',
        oneHundredPercentDate: game.oneHundredPercentDate ? formatDate(formatToBRDate(game.oneHundredPercentDate)) : '',
        allAchievementsDate: game.allAchievementsDate ? formatDate(formatToBRDate(game.allAchievementsDate)) : '',
        launcher: game.launcher || '',
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
        <div class="gameform-selects">
          <label class="gameform-text" htmlFor={name}>{label}: </label>
          <select name={name} value={value} onChange={onChange} required class="campaignselect">
            <option value="">Select a status</option>
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      );
    
      const [image, setImage] = useState(null);
      const [imagePreview, setImagePreview] = useState(null);
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
      
        if (file) {
          const previewURL = URL.createObjectURL(file);
          setImagePreview(previewURL);
        } else {
          setImagePreview(null);
        }
      };
    
      const convertToISODate = (date) => {
        if (!date) return '';
        const parts = date.split('/');
        if (parts.length === 3) {
          return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }
        return date;
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
      
        const formattedValue = ["finishDate", "oneHundredPercentDate", "allAchievementsDate"].includes(name)
          ? formatDate(value)
          : value;
      
        setFormData({ ...formData, [name]: formattedValue });
      };
    
      const resetForm = () => {
        setFormData({
          name: '',
          campaignModeStatusEnum: '',
          multiplayerStatusEnum: '',
          achievementsStatusEnum: '',
          finishDate: '',
          oneHundredPercentDate: '',
          allAchievementsDate: '',
          launcher: '',
        });
        setImage(null);
        setImagePreview(null);
        const fileInput = document.getElementById('imageInput');
        if (fileInput) {
          fileInput.value = '';
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
          let value = formData[key];
          if (["finishDate", "oneHundredPercentDate", "allAchievementsDate"].includes(key)) {
            value = convertToISODate(value);
          }
          formDataToSend.append(key, value);
        });
      
        if (image) {
          formDataToSend.append('image', image);
        }
      
        try {
          await axios.put(`${apiUrl}/${game.id}`, formDataToSend, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          alert('Game edited successfully!');
          resetForm();
        } catch (error) {
          console.error(error);
          alert('Failed to edit game.');
        }
      };
    
      return (
        <div class="addgamepage">
    
          <div class="header-addgamepage">
            <h1>Edit Game</h1>
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
              image={image}
              imagePreview={imagePreview}
            />
          </div>  
        </div>
      );
    
};

export default EditGamePage;