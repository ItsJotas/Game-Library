import { useEffect, useState } from "react";
import axios from "axios";
import './UnratedGamesPage.css';

const UnratedGamesPage = () => {
  const [games, setGames] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const backendIP = process.env.REACT_APP_BACKEND_IP;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const apiUrl = `http://${backendIP}:${backendPort}/game`; 

  useEffect(() => {
    axios
      .get(`http://${apiUrl}/unrated-games`, {
        params: { pageNumber: 0, pageSize: 10, orderBy: "asc", sortBy: "id" },
      })
      .then((response) => {
        setGames(response.data.content);
      })
      .catch((error) => {
        console.error("Error fetching unrated games", error);
      });
  }, []);

  const toggleSortDirection = () => {
    setSortDirection((prevDirection) => (prevDirection === "asc" ? "desc" : "asc"));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="unratedpage">
      <div style={{ textAlign: 'center'}}>

        <div class="header">
          <h1>Rate your Games</h1>

          <div class="searchbarfilter">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchQuery}
              onChange={handleSearchChange}
              class="searchbar"/>

            <button onClick={toggleSortDirection} class="sortbutton">
              Name: {sortDirection === "asc" ? "Asc" : "Desc"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnratedGamesPage;