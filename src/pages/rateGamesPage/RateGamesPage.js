import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RateGamesPage.css";

const RateGamesPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  console.log("Game ID from URL:", gameId);

  const [ratings, setRatings] = useState({
    gameplay: "",
    graphics: "",
    difficulty: "",
    performance: "",
    sound: "",
    immersion: "",
    story: "",
    matchMaking: "",
    competitiveBalance: "",
    coop: "",
  });

  const backendIP = process.env.REACT_APP_BACKEND_IP;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const apiUrl = `http://${backendIP}:${backendPort}/game/unrated-games/${gameId}/rating`;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: value ? parseFloat(value) : "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(apiUrl, ratings, {
        headers: { "Content-Type": "application/json" },
      });
      alert("Game rated successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to rate the game", error);
      alert("Failed to rate the game. Please try again.");
    }
  };

  return (
    <div class="rategamespage">
      
      <div class="header-rategames">
        <h1>Rate Game</h1>
      </div>
      
      <div class="rategames-main">
        <form onSubmit={handleSubmit}>
          {Object.keys(ratings).map((field) => (
            <div key={field}>
              <label>{field.charAt(0).toUpperCase() + field.slice(1)}:</label>
              <input
                type="number"
                name={field}
                value={ratings[field]}
                onChange={handleChange}
                min="0"
                max="10"
                step="0.1"
                required={!["story", "matchMaking", "competitiveBalance", "coop"].includes(field)}
              />
            </div>
          ))}
        </form>

        <button type="submit">Submit Rating</button>
        <button onClick={() => navigate(-1)}>Back</button>  
      </div>
    </div>
  );
};

export default RateGamesPage;