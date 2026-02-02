import React from 'react';
import { useGame } from '../../context/GameContext';
import { formatNumber } from '../../utils/helpers';
import './ResourceInventory.css';

const ResourceInventory = () => {
  const { userData } = useGame();

  if (!userData || !userData.resources) {
    return null;
  }

  const resources = Object.entries(userData.resources);

  return (
    <div className="resource-inventory card">
      <h3 className="card-header">Resource Inventory</h3>
      <div className="resource-grid">
        {resources.map(([resource, amount]) => (
          <div key={resource} className="resource-item">
            <div className="resource-name">{resource}</div>
            <div className="resource-amount">{formatNumber(amount)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceInventory;
