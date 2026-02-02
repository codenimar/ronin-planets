import React from 'react';
import { getStorageData } from '../../utils/storage';
import { formatNumber } from '../../utils/helpers';
import './Statistics.css';

const Statistics = () => {
  const data = getStorageData();
  
  const stats = {
    totalUsers: Object.keys(data.users).length,
    totalRewards: data.rewards.length,
    totalClaims: data.pendingClaims.length,
    distributedClaims: data.pendingClaims.filter(c => c.status === 'distributed').length,
    rejectedClaims: data.pendingClaims.filter(c => c.status === 'rejected').length,
    pendingClaims: data.pendingClaims.filter(c => c.status === 'pending').length,
  };

  const getTotalPoints = () => {
    return Object.values(data.users).reduce((sum, user) => sum + (user.points || 0), 0);
  };

  const getTotalCrafts = () => {
    return Object.values(data.users).reduce((sum, user) => 
      sum + (user.craftingHistory?.length || 0), 0
    );
  };

  const getMostActiveUser = () => {
    let maxCrafts = 0;
    let mostActive = null;

    Object.entries(data.users).forEach(([address, user]) => {
      const crafts = user.craftingHistory?.length || 0;
      if (crafts > maxCrafts) {
        maxCrafts = crafts;
        mostActive = { address, crafts };
      }
    });

    return mostActive;
  };

  const mostActive = getMostActiveUser();

  return (
    <div className="statistics card">
      <h2>Game Statistics</h2>
      
      <div className="stats-grid">
        <div className="stat-box">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <div className="stat-value text-cyan">{stats.totalUsers}</div>
            <div className="stat-label">Total Players</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <div className="stat-value text-purple">{stats.totalRewards}</div>
            <div className="stat-label">Total Rewards</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">⭐</div>
          <div className="stat-content">
            <div className="stat-value text-green">{formatNumber(getTotalPoints())}</div>
            <div className="stat-label">Total Points Earned</div>
          </div>
        </div>

        <div className="stat-box">
          <div className="stat-icon">⚙️</div>
          <div className="stat-content">
            <div className="stat-value text-orange">{formatNumber(getTotalCrafts())}</div>
            <div className="stat-label">Items Crafted</div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3>Claim Statistics</h3>
        <div className="claims-stats">
          <div className="claim-stat">
            <span className="claim-stat-label">Pending:</span>
            <span className="claim-stat-value text-orange">{stats.pendingClaims}</span>
          </div>
          <div className="claim-stat">
            <span className="claim-stat-label">Distributed:</span>
            <span className="claim-stat-value text-green">{stats.distributedClaims}</span>
          </div>
          <div className="claim-stat">
            <span className="claim-stat-label">Rejected:</span>
            <span className="claim-stat-value text-red">{stats.rejectedClaims}</span>
          </div>
          <div className="claim-stat">
            <span className="claim-stat-label">Total:</span>
            <span className="claim-stat-value text-cyan">{stats.totalClaims}</span>
          </div>
        </div>
      </div>

      {mostActive && (
        <div className="stats-section">
          <h3>Most Active Player</h3>
          <div className="most-active">
            <div className="active-address">{mostActive.address}</div>
            <div className="active-crafts">
              <span className="text-green">{mostActive.crafts}</span> items crafted
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
