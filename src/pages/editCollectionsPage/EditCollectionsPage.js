import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './EditCollectionsPage.css';
import BackButton from "../../components/returnButton/ReturnButton";
import CollectionEditForm from "../../components/CollectionEditForm";
import GameModal from '../../components/gameModal/GameModal';
import axios from 'axios';

const EditCollectionsPage = () => {
  const { collectionId } = useParams();
  const [collection, setCollection] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([]);

  const [formData, setFormData] = useState({
    name: collection?.name || '',
    gameIds: collection?.gameIds || [],
    color: collection?.color || ''
  });
    
  const backendIP = process.env.REACT_APP_BACKEND_IP;
  const backendPort = process.env.REACT_APP_BACKEND_PORT;
  const apiUrl = `http://${backendIP}:${backendPort}/game-collection`;
  const gameFilterUrl = `http://${backendIP}:${backendPort}/game/filter`;

  useEffect(() => {
    if (collectionId) {
      const fetchCollectionData = async () => {
        try {
          const response = await fetch(`${apiUrl}/${collectionId}`);

          if (!response.ok) {
            throw new Error("Collection not found");
          }

          const data = await response.json();
          setCollection(data);

          setFormData({
            name: data.name || '',
            gameIds: data.gameIds || [],
            color: data.color || ''
          });

          setSelectedGames(data.games || []);
        } catch (error) {
          console.error("Failed to fetch collection:", error);
        }
      };
      fetchCollectionData();
    }
  }, [collectionId, apiUrl]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.post(gameFilterUrl, { name: '' });
        setGames(response.data);
      } catch (error) {
        console.error('Failed to fetch games', error);
      }
    };

    fetchGames();
  }, [gameFilterUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(`${apiUrl}/${collectionId}`, formData);
      alert('Collection created successfully!');
      setFormData({ name: '', gameIds: [], color: '' });
      setSelectedGames([]);
    } catch (error) {
      console.error(error);
      alert('Failed to create Collection.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddGameClick = () => setShowModal(true);

  const handleSelectGame = (game) => {
    if (!formData.gameIds.includes(game.id)) {
      setFormData((prev) => ({
        ...prev,
        gameIds: [...prev.gameIds, game.id]
      }));
      setSelectedGames((prev) => [...prev, game]);
    }
    setShowModal(false);
  };

  const handleRemoveGame = (gameId) => {
    setFormData((prev) => ({
        ...prev,
        gameIds: prev.gameIds.filter(id => id !== gameId)
    }));
    setSelectedGames((prev) => prev.filter(g => g.id !== gameId));
  };

  return (
    <div className="edit-collection-page">
      <div className="header-edit-collection">
        <h1>Edit Collection</h1>
      </div>

      <div className="edit-collection-main">
        <div className="edit-collection-back-button">
          <BackButton />
        </div>

        <CollectionEditForm 
          formData={formData}
          handleChange={handleChange}
          collection={collection}
          handleSubmit={handleSubmit}
          selectedGames={selectedGames}
          onAddGameClick={handleAddGameClick}
          onRemoveGameClick={handleRemoveGame}
        />
      </div>

      {showModal && (
        <GameModal
          games={games.filter(g => !formData.gameIds.includes(g.id))}
          selectedGames={selectedGames}
          onSelectGame={handleSelectGame}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
};

export default EditCollectionsPage;