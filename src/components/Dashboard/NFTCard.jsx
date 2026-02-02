import React from 'react';
import { Link } from 'react-router-dom';
import CooldownTimer from '../Common/CooldownTimer';
import { getCooldown } from '../../utils/storage';
import { useWallet } from '../../context/WalletContext';
import './NFTCard.css';

const NFTCard = ({ nft, knowledge }) => {
  const { address } = useWallet();
  const cooldownEnd = getCooldown(address, nft.tokenId);

  return (
    <Link to={`/planets?nft=${nft.tokenId}`} className="nft-card card">
      <div className="nft-image">
        {nft.image ? (
          <img src={nft.image} alt={nft.name} />
        ) : (
          <div className="nft-placeholder">🪐</div>
        )}
      </div>
      
      <div className="nft-info">
        <h3 className="nft-name">{nft.name || `NFT #${nft.tokenId}`}</h3>
        <div className="nft-id">Token ID: {nft.tokenId}</div>
        
        {cooldownEnd && (
          <div className="nft-cooldown">
            <span className="cooldown-label">Status:</span>
            <CooldownTimer cooldownEnd={cooldownEnd} />
          </div>
        )}
        
        {knowledge && (
          <div className="nft-knowledge">
            <div className="knowledge-title">Knowledge Levels</div>
            <div className="knowledge-grid">
              {Object.entries(knowledge).slice(0, 3).map(([resource, level]) => (
                <div key={resource} className="knowledge-item">
                  <span className="knowledge-resource">{resource}:</span>
                  <span className="knowledge-level">{level}</span>
                </div>
              ))}
            </div>
            {Object.keys(knowledge).length > 3 && (
              <div className="knowledge-more text-muted">
                +{Object.keys(knowledge).length - 3} more...
              </div>
            )}
          </div>
        )}
      </div>
    </Link>
  );
};

export default NFTCard;
