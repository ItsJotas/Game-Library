import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#f0f0f0', marginBottom: '20px', textAlign: 'center' }}>
      <Link to="/" style={{ margin: '0 15px', textDecoration: 'none', color: 'blue' }}>
        Home
      </Link>
      <Link to="/add-game" style={{ margin: '0 15px', textDecoration: 'none', color: 'blue' }}>
        Add Game
      </Link>
    </nav>
  );
};

export default Navbar;