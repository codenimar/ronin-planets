import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PlanetCard.css';

const PlanetCard = ({ planet, userKnowledge }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/planets/${planet.id}`);
  };

  return (
    <div 
      className="planet-card card" 
      onClick={handleClick}
      style={{ '--planet-gradient': planet.gradient }}
    >
      <div className="planet-icon" style={{ background: planet.gradient }}>
        🪐
      </div>
      
      <div className="planet-info">
        <h3 className="planet-name">{planet.name}</h3>
        <div className="planet-resource" style={{ color: planet.color }}>
          {planet.resource}
        </div>
        <p className="planet-description">{planet.description}</p>
        
        {userKnowledge && (
          <div className="planet-knowledge">
            <span className="knowledge-label">Avg. Knowledge:</span>
            <span className="knowledge-value text-cyan">
              {userKnowledge.toFixed(1)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanetCard;
