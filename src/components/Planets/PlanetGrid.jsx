import React from 'react';
import { useGame } from '../../context/GameContext';
import PlanetCard from './PlanetCard';
import { PLANETS } from '../../utils/constants';
import './PlanetGrid.css';

const PlanetGrid = () => {
  const { userData } = useGame();

  const getAverageKnowledge = (planetResource) => {
    if (!userData || !userData.knowledge) return null;

    const allLevels = Object.values(userData.knowledge)
      .map(nftKnowledge => nftKnowledge[planetResource] || 0)
      .filter(level => level > 0);

    if (allLevels.length === 0) return null;

    return allLevels.reduce((sum, level) => sum + level, 0) / allLevels.length;
  };

  return (
    <div className="planet-grid-page">
      <div className="page-header">
        <h1>Explore Planets</h1>
        <p className="page-description text-secondary">
          Discover 10 unique planets, each with its own resource. Learn and mine to collect materials for crafting.
        </p>
      </div>

      <div className="planet-grid">
        {PLANETS.map((planet) => (
          <PlanetCard
            key={planet.id}
            planet={planet}
            userKnowledge={getAverageKnowledge(planet.resource)}
          />
        ))}
      </div>
    </div>
  );
};

export default PlanetGrid;
