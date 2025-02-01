import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AddGamePage from './pages/addGamePage/AddGamePage';
import UnratedGamesPage from './pages/unratedGamesPage/UnratedGamesPage';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-game" element={<AddGamePage />} />
        <Route path="/unrated-games" element={<UnratedGamesPage />} />
      </Routes>
    </Router>
  );
}

export default App;