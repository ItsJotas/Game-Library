import './GameModal.css';

const GameModal = ({ games, onSelectGame, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Select a Game</h2>
        <ul className="game-list">
          {games.map((game) => (
            <li key={game.id} onClick={() => onSelectGame(game)}>
              {game.name}
            </li>
          ))}
        </ul>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default GameModal;