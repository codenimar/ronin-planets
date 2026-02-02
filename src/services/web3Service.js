import { ethers } from 'ethers';
import { NFT_CONTRACT_ADDRESS, RONIN_RPC_URL } from '../utils/constants';

// Simple ERC721 ABI for getting NFTs
const ERC721_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
];

/**
 * Connect to Ronin Wallet (Extension)
 */
export const connectRoninWallet = async () => {
  try {
    if (!window.ronin) {
      throw new Error('Ronin Wallet extension not found. Please install it.');
    }

    const provider = new ethers.BrowserProvider(window.ronin.provider);
    const accounts = await provider.send('eth_requestAccounts', []);
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return {
      provider,
      signer,
      address,
      type: 'ronin-extension',
    };
  } catch (error) {
    console.error('Error connecting to Ronin Wallet:', error);
    throw error;
  }
};

/**
 * Connect to MetaMask
 */
export const connectMetaMask = async () => {
  try {
    if (!window.ethereum) {
      throw new Error('MetaMask not found. Please install it.');
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_requestAccounts', []);
    
    if (!accounts || accounts.length === 0) {
      throw new Error('No accounts found');
    }

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    return {
      provider,
      signer,
      address,
      type: 'metamask',
    };
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    throw error;
  }
};

/**
 * Detect available wallet
 */
export const detectWallet = () => {
  if (window.ronin?.provider) {
    return 'ronin-extension';
  }
  if (window.ethereum) {
    return 'metamask';
  }
  return null;
};

/**
 * Get current connected account
 */
export const getCurrentAccount = async (walletType) => {
  try {
    let provider;
    
    if (walletType === 'ronin-extension' && window.ronin?.provider) {
      provider = new ethers.BrowserProvider(window.ronin.provider);
    } else if (walletType === 'metamask' && window.ethereum) {
      provider = new ethers.BrowserProvider(window.ethereum);
    } else {
      return null;
    }

    const accounts = await provider.send('eth_accounts', []);
    return accounts && accounts.length > 0 ? accounts[0] : null;
  } catch (error) {
    console.error('Error getting current account:', error);
    return null;
  }
};

/**
 * Disconnect wallet
 */
export const disconnectWallet = () => {
  // Clear session storage
  sessionStorage.removeItem('wallet_address');
  sessionStorage.removeItem('wallet_type');
  return true;
};

/**
 * Check if connected to Ronin network
 */
export const checkNetwork = async (provider) => {
  try {
    const network = await provider.getNetwork();
    // Ronin mainnet chainId is 2020
    // Ronin testnet (Saigon) chainId is 2021
    return network.chainId === 2020n || network.chainId === 2021n;
  } catch (error) {
    console.error('Error checking network:', error);
    return false;
  }
};

/**
 * Switch to Ronin network (for MetaMask)
 */
export const switchToRoninNetwork = async () => {
  try {
    if (!window.ethereum) return false;

    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: '0x7e4', // 2020 in hex
        chainName: 'Ronin Mainnet',
        nativeCurrency: {
          name: 'RON',
          symbol: 'RON',
          decimals: 18,
        },
        rpcUrls: ['https://api.roninchain.com/rpc'],
        blockExplorerUrls: ['https://app.roninchain.com/'],
      }],
    });

    return true;
  } catch (error) {
    console.error('Error switching to Ronin network:', error);
    return false;
  }
};

/**
 * Get provider for reading (no wallet needed)
 */
export const getReadProvider = () => {
  try {
    return new ethers.JsonRpcProvider(RONIN_RPC_URL);
  } catch (error) {
    console.error('Error creating read provider:', error);
    return null;
  }
};
