import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import NFTCard from './NFTCard';
import ResourceInventory from './ResourceInventory';
import { formatNumber } from '../../utils/helpers';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { nfts, userData, isLoading } = useGame();

  if (isLoading) {
    return (
      <div className="dashboard">
        <div className="loading-container flex-center">
          <div className="spinner"></div>
          <p>Loading your data...</p>
        </div>
      </div>
    );
  }

  if (!nfts || nfts.length === 0) {
    return (
      <div className="dashboard">
        <div className="empty-state card">
          <h2>No NFTs Found</h2>
          <p>You need to own Ronin Planets NFTs to play this game.</p>
          <button className="btn btn-primary" onClick={() => window.open('https://marketplace.skymavis.com', '_blank')}>
            Get NFTs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="stats-summary">
          <div className="stat-card card">
            <div className="stat-label">Total Points</div>
            <div className="stat-value text-cyan">{formatNumber(userData?.points || 0)}</div>
          </div>
          <div className="stat-card card">
            <div className="stat-label">NFTs Owned</div>
            <div className="stat-value text-purple">{nfts.length}</div>
          </div>
          <div className="stat-card card">
            <div className="stat-label">Items Crafted</div>
            <div className="stat-value text-green">
              {userData?.craftingHistory?.length || 0}
            </div>
          </div>
        </div>
      </div>

      <ResourceInventory />

      <div className="nfts-section">
        <div className="section-header">
          <h2>Your NFTs</h2>
          <button className="btn btn-secondary" onClick={() => navigate('/planets')}>
            Explore Planets
          </button>
        </div>
        <div className="nfts-grid">
          {nfts.map((nft) => (
            <NFTCard
              key={nft.tokenId}
              nft={nft}
              knowledge={userData?.knowledge?.[nft.tokenId]}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
