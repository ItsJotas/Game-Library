import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UnratedGamesPage.css';
import leftArrow from "./images/left-arrow.png";
import rightArrow from "./images/right-arrow.png";

const UnratedGamesPage = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const [sortDirection, setSortDirection] = useState("asc");
  const [gameName, setGameName] = useState("");
  const navigate = useNavigate();

  const backendIP = process.env.REACT_APP_BACKEND_IP;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const apiUrl = `http://${backendIP}:${backendPort}/game`; 

  const fetchGames = useCallback(async () => {
    try {
      const response = await axios.get(`${apiUrl}/unrated-games`, {
        params: {
          pageNumber: page,
          pageSize: pageSize,
          orderBy: "asc",
          sortBy: "name",
          gameName: gameName || undefined,
        },
      });
      setGames(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch Unrated Games", error);
    }
  }, [apiUrl, page, pageSize, gameName]);

  useEffect(() => {
    fetchGames();
  }, [fetchGames]);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (event) => {
    setGameName(event.target.value);
  };

  const nextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const prevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <div className="unratedpage">
      <div style={{ textAlign: 'center'}}>

        <div class="header-unrated">
          <h1>Rate your Games</h1>

          <div class="searchbarfilter-unrated">
            <input
              type="text"
              placeholder="Search by Name"
              value={gameName}
              onChange={handleSearchChange}
              class="searchbar-unrated"/>

            <button onClick={toggleSortDirection} class="sortbutton-unrated">
              Name: {sortDirection === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>

        <div class="main-unrated">
          <div class="cardsArea-unrated">
            {games.map((game, index) => (
            
                <div class="gameCard-unrated" onClick={() => navigate(`/unrated-games/${game.id}/rating`)}>
                  <img
                    src={game.imageUrl}
                    alt={`Cover of ${game.name}`}
                  />

                  <div class="gameCardName-unrated">
                    <p>{game.name}</p>
                  </div>
                </div>  
            ))}
          </div>

          <div className="pagination-unrated">
            <div class="arrows" onClick={prevPage} disabled={page === 0}>
              <img
                src={leftArrow}
                alt="Left Arrow"
              />
            </div>

            <p>
              Page {totalPages === 0 ? page : page + 1} / {totalPages}
            </p>

            <div class="arrows" onClick={nextPage} disabled={page === 0} >
              <img
                src={rightArrow}
                alt="Right Arrow"
              />
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default UnratedGamesPage;