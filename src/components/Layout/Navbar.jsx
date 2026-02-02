import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWallet } from '../../context/WalletContext';
import { useGame } from '../../context/GameContext';
import { formatAddress } from '../../utils/helpers';
import './Navbar.css';

const Navbar = () => {
  const { address, isConnected, disconnect } = useWallet();
  const { userData, isAdmin } = useGame();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🪐</span>
          <span className="logo-text">Ronin Planets</span>
        </Link>

        {isConnected && (
          <div className="navbar-links">
            <Link 
              to="/dashboard" 
              className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/planets" 
              className={`navbar-link ${isActive('/planets') ? 'active' : ''}`}
            >
              Planets
            </Link>
            <Link 
              to="/factory" 
              className={`navbar-link ${isActive('/factory') ? 'active' : ''}`}
            >
              Factory
            </Link>
            <Link 
              to="/rewards" 
              className={`navbar-link ${isActive('/rewards') ? 'active' : ''}`}
            >
              Rewards
            </Link>
            {isAdmin && (
              <Link 
                to="/admin" 
                className={`navbar-link admin-link ${isActive('/admin') ? 'active' : ''}`}
              >
                Admin
              </Link>
            )}
          </div>
        )}

        <div className="navbar-right">
          {isConnected && userData && (
            <div className="user-stats">
              <div className="stat">
                <span className="stat-label">Points:</span>
                <span className="stat-value text-cyan">{userData.points}</span>
              </div>
            </div>
          )}
          
          {isConnected ? (
            <div className="wallet-info">
              <span className="wallet-address">{formatAddress(address)}</span>
              <button className="btn btn-secondary btn-sm" onClick={disconnect}>
                Disconnect
              </button>
            </div>
          ) : (
            <Link to="/" className="btn btn-primary">
              Connect Wallet
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
