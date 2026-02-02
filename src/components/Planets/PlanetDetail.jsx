import React, { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useGame } from '../../context/GameContext';
import { useWallet } from '../../context/WalletContext';
import { PLANETS } from '../../utils/constants';
import { getCooldown } from '../../utils/storage';
import Laboratory from './Laboratory';
import Mine from './Mine';
import './PlanetDetail.css';

const PlanetDetail = () => {
  const { planetId } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { nfts } = useGame();
  const { address } = useWallet();
  const [activeTab, setActiveTab] = useState('laboratory');

  const planet = PLANETS.find(p => p.id === parseInt(planetId));
  const nftParam = searchParams.get('nft');
  const [selectedNFT, setSelectedNFT] = useState(
    nftParam ? nfts.find(n => n.tokenId === nftParam) : nfts[0]
  );

  if (!planet) {
    return (
      <div className="planet-detail">
        <div className="error-state card">
          <h2>Planet Not Found</h2>
          <button className="btn btn-primary" onClick={() => navigate('/planets')}>
            Back to Planets
          </button>
        </div>
      </div>
    );
  }

  if (!selectedNFT) {
    return (
      <div className="planet-detail">
        <div className="error-state card">
          <h2>No NFT Selected</h2>
          <p>You need to own an NFT to interact with planets.</p>
          <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const cooldownEnd = getCooldown(address, selectedNFT.tokenId);

  return (
    <div className="planet-detail">
      <div className="planet-header" style={{ background: planet.gradient }}>
        <button className="btn btn-secondary back-button" onClick={() => navigate('/planets')}>
          ← Back
        </button>
        <div className="planet-title">
          <h1>{planet.name}</h1>
          <div className="planet-subtitle">{planet.description}</div>
          <div className="planet-resource-badge" style={{ borderColor: planet.color, color: planet.color }}>
            Resource: {planet.resource}
          </div>
        </div>
      </div>

      {nfts.length > 1 && (
        <div className="nft-selector card">
          <label>Select NFT:</label>
          <select 
            value={selectedNFT.tokenId} 
            onChange={(e) => setSelectedNFT(nfts.find(n => n.tokenId === e.target.value))}
          >
            {nfts.map(nft => (
              <option key={nft.tokenId} value={nft.tokenId}>
                {nft.name || `NFT #${nft.tokenId}`}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'laboratory' ? 'active' : ''}`}
          onClick={() => setActiveTab('laboratory')}
        >
          🔬 Laboratory
        </button>
        <button 
          className={`tab ${activeTab === 'mine' ? 'active' : ''}`}
          onClick={() => setActiveTab('mine')}
        >
          ⛏️ Mine
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'laboratory' && (
          <Laboratory 
            planet={planet} 
            nft={selectedNFT} 
            cooldownEnd={cooldownEnd}
          />
        )}
        {activeTab === 'mine' && (
          <Mine 
            planet={planet} 
            nft={selectedNFT} 
            cooldownEnd={cooldownEnd}
          />
        )}
      </div>
    </div>
  );
};

export default PlanetDetail;
