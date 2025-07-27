import './CreateCollectionPage.css';
import CollectionForm from '../../components/CollectionForm';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CreateCollectionPage = () => {

    const backendIP = process.env.REACT_APP_BACKEND_IP;
    const backendPort = process.env.REACT_APP_BACKEND_PORT;
    const apiUrl = `http://${backendIP}:${backendPort}/game-collection`;
    const gameFilterUrl = `http://${backendIP}:${backendPort}/game/filter`;

    const [formData, setFormData] = useState({
        name: '',
        gameIds: '',
        color: ''
    });

    const [games, setGames] = useState([]);

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

    const resetForm = () => {
        setFormData({
            name: '',
            gameIds: [],
            color: ''
        });
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const payload = {
                name: formData.name,
                gameIds: formData.gameIds,
                color: formData.color
            };

            await axios.post(apiUrl, payload);
            alert('Collection created successfully!');
            resetForm();
        } catch (error) {
            console.error(error);
            alert('Failed to create Collection.');
        }
    };

    return (
        <div className="create-collection-page">

            <div class="header-create-collection">
                <h1>Create a New Collection</h1>
            </div>

            <div class="create-collection-main">
                <CollectionForm 
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    games={games}
                />
            </div>

        </div>            
    )
}

export default CreateCollectionPage;