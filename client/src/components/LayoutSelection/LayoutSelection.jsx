
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './LayoutSelection.css';



const LayoutSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categories, answers } = location.state || {};

  const handleLayoutSelection = (layout) => {
    navigate('/image-selection', { state: { categories, answers, layout } });
  };

  return (
    <div className='layout-selection-container'>
      <h3>Choose a Mode from Below:</h3>
      <div className="layout-options">
      <div className="layout-card">
        <img src='/portraitLayoutImg.png' alt="Portrait Mode" className='layout-image'></img>
        <button className='layout-button' onClick={() => handleLayoutSelection('Portrait')}>Portrait Mode</button>
      </div>

      <div className="layout-card">
        <img src='/landscapeLayoutImg.png' alt="Lanscape Mode" className='layout-image'></img>
        <button className='layout-button' onClick={() => handleLayoutSelection('Landscape')}>Landscape Mode</button>
      </div>
      </div> 
    </div>
  );
};

export default LayoutSelection;

