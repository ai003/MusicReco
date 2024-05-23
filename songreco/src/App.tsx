import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';//for routing
import HomePage from './pages/HomePage';
import RecommendPage from './pages/RecommendPage';
import './styles/App.css'
import logo from './purpleSpotify.jpeg';

const App: React.FC = () => {//first page seen, instant routing
  //url to component
  return (
    <Router>
      <div className='App'>
        <div className='logo'>
          <img src={logo} alt="Logo" />
        </div>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/select-songs' element={<RecommendPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;