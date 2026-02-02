import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import CreateReward from './CreateReward';
import PendingClaims from './PendingClaims';
import Statistics from './Statistics';
import './AdminPanel.css';

const AdminPanel = () => {
  const navigate = useNavigate();
  const { isAdmin } = useGame();
  const [activeTab, setActiveTab] = useState('claims');
  const [refreshKey, setRefreshKey] = useState(0);

  if (!isAdmin) {
    return (
      <div className="admin-panel">
        <div className="access-denied card">
          <h2>🚫 Access Denied</h2>
          <p>You do not have permission to access the admin panel.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>🛠️ Admin Panel</h1>
        <p className="page-description text-secondary">
          Manage rewards, review claims, and monitor game statistics.
        </p>
      </div>

      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'claims' ? 'active' : ''}`}
          onClick={() => setActiveTab('claims')}
        >
          Pending Claims
        </button>
        <button 
          className={`admin-tab ${activeTab === 'create' ? 'active' : ''}`}
          onClick={() => setActiveTab('create')}
        >
          Create Reward
        </button>
        <button 
          className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'claims' && (
          <PendingClaims key={`claims-${refreshKey}`} onClaimProcessed={handleRefresh} />
        )}
        {activeTab === 'create' && (
          <CreateReward key={`create-${refreshKey}`} onRewardCreated={handleRefresh} />
        )}
        {activeTab === 'stats' && (
          <Statistics key={`stats-${refreshKey}`} />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
