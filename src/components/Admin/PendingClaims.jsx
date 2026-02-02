import React from 'react';
import { useToast } from '../Common/Toast';
import { getPendingClaims, distributeReward, rejectReward } from '../../utils/storage';
import { formatAddress, getTimeUntilDeadline } from '../../utils/helpers';
import './PendingClaims.css';

const PendingClaims = ({ onClaimProcessed }) => {
  const { success, error } = useToast();
  const pendingClaims = getPendingClaims();

  const handleDistribute = async (claim) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = distributeReward(claim.id);
      if (result) {
        success(`Reward distributed to ${formatAddress(claim.userId)}`);
        if (onClaimProcessed) onClaimProcessed();
      } else {
        error('Failed to distribute reward');
      }
    } catch (err) {
      console.error('Distribute error:', err);
      error('Failed to distribute reward');
    }
  };

  const handleReject = async (claim) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const result = rejectReward(claim.id);
      if (result) {
        success(`Claim rejected. Points refunded to ${formatAddress(claim.userId)}`);
        if (onClaimProcessed) onClaimProcessed();
      } else {
        error('Failed to reject claim');
      }
    } catch (err) {
      console.error('Reject error:', err);
      error('Failed to reject claim');
    }
  };

  if (pendingClaims.length === 0) {
    return (
      <div className="pending-claims card">
        <h2>Pending Claims</h2>
        <div className="empty-state">
          <p className="text-secondary">No pending claims at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pending-claims card">
      <h2>Pending Claims ({pendingClaims.length})</h2>
      <div className="claims-list">
        {pendingClaims.map((claim) => (
          <div key={claim.id} className="claim-item card">
            <div className="claim-header">
              <div className="claim-info">
                <h4>{claim.rewardName}</h4>
                <div className="claim-user">
                  <span className="label">User:</span>
                  <span className="value text-cyan">{formatAddress(claim.userId)}</span>
                </div>
              </div>
              <div className="claim-time">
                <div className="time-label">Time Remaining:</div>
                <div className="time-value text-orange">
                  {getTimeUntilDeadline(claim.timestamp)}
                </div>
              </div>
            </div>

            <div className="claim-meta">
              <div className="meta-item">
                <span className="meta-label">Claim ID:</span>
                <span className="meta-value">{claim.id}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Submitted:</span>
                <span className="meta-value">
                  {new Date(claim.timestamp).toLocaleString()}
                </span>
              </div>
            </div>

            <div className="claim-actions">
              <button
                className="btn btn-success"
                onClick={() => handleDistribute(claim)}
              >
                ✓ Distribute
              </button>
              <button
                className="btn btn-danger"
                onClick={() => handleReject(claim)}
              >
                ✕ Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingClaims;
