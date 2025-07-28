import './CreateCollectionPage.css';
import CollectionForm from '../../components/CollectionForm';
import GameModal from '../../components/gameModal/GameModal';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCollectionPage = () => {
    const backendIP = process.env.REACT_APP_BACKEND_IP;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    const apiUrl = `http://${backendIP}:${backendPort}/game-collection`;
    const gameFilterUrl = `http://${backendIP}:${backendPort}/game/filter`;

    const [formData, setFormData] = useState({
      name: '',
      gameIds: [],
      color: ''
    });

    const [games, setGames] = useState([]);
    const [selectedGames, setSelectedGames] = useState([]);
    const [showModal, setShowModal] = useState(false);

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

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        await axios.post(apiUrl, formData);
        alert('Collection created successfully!');
        setFormData({ name: '', gameIds: [], color: '' });
        setSelectedGames([]);
      } catch (error) {
        console.error(error);
        alert('Failed to create Collection.');
      }
    };

    return (
        <div className="create-collection-page">
            <div className="header-create-collection">
              <h1>Create a New Collection</h1>
            </div>

            <div className="create-collection-main">
              <CollectionForm
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                selectedGames={selectedGames}
                onAddGameClick={handleAddGameClick}
                onRemoveGameClick={handleRemoveGame}
              />
            </div>

            {showModal && (
              <GameModal
                games={games.filter(g => !formData.gameIds.includes(g.id))} // filter out selected
                onSelectGame={handleSelectGame}
                onClose={() => setShowModal(false)}
              />
            )}
        </div>
    );
};

export default CreateCollectionPage;