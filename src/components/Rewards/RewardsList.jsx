import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../Common/Toast';
import { getRewards, claimReward, getUserClaimedRewards } from '../../utils/storage';
import RewardCard from './RewardCard';
import ClaimModal from './ClaimModal';
import './RewardsList.css';

const RewardsList = () => {
  const { address } = useWallet();
  const { userData, refreshUserData } = useGame();
  const { success, error } = useToast();
  const [selectedReward, setSelectedReward] = useState(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [filterType, setFilterType] = useState('all');

  const rewards = getRewards();
  const userPoints = userData?.points || 0;
  const userClaimed = getUserClaimedRewards(address);

  const filteredRewards = filterType === 'all' 
    ? rewards 
    : rewards.filter(r => r.type === filterType);

  const rewardTypes = ['all', ...new Set(rewards.map(r => r.type))];

  const handleClaimClick = (reward) => {
    const hasClaimed = userClaimed.some(c => c.rewardId === reward.id);
    if (userPoints >= reward.pointsNeeded && !hasClaimed) {
      setSelectedReward(reward);
    }
  };

  const handleConfirmClaim = async () => {
    if (!selectedReward) return;

    setIsClaiming(true);

    try {
      // Simulate claim (in real app, this would interact with smart contract)
      await new Promise(resolve => setTimeout(resolve, 1000));

      const claim = claimReward(address, selectedReward.id);
      
      if (claim) {
        refreshUserData();
        success(`Claim submitted! Your request is pending admin approval.`);
        setSelectedReward(null);
      } else {
        error('Failed to claim reward. You may have already claimed it or lack sufficient points.');
      }
    } catch (err) {
      console.error('Claim error:', err);
      error('Failed to submit claim');
    } finally {
      setIsClaiming(false);
    }
  };

  return (
    <div className="rewards-list">
      <div className="rewards-header">
        <div>
          <h1>🏆 Rewards</h1>
          <p className="page-description text-secondary">
            Exchange your points for exclusive rewards. All claims are reviewed by admins.
          </p>
        </div>
        <div className="user-points-display card">
          <span className="points-label">Your Points:</span>
          <span className="points-value text-cyan">{userPoints}</span>
        </div>
      </div>

      <div className="rewards-controls card">
        <div className="filter-tabs">
          {rewardTypes.map(type => (
            <button
              key={type}
              className={`filter-tab ${filterType === type ? 'active' : ''}`}
              onClick={() => setFilterType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {filteredRewards.length > 0 ? (
        <div className="rewards-grid">
          {filteredRewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={userPoints}
              userClaimed={userClaimed}
              onClaim={handleClaimClick}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state card">
          <h3>No rewards available</h3>
          <p>Check back later for new rewards!</p>
        </div>
      )}

      <ClaimModal
        isOpen={!!selectedReward}
        onClose={() => setSelectedReward(null)}
        reward={selectedReward}
        onConfirm={handleConfirmClaim}
        isClaiming={isClaiming}
      />
    </div>
  );
};

export default RewardsList;
