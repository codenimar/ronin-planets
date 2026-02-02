import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { useWallet } from '../../context/WalletContext';
import { useToast } from '../Common/Toast';
import { updateKnowledge, setCooldown } from '../../utils/storage';
import { calculateLearningCost } from '../../utils/helpers';
import { COOLDOWN_DURATION, MAX_KNOWLEDGE_LEVEL } from '../../utils/constants';
import CooldownTimer from '../Common/CooldownTimer';
import './Laboratory.css';

const Laboratory = ({ planet, nft, cooldownEnd }) => {
  const { address } = useWallet();
  const { userData, refreshUserData } = useGame();
  const { success, error } = useToast();
  const [isLearning, setIsLearning] = useState(false);

  const currentLevel = userData?.knowledge?.[nft.tokenId]?.[planet.resource] || 1;
  const learningCost = calculateLearningCost(currentLevel);
  const canLearn = currentLevel < MAX_KNOWLEDGE_LEVEL && !cooldownEnd;

  const handleLearn = async () => {
    if (!canLearn) return;

    setIsLearning(true);

    try {
      // Simulate learning (in real app, this would interact with smart contract)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update knowledge level
      const newLevel = currentLevel + 1;
      updateKnowledge(address, nft.tokenId, planet.resource, newLevel);

      // Set cooldown
      const cooldownEndTime = Date.now() + COOLDOWN_DURATION;
      setCooldown(address, nft.tokenId, cooldownEndTime);

      refreshUserData();
      success(`Learning complete! ${planet.resource} knowledge increased to level ${newLevel}`);
    } catch (err) {
      console.error('Learning error:', err);
      error('Failed to complete learning session');
    } finally {
      setIsLearning(false);
    }
  };

  return (
    <div className="laboratory">
      <div className="lab-header">
        <h3>🔬 Laboratory</h3>
        <p className="text-secondary">
          Increase your knowledge of {planet.resource} to improve mining efficiency
        </p>
      </div>

      <div className="lab-content">
        <div className="knowledge-display card">
          <div className="knowledge-header">
            <span className="knowledge-label">Current Knowledge Level</span>
            <span className="knowledge-value text-cyan">{currentLevel}</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${(currentLevel / MAX_KNOWLEDGE_LEVEL) * 100}%` }}
            />
          </div>
          <div className="progress-text">
            {currentLevel} / {MAX_KNOWLEDGE_LEVEL}
          </div>
        </div>

        <div className="learning-info card">
          <h4>Learning Session</h4>
          <div className="info-row">
            <span className="info-label">Cost:</span>
            <span className="info-value text-orange">{learningCost} AstRON</span>
          </div>
          <div className="info-row">
            <span className="info-label">Result:</span>
            <span className="info-value text-green">+1 Knowledge Level</span>
          </div>
          <div className="info-row">
            <span className="info-label">Cooldown:</span>
            <span className="info-value text-purple">12 hours</span>
          </div>
        </div>

        {cooldownEnd ? (
          <div className="cooldown-display card">
            <div className="cooldown-message">
              <span>⏳</span>
              <span>Learning on cooldown</span>
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
            className="btn btn-primary btn-learn"
            onClick={handleLearn}
            disabled={!canLearn || isLearning}
          >
            {isLearning ? (
              <>
                <span className="spinner"></span>
                Learning...
              </>
            ) : currentLevel >= MAX_KNOWLEDGE_LEVEL ? (
              'Max Level Reached'
            ) : (
              `Learn for ${learningCost} AstRON`
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Laboratory;
