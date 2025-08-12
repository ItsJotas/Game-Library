import './GameModal.css';

const GameModal = ({ games = [], selectedGames = [], onSelectGame, onClose }) => {
  const filteredGames = games.filter(
    (game) => !selectedGames.some((sg) => sg.id === game.id)
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select a Game</h2>

        {filteredGames.length > 0 ? (
          <ul className="game-list">
            {filteredGames.map((game) => (
              <li key={game.id} onClick={() => onSelectGame(game)}>
                {game.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No games available to select</p>
        )}

        <button className="modal-close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default GameModal;