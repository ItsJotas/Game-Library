import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./RateGamesPage.css";
import BackButton from "../../components/returnButton/ReturnButton";
import RateGamesChart from "../../components/rateGamesChart/RateGamesChart";

const RateGamesPage = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  const [gameName, setGameName] = useState(""); 

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
  const gameInfoUrl = `http://${backendIP}:${backendPort}/game/${gameId}`;

  useEffect(() => {
    const fetchGameName = async () => {
      try {
        const response = await axios.get(gameInfoUrl);
        setGameName(response.data.name);
      } catch (error) {
        console.error("Failed to fetch game name", error);
      }
    };
    fetchGameName();
  }, [gameId, gameInfoUrl]);

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
        <div class="rategames-form-container">

          <div class="rate-games-title">
            <BackButton />
            {gameName && <h2 className="ratepage-game-name">{gameName}</h2>}
          </div>
          
          <div class="form-chart-container">
            <form onSubmit={handleSubmit} className="rategames-form">
              {Object.keys(ratings).map((field) => {
                const formattedLabel = field
                  .replace(/([A-Z])/g, " $1")
                  .trim()
                  .replace(/\b\w/g, (char) => char.toUpperCase());

                return (
                  <div key={field} className="rategames-input-container">
                    <label className="rategames-input-text">{formattedLabel}:</label>
                    <input
                      className="rategames-input"
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
                );
              })}
            </form>

            <div class="rategames-chart-container">
                <RateGamesChart average={9.7} />

                <div class="submit-rating-button-container">
                  <button type="submit" class="submit-rating-button">Submit Rating</button>
                </div> 
            </div>
          </div>   
        </div>
       
      </div>
    </div>
  );
};

export default RateGamesPage;