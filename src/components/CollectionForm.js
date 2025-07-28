const CollectionForm = ({
    formData,
    handleChange,
    handleSubmit,
    selectedGames,
    onAddGameClick,
    onRemoveGameClick
}) => {

    return (
        <form onSubmit={handleSubmit} className="collection-form">

            <div className="collection-form-row">
                <div className="collection-form-inputs">
                    <label className="collection-form-text">Collection Name:</label>
                    <input
                        className="collection-form-text-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="collection-form-inputs color-selector">
                    <label className="collection-form-text">Color:</label>
                    <input
                        type="color"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="collection-form-color-input"
                    />
                </div>
            </div>

            <div className="games-section">
                <label className="collection-form-text">Games:</label>
                
                <div className="games-grid">
                    <div className="game-card add-card" onClick={onAddGameClick}>
                        <span className="add-icon">+</span>
                    </div>

                    {selectedGames.length > 0 && selectedGames.map((game) => (
                        <div key={game.id} className="game-card-container">
                            <div className="remove-button" onClick={() => onRemoveGameClick(game.id)}>
                                <p>x</p>
                            </div>

                            <div className="game-card" title={game.name}>
                                <img src={game.imageUrl} alt={game.name} className="game-image" />
                                <div className="game-card-overlay">
                                    <span className="game-name">{game.name}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" className="btn-save-collection">
                Save Collection
            </button>
        </form>
    );
};

export default CollectionForm;