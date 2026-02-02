import React, { createContext, useContext, useState, useEffect } from 'react';
import { connectRoninWallet, connectMetaMask, detectWallet, getCurrentAccount, disconnectWallet } from '../services/web3Service';

const WalletContext = createContext();

const WalletProvider = ({ children }) => {
  const [address, setAddress] = useState(null);
  const [walletType, setWalletType] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    const savedAddress = sessionStorage.getItem('wallet_address');
    const savedType = sessionStorage.getItem('wallet_type');
    
    if (savedAddress && savedType) {
      // Try to restore connection
      restoreConnection(savedAddress, savedType);
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (walletType === 'ronin-extension' && window.ronin?.provider) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          sessionStorage.setItem('wallet_address', accounts[0]);
        }
      };

      window.ronin.provider.on('accountsChanged', handleAccountsChanged);
      return () => window.ronin.provider.removeListener('accountsChanged', handleAccountsChanged);
    } else if (walletType === 'metamask' && window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (accounts[0] !== address) {
          setAddress(accounts[0]);
          sessionStorage.setItem('wallet_address', accounts[0]);
        }
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      return () => window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    }
  }, [walletType, address]);

  const restoreConnection = async (savedAddress, savedType) => {
    try {
      const currentAccount = await getCurrentAccount(savedType);
      if (currentAccount && currentAccount.toLowerCase() === savedAddress.toLowerCase()) {
        setAddress(savedAddress);
        setWalletType(savedType);
      } else {
        // Session expired or account changed
        sessionStorage.removeItem('wallet_address');
        sessionStorage.removeItem('wallet_type');
      }
    } catch (error) {
      console.error('Error restoring connection:', error);
      sessionStorage.removeItem('wallet_address');
      sessionStorage.removeItem('wallet_type');
    }
  };

  const connect = async (type) => {
    setIsConnecting(true);
    setError(null);

    try {
      let connection;
      
      if (type === 'ronin-extension' || type === 'ronin') {
        connection = await connectRoninWallet();
      } else if (type === 'metamask') {
        connection = await connectMetaMask();
      } else {
        throw new Error('Unsupported wallet type');
      }

      setAddress(connection.address);
      setWalletType(connection.type);
      setProvider(connection.provider);
      setSigner(connection.signer);

      // Save to session
      sessionStorage.setItem('wallet_address', connection.address);
      sessionStorage.setItem('wallet_type', connection.type);

      return connection.address;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setWalletType(null);
    setProvider(null);
    setSigner(null);
    setError(null);
    disconnectWallet();
  };

  const value = {
    address,
    walletType,
    provider,
    signer,
    isConnecting,
    error,
    isConnected: !!address,
    connect,
    disconnect,
    detectWallet: detectWallet(),
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
};

export { WalletProvider };
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
