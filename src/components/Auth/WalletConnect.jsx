import React, { useState } from 'react';
import { useWallet } from '../../context/WalletContext';
import './WalletConnect.css';

const WalletConnect = () => {
  const { connect, isConnecting, error, detectWallet } = useWallet();
  const [showOptions, setShowOptions] = useState(false);

  const handleConnect = async (type) => {
    try {
      await connect(type);
      setShowOptions(false);
    } catch (error) {
      console.error('Connection error:', error);
    }
  };

  return (
    <div className="wallet-connect">
      {!showOptions ? (
        <button 
          className="btn btn-primary"
          onClick={() => setShowOptions(true)}
          disabled={isConnecting}
        >
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="wallet-options">
          <h3>Select Wallet</h3>
          <div className="options-grid">
            {(detectWallet === 'ronin-extension' || detectWallet === null) && (
              <button
                className="wallet-option"
                onClick={() => handleConnect('ronin-extension')}
                disabled={isConnecting}
              >
                <div className="option-icon">🦊</div>
                <div className="option-name">Ronin Wallet</div>
                <div className="option-desc">Extension</div>
              </button>
            )}
            {(detectWallet === 'metamask' || detectWallet === null) && (
              <button
                className="wallet-option"
                onClick={() => handleConnect('metamask')}
                disabled={isConnecting}
              >
                <div className="option-icon">🦊</div>
                <div className="option-name">MetaMask</div>
                <div className="option-desc">Web3 Wallet</div>
              </button>
            )}
          </div>
          <button 
            className="btn btn-secondary mt-2"
            onClick={() => setShowOptions(false)}
          >
            Cancel
          </button>
          {error && <div className="error-message mt-2">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
