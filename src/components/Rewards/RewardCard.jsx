import React from 'react';
import { formatNumber } from '../../utils/helpers';
import './RewardCard.css';

const RewardCard = ({ reward, userPoints, userClaimed, onClaim }) => {
  const hasClaimed = userClaimed?.some(c => c.rewardId === reward.id);
  const canClaim = userPoints >= reward.pointsNeeded && !hasClaimed;
  
  const getClaimStatus = () => {
    if (!hasClaimed) return null;
    
    const claim = userClaimed.find(c => c.rewardId === reward.id);
    return claim?.status;
  };

  const claimStatus = getClaimStatus();

  return (
    <div className="reward-card card">
      <div className="reward-header">
        <h3>{reward.name}</h3>
        <div className="reward-points text-cyan">{formatNumber(reward.pointsNeeded)} Points</div>
      </div>
      
      <p className="reward-description">{reward.description}</p>
      
      <div className="reward-details">
        <div className="detail-item">
          <span className="detail-label">Type:</span>
          <span className="detail-value text-purple">{reward.type}</span>
        </div>
        {reward.amount && (
          <div className="detail-item">
            <span className="detail-label">Amount:</span>
            <span className="detail-value text-green">{reward.amount}</span>
          </div>
        )}
      </div>

      {claimStatus ? (
        <div className={`claim-status status-${claimStatus}`}>
          {claimStatus === 'pending' && (
            <>
              <span className="status-icon">⏳</span>
              <span>Claim Pending</span>
            </>
          )}
          {claimStatus === 'distributed' && (
            <>
              <span className="status-icon">✓</span>
              <span>Claimed & Distributed</span>
            </>
          )}
          {claimStatus === 'rejected' && (
            <>
              <span className="status-icon">✕</span>
              <span>Claim Rejected</span>
            </>
          )}
        </div>
      ) : (
        <button
          className="btn btn-success btn-claim"
          onClick={() => onClaim(reward)}
          disabled={!canClaim}
        >
          {canClaim ? 'Claim Reward' : `Need ${formatNumber(reward.pointsNeeded - userPoints)} more points`}
        </button>
      )}
    </div>
  );
};

export default RewardCard;
