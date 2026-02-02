import React, { createContext, useContext, useState, useEffect } from 'react';
import { useWallet } from './WalletContext';
import { fetchUserNFTs } from '../services/nftService';
import { 
  initUserData, 
  getUserData, 
  updateUserData,
  getStorageData 
} from '../utils/storage';
import { ADMIN_ADDRESS } from '../utils/constants';
import { isAdmin } from '../utils/helpers';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

export const GameProvider = ({ children }) => {
  const { address, isConnected } = useWallet();
  const [nfts, setNfts] = useState([]);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch NFTs and initialize user data when wallet connects
  useEffect(() => {
    if (isConnected && address) {
      loadUserData();
    } else {
      setNfts([]);
      setUserData(null);
    }
  }, [isConnected, address]);

  const loadUserData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Fetch NFTs from blockchain
      const userNfts = await fetchUserNFTs(address);
      setNfts(userNfts);

      // Initialize or get user data from storage
      const data = initUserData(address, userNfts);
      setUserData(data);
    } catch (error) {
      console.error('Error loading user data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUserData = () => {
    if (address) {
      const data = getUserData(address);
      setUserData(data);
    }
  };

  const updateData = (updates) => {
    if (address) {
      const updated = updateUserData(address, updates);
      setUserData(updated);
      return updated;
    }
    return null;
  };

  const checkIsAdmin = () => {
    return isAdmin(address, ADMIN_ADDRESS);
  };

  const value = {
    nfts,
    userData,
    isLoading,
    error,
    loadUserData,
    refreshUserData,
    updateData,
    isAdmin: checkIsAdmin(),
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};
