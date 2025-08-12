const CollectionEditForm = ({
    formData,
    handleChange,
    collection,
    handleSubmit,
    selectedGames,
    onAddGameClick,
    onRemoveGameClick
}) => {

    return (
        <form onSubmit={handleSubmit} className="collection-form">
            <div className="collection-edit-form">
                <div className="edit-collection-form-row">
                    <div className="edit-collection-name-input">
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
        
                    <div className="disabled-edit-collection-inputs">
                        <label className="collection-form-text">Games Number:</label>
                        <input
                            type="text"
                            value={collection?.games?.length || 0}
                            disabled
                            className="collection-form-disabled-input"
                            title="Number of Games"
                        />
                    </div>
        
                    <div className="disabled-edit-collection-inputs">
                        <label className="collection-form-text">Rating:</label>
                        <input
                            type="text"
                            value={collection?.averageRating ?? 0}
                            disabled
                            className="collection-form-disabled-input"
                            title="Average Rating"
                        />
                    </div>
        
                    <div className="disabled-edit-collection-inputs color-selector">
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
                    
                <button type="submit" className="btn-edit-collection">
                    Save Collection
                </button>
            </div>
        </form>
    );
}

export default CollectionEditForm;