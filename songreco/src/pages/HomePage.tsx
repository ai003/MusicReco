import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './styles/HomePage.css';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/select-songs')
    };

    

  return (
    <div className="home-page">
      <h1>Welcome to Music Recommendation</h1>
      <p>Select your favorite songs and get personalized recommendations</p>
      <button onClick={handleGetStarted}>Get Started</button>
    </div>
  );
};

export default HomePage;
