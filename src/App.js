import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/HomePage';
import AddGamePage from './pages/addGamePage/AddGamePage';
import RateGamesPage from './pages/rateGamesPage/RateGamesPage';
import UnratedGamesPage from './pages/unratedGamesPage/UnratedGamesPage';
import EditGamePage from './pages/editGamePage/EditGamePage';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add-game" element={<AddGamePage />} />
        <Route path="/edit-game/:gameId" element={<EditGamePage />} />
        <Route path="/unrated-games" element={<UnratedGamesPage />} />
        <Route path="/unrated-games/:gameId/rating" element={<RateGamesPage />} />
      </Routes>
    </Router>
  );
}

export default App;