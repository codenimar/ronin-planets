import { RESOURCES } from './constants';

const STORAGE_KEY = 'ronin_planets_data';

/**
 * Initialize default storage structure
 */
const initStorage = () => {
  const defaultData = {
    users: {},
    rewards: [],
    pendingClaims: [],
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
};

/**
 * Get all data from storage
 */
export const getStorageData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : initStorage();
  } catch (error) {
    console.error('Error reading from storage:', error);
    return initStorage();
  }
};

/**
 * Save data to storage
 */
export const setStorageData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error writing to storage:', error);
    return false;
  }
};

/**
 * Initialize user data if not exists
 */
export const initUserData = (address, nfts = []) => {
  const data = getStorageData();
  
  if (!data.users[address]) {
    const knowledge = {};
    const cooldowns = {};
    
    // Initialize knowledge levels for all NFTs
    nfts.forEach(nft => {
      knowledge[nft.tokenId] = {};
      RESOURCES.forEach(resource => {
        knowledge[nft.tokenId][resource] = 1; // Start at level 1
      });
    });

    data.users[address] = {
      nfts: nfts.map(nft => nft.tokenId),
      knowledge,
      resources: RESOURCES.reduce((acc, resource) => {
        acc[resource] = 0;
        return acc;
      }, {}),
      cooldowns,
      points: 0,
      claimedRewards: [],
      craftingHistory: [],
    };
    
    setStorageData(data);
  }
  
  return data.users[address];
};

/**
 * Get user data
 */
export const getUserData = (address) => {
  const data = getStorageData();
  return data.users[address] || null;
};

/**
 * Update user data
 */
export const updateUserData = (address, updates) => {
  const data = getStorageData();
  
  if (data.users[address]) {
    data.users[address] = {
      ...data.users[address],
      ...updates,
    };
    setStorageData(data);
    return data.users[address];
  }
  
  return null;
};

/**
 * Update knowledge level for NFT
 */
export const updateKnowledge = (address, tokenId, resource, newLevel) => {
  const data = getStorageData();
  
  if (data.users[address] && data.users[address].knowledge[tokenId]) {
    data.users[address].knowledge[tokenId][resource] = newLevel;
    setStorageData(data);
    return true;
  }
  
  return false;
};

/**
 * Update resource inventory
 */
export const updateResources = (address, resource, amount, isAdd = true) => {
  const data = getStorageData();
  
  if (data.users[address]) {
    const currentAmount = data.users[address].resources[resource] || 0;
    data.users[address].resources[resource] = isAdd 
      ? currentAmount + amount 
      : Math.max(0, currentAmount - amount);
    setStorageData(data);
    return data.users[address].resources[resource];
  }
  
  return 0;
};

/**
 * Set cooldown for NFT
 */
export const setCooldown = (address, tokenId, endTime) => {
  const data = getStorageData();
  
  if (data.users[address]) {
    data.users[address].cooldowns[tokenId] = endTime;
    setStorageData(data);
    return true;
  }
  
  return false;
};

/**
 * Get cooldown for NFT
 */
export const getCooldown = (address, tokenId) => {
  const data = getStorageData();
  return data.users[address]?.cooldowns?.[tokenId] || null;
};

/**
 * Update points
 */
export const updatePoints = (address, amount, isAdd = true) => {
  const data = getStorageData();
  
  if (data.users[address]) {
    const currentPoints = data.users[address].points || 0;
    data.users[address].points = isAdd 
      ? currentPoints + amount 
      : Math.max(0, currentPoints - amount);
    setStorageData(data);
    return data.users[address].points;
  }
  
  return 0;
};

/**
 * Add crafting history
 */
export const addCraftingHistory = (address, recipe, timestamp = new Date().toISOString()) => {
  const data = getStorageData();
  
  if (data.users[address]) {
    data.users[address].craftingHistory.push({
      recipeId: recipe.id,
      recipeName: recipe.name,
      output: recipe.output,
      timestamp,
    });
    setStorageData(data);
    return true;
  }
  
  return false;
};

/**
 * Get all rewards
 */
export const getRewards = () => {
  const data = getStorageData();
  return data.rewards || [];
};

/**
 * Create reward
 */
export const createReward = (reward) => {
  const data = getStorageData();
  const newReward = {
    id: Date.now().toString(),
    ...reward,
    createdAt: new Date().toISOString(),
  };
  data.rewards.push(newReward);
  setStorageData(data);
  return newReward;
};

/**
 * Claim reward
 */
export const claimReward = (address, rewardId) => {
  const data = getStorageData();
  const user = data.users[address];
  const reward = data.rewards.find(r => r.id === rewardId);
  
  if (!user || !reward) return false;
  
  // Check if already claimed
  if (user.claimedRewards.some(c => c.rewardId === rewardId)) {
    return false;
  }
  
  // Check if user has enough points
  if (user.points < reward.pointsNeeded) {
    return false;
  }
  
  // Create pending claim
  const claim = {
    id: Date.now().toString(),
    userId: address,
    rewardId: reward.id,
    rewardName: reward.name,
    timestamp: new Date().toISOString(),
    status: 'pending',
  };
  
  data.pendingClaims.push(claim);
  
  // Deduct points
  user.points -= reward.pointsNeeded;
  
  // Add to claimed rewards
  user.claimedRewards.push({
    rewardId: reward.id,
    claimId: claim.id,
    timestamp: claim.timestamp,
    status: 'pending',
  });
  
  setStorageData(data);
  return claim;
};

/**
 * Get pending claims
 */
export const getPendingClaims = () => {
  const data = getStorageData();
  return data.pendingClaims.filter(c => c.status === 'pending') || [];
};

/**
 * Distribute reward
 */
export const distributeReward = (claimId) => {
  const data = getStorageData();
  const claim = data.pendingClaims.find(c => c.id === claimId);
  
  if (!claim) return false;
  
  claim.status = 'distributed';
  claim.distributedAt = new Date().toISOString();
  
  // Update user's claimed rewards
  const user = data.users[claim.userId];
  if (user) {
    const userClaim = user.claimedRewards.find(c => c.claimId === claimId);
    if (userClaim) {
      userClaim.status = 'distributed';
    }
  }
  
  setStorageData(data);
  return true;
};

/**
 * Reject reward claim
 */
export const rejectReward = (claimId) => {
  const data = getStorageData();
  const claim = data.pendingClaims.find(c => c.id === claimId);
  
  if (!claim) return false;
  
  claim.status = 'rejected';
  claim.rejectedAt = new Date().toISOString();
  
  // Refund points to user
  const user = data.users[claim.userId];
  if (user) {
    const reward = data.rewards.find(r => r.id === claim.rewardId);
    if (reward) {
      user.points += reward.pointsNeeded;
    }
    
    // Update user's claimed rewards
    const userClaim = user.claimedRewards.find(c => c.claimId === claimId);
    if (userClaim) {
      userClaim.status = 'rejected';
    }
  }
  
  setStorageData(data);
  return true;
};

/**
 * Get user's claimed rewards
 */
export const getUserClaimedRewards = (address) => {
  const data = getStorageData();
  return data.users[address]?.claimedRewards || [];
};

/**
 * Clear all storage (for testing/debugging)
 */
export const clearStorage = () => {
  localStorage.removeItem(STORAGE_KEY);
  return initStorage();
};
