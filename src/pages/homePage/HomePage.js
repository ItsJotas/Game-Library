import React, { useEffect, useState, useCallback } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortDirection, setSortDirection] = useState("desc");
  const [searchQuery, setSearchQuery] = useState("");

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
        setGames((prevGames) => [...prevGames, ...data.content]); 
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

  return (
    <div className="homepage">
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>Game Library</h1>
        <div style={{ marginBottom: "20px" }}>
          <button onClick={toggleSortDirection}>
            Ranking: {sortDirection === "asc" ? "Ascendente" : "Descendente"}
          </button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{
              padding: "10px",
              fontSize: "16px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              width: "80%", 
              margin: "0 auto", 
            }}/>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {games.map((game, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '10px',
                padding: '20px',
                margin: '10px 0',
                width: '90%', 
                maxWidth: '800px', 
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              }}>
              <h3>{game.name}</h3>
              <p><strong>Rate:</strong> {game.totalRating}</p>
              <p><strong>Lançador:</strong> {game.launcher}</p>
              <p><strong>Modo História:</strong> {game.storyModeStatusEnum}</p>
              <p><strong>Multiplayer:</strong> {game.multiplayerStatusEnum}</p>
              <p><strong>Data de Finalização:</strong> {game.finishDate || "N/A"}</p>
            </div>
          ))}
        </div>
        {isLoading && <p>Carregando...</p>}
        {!hasMore && <p>Todos os jogos foram carregados!</p>}
      </div>
    </div>
  );
};

export default HomePage;