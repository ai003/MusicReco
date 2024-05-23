import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/select-songs')
  };



  return (
    <div className="home-page">
      <h1>Welcome to Music Recommendation</h1>
      <p>Tired of not being able to find new music that fits your taste?</p>
      <p>Select your favorite songs from this list and get personalized recommendations!</p>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default HomePage;
