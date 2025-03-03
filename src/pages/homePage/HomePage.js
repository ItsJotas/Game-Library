import React, { useEffect, useState, useCallback } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const CampaignStatusMessages = {
    NO_CAMPAIGN: "No Campaign",
    NOT_FINISHED: "Campaign not Finished",
    FINISHED: "Campaign Finished",
    ONE_HUNDRED_PERCENT: "100% Completed",
    NOT_PLAYED: "Campaign not Played",
    JUST_LORE: "No Story Mode, just Lore"
  }

  const MultiplayerStatusMessages = {
    NO_MULTIPLAYER: "No Multiplayer",
    HAS_MULTIPLAYER: "Multiplayer Played",
    COMPETITIVE: "Competitive",
    COOP_STORY_MODE: "Coop Story Mode Played",
    NOT_PLAYED: "Multiplayer not Played"
  }

  const AchievementsStatusMessages = {
    NO_ACHIEVEMENTS: "Game has no Achievements",
    PLAYER_HAS_NO_ACHIEVEMENTS: "Player has no Achievements",
    PLAYER_HAS_SOME_ACHIEVEMENTS: "Player got some Achievements",
    ALL_ACHIEVEMENTS: "Player got them All"
  }

  const backendIP = process.env.REACT_APP_BACKEND_IP;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const apiUrl = `http://${backendIP}:${backendPort}/game`; 

  const fetchGames = useCallback(async (pageNumber, query) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}?pageNumber=${pageNumber}&pageSize=20&orderBy=${sortDirection}&gameName=${query}`
      );
      const data = await response.json();
      if (data.content && data.content.length > 0) {
        setGames((prevGames) => {
          const newGames = data.content.filter((game) => 
            !prevGames.some((prevGame) => prevGame.id === game.id)
          );
          return [...prevGames, ...newGames];
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Erro ao carregar os jogos:", error);
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, sortDirection]);  


  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100 &&
      !isLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isLoading, hasMore]);

  const getEnumMessage = (enumType, value) => {
    return enumType[value] || "Unknown";
  };

  useEffect(() => {
    fetchGames(page, searchQuery);
  }, [page, fetchGames, searchQuery]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setGames([]); 
    setPage(0); 
    setHasMore(true); 
  }, [sortDirection, searchQuery]);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
  
    const date = new Date(dateString + "T00:00:00");
  
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };
    

  return (
    <div className="homepage">
      <div style={{ textAlign: 'center'}}>
        <div class="header">

          <h1>Your Ranking</h1>

          <div class="searchbarfilter">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={handleSearchChange}
              class="searchbar"/>

              <button onClick={toggleSortDirection} class="sortbutton">
                Ranking: {sortDirection === "asc" ? "Asc" : "Desc"}
              </button>
          </div>
        </div>
        
        <div class="main">
          {games.map((game, index) => (
            <div key={index} class="gameCard">

              <div class="gameImage">                
                <img
                  src={game.imageUrl}
                  alt={`Cover of ${game.name}`}
                />
              </div>

              <div class="cardInfo">

                <div class="nameRating">
                  <h3 class="gameName">{game.ranking} - {game.name}</h3>
                  <div  class="gameRating">
                    <p>({game.totalRating})</p>
                  </div>
                </div>

                <div class="gameInfo">
                  <p>Story Mode: <strong>{getEnumMessage(CampaignStatusMessages, game.campaignStatusEnum)}</strong></p>
                  <p>Multiplayer: <strong>{getEnumMessage(MultiplayerStatusMessages, game.multiplayerStatusEnum)}</strong></p>
                  <p>Achievements: <strong>{getEnumMessage(AchievementsStatusMessages, game.achievementsStatusEnum)}</strong></p>
                  <p>Launcher: <strong>{game.launcher}</strong></p>
                  <p>{game.allAchievementsDate ? "All Achievements Unlocked on:"
                      : game.oneHundredPercentDate ? "100% Completed on:"
                      : game.finishDate ? "Finished on:"
                      : "Finished on:"}
                  <strong> {formatDate(game.allAchievementsDate || game.oneHundredPercentDate || game.finishDate)}</strong></p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && <p class="loading">Loading your rated Games...</p>}
          {!hasMore && <p class="loading">That's all of your rated Games!</p>}
        </div>
      </div>
    </div>
  );
};

export default HomePage;