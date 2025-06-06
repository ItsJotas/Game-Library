import './Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Game Library</h1>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/add-game">Add Game</a></li>
        <li><a href="/unrated-games">Rate Games</a></li>
        <li><a href="/collections">Collections</a></li>
      </ul>
    </div>
  );
};

export default Navbar;