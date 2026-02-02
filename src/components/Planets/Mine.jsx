import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../Common/Toast';
import { updateResources, setCooldown } from '../../utils/storage';
import { calculateMiningOutput } from '../../utils/helpers';
import { COOLDOWN_DURATION } from '../../utils/constants';
import CooldownTimer from '../Common/CooldownTimer';
import './Mine.css';

const Mine = ({ planet, nft, cooldownEnd }) => {
  const { address } = useWallet();
  const { userData, refreshUserData } = useGame();
  const { success, error } = useToast();
  const [isMining, setIsMining] = useState(false);

  const knowledgeLevel = userData?.knowledge?.[nft.tokenId]?.[planet.resource] || 1;
  const miningOutput = calculateMiningOutput(knowledgeLevel);
  const canMine = !cooldownEnd;

  const handleMine = async () => {
    if (!canMine) return;

    setIsMining(true);

    try {
      // Simulate mining (in real app, this would interact with smart contract)
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Add resources
      updateResources(address, planet.resource, miningOutput, true);

      // Set cooldown
      const cooldownEndTime = Date.now() + COOLDOWN_DURATION;
      setCooldown(address, nft.tokenId, cooldownEndTime);

      refreshUserData();
      success(`Mined ${miningOutput} ${planet.resource}!`);
    } catch (err) {
      console.error('Mining error:', err);
      error('Failed to mine resources');
    } finally {
      setIsMining(false);
    }
  };

  return (
    <div className="mine">
      <div className="mine-header">
        <h3>⛏️ Mining Facility</h3>
        <p className="text-secondary">
          Extract {planet.resource} from {planet.name}
        </p>
      </div>

      <div className="mine-content">
        <div className="mining-stats card">
          <div className="stat-row">
            <span className="stat-label">Knowledge Level:</span>
            <span className="stat-value text-cyan">{knowledgeLevel}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Mining Output:</span>
            <span className="stat-value text-green">{miningOutput} {planet.resource}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Cooldown Period:</span>
            <span className="stat-value text-purple">12 hours</span>
          </div>
        </div>

        <div className="mining-info card">
          <h4>About Mining</h4>
          <p className="text-secondary">
            Your mining output equals your knowledge level. Increase your knowledge in the 
            Laboratory to mine more resources per session.
          </p>
          <p className="text-secondary">
            After mining, this NFT will be on cooldown for 12 hours before you can mine again.
          </p>
        </div>

        {cooldownEnd ? (
          <div className="cooldown-display card">
            <div className="cooldown-message">
              <span>⏳</span>
              <span>Mining on cooldown</span>
            </div>
            <div className="cooldown-timer">
              <CooldownTimer 
                cooldownEnd={cooldownEnd} 
                onComplete={refreshUserData}
              />
            </div>
          </div>
        ) : (
          <button
            className="btn btn-success btn-mine"
            onClick={handleMine}
            disabled={!canMine || isMining}
          >
            {isMining ? (
              <>
                <span className="spinner"></span>
                Mining...
              </>
            ) : (
              `Mine ${miningOutput} ${planet.resource}`
            )}
          </button>
        )}

        <div className="current-inventory card">
          <h4>Current Inventory</h4>
          <div className="inventory-amount">
            <span className="amount-value">{userData?.resources?.[planet.resource] || 0}</span>
            <span className="amount-label">{planet.resource}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mine;
