import React from 'react';
import Modal from '../Common/Modal';
import { formatNumber } from '../../utils/helpers';

const ClaimModal = ({ isOpen, onClose, reward, onConfirm, isClaiming }) => {
  if (!reward) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Claim Reward" size="medium">
      <div className="claim-modal">
        <div className="modal-reward-info">
          <h3>{reward.name}</h3>
          <p className="text-secondary">{reward.description}</p>
        </div>

        <div className="modal-reward-details">
          <div className="detail-row">
            <span className="detail-label">Points Required:</span>
            <span className="detail-value text-cyan">{formatNumber(reward.pointsNeeded)}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">Type:</span>
            <span className="detail-value text-purple">{reward.type}</span>
          </div>
          {reward.amount && (
            <div className="detail-row">
              <span className="detail-label">Amount:</span>
              <span className="detail-value text-green">{reward.amount}</span>
            </div>
          )}
        </div>

        <div className="modal-notice">
          <h4>⚠️ Important Notice</h4>
          <p className="text-secondary">
            Your claim will be submitted for admin review. Points will be deducted immediately. 
            The admin has 48 hours to distribute or reject your claim. If rejected, points will be refunded.
          </p>
        </div>

        <div className="modal-actions">
          <button 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={isClaiming}
          >
            Cancel
          </button>
          <button 
            className="btn btn-success" 
            onClick={onConfirm}
            disabled={isClaiming}
          >
            {isClaiming ? (
              <>
                <span className="spinner"></span>
                Claiming...
              </>
            ) : (
              'Confirm Claim'
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ClaimModal;
