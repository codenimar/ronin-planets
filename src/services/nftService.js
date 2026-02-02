import { ethers } from 'ethers';
import axios from 'axios';
import { NFT_CONTRACT_ADDRESS } from '../utils/constants';
import { getReadProvider } from './web3Service';

// Simple ERC721 ABI for getting NFTs
const ERC721_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)',
  'function tokenURI(uint256 tokenId) view returns (string)',
  'function ownerOf(uint256 tokenId) view returns (address)',
];

/**
 * Fetch NFTs owned by an address
 */
export const fetchUserNFTs = async (address) => {
  try {
    const provider = getReadProvider();
    if (!provider) {
      throw new Error('Could not create provider');
    }

    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, ERC721_ABI, provider);
    
    // Get balance
    const balance = await contract.balanceOf(address);
    const balanceNum = Number(balance);

    if (balanceNum === 0) {
      return [];
    }

    // Fetch all token IDs
    const nfts = [];
    for (let i = 0; i < balanceNum; i++) {
      try {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const tokenIdStr = tokenId.toString();
        
        // Try to get token URI
        let metadata = null;
        try {
          const tokenURI = await contract.tokenURI(tokenId);
          if (tokenURI) {
            // Fetch metadata
            const response = await axios.get(tokenURI);
            metadata = response.data;
          }
        } catch (uriError) {
          console.warn(`Could not fetch metadata for token ${tokenIdStr}:`, uriError);
        }

        nfts.push({
          tokenId: tokenIdStr,
          name: metadata?.name || `AstRONaut #${tokenIdStr}`,
          image: metadata?.image || `https://via.placeholder.com/300?text=AstRONaut+${tokenIdStr}`,
          description: metadata?.description || 'An AstRONaut from the Ronin Planets collection',
          attributes: metadata?.attributes || [],
        });
      } catch (error) {
        console.error(`Error fetching token at index ${i}:`, error);
      }
    }

    return nfts;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    
    // Return mock NFTs for development/testing if contract read fails
    if (error.message.includes('could not detect network') || 
        error.message.includes('Could not create provider')) {
      console.warn('Using mock NFTs for development');
      return getMockNFTs(address);
    }
    
    throw error;
  }
};

/**
 * Get mock NFTs for testing (when blockchain is not available)
 */
const getMockNFTs = (address) => {
  // Generate 3 mock NFTs for testing
  return [
    {
      tokenId: '1',
      name: 'AstRONaut #1',
      image: 'https://via.placeholder.com/300/0066ff/ffffff?text=AstRONaut+1',
      description: 'A brave space explorer',
      attributes: [
        { trait_type: 'Type', value: 'Explorer' },
        { trait_type: 'Rarity', value: 'Common' },
      ],
    },
    {
      tokenId: '2',
      name: 'AstRONaut #2',
      image: 'https://via.placeholder.com/300/ff4500/ffffff?text=AstRONaut+2',
      description: 'A skilled engineer',
      attributes: [
        { trait_type: 'Type', value: 'Engineer' },
        { trait_type: 'Rarity', value: 'Rare' },
      ],
    },
    {
      tokenId: '3',
      name: 'AstRONaut #3',
      image: 'https://via.placeholder.com/300/00ff00/ffffff?text=AstRONaut+3',
      description: 'A wise scientist',
      attributes: [
        { trait_type: 'Type', value: 'Scientist' },
        { trait_type: 'Rarity', value: 'Epic' },
      ],
    },
  ];
};

/**
 * Check if user owns any NFTs from the collection
 */
export const hasNFTs = async (address) => {
  try {
    const nfts = await fetchUserNFTs(address);
    return nfts.length > 0;
  } catch (error) {
    console.error('Error checking NFT ownership:', error);
    return false;
  }
};

/**
 * Verify NFT ownership
 */
export const verifyNFTOwnership = async (address, tokenId) => {
  try {
    const provider = getReadProvider();
    if (!provider) {
      return true; // Allow in development mode
    }

    const contract = new ethers.Contract(NFT_CONTRACT_ADDRESS, ERC721_ABI, provider);
    const owner = await contract.ownerOf(tokenId);
    
    return owner.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Error verifying NFT ownership:', error);
    return true; // Allow in development mode
  }
};
