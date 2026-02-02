/**
 * Format a wallet address to a shortened version
 * @param {string} address - The full wallet address
 * @param {number} startChars - Number of characters to show at start
 * @param {number} endChars - Number of characters to show at end
 * @returns {string} Formatted address
 */
export const formatAddress = (address, startChars = 6, endChars = 4) => {
  if (!address) return '';
  if (address.length < startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};

/**
 * Calculate remaining cooldown time
 * @param {string|number} cooldownEnd - Cooldown end timestamp
 * @returns {Object} Object with hours, minutes, seconds, and isActive
 */
export const getCooldownRemaining = (cooldownEnd) => {
  if (!cooldownEnd) return { hours: 0, minutes: 0, seconds: 0, isActive: false };
  
  const now = Date.now();
  const end = typeof cooldownEnd === 'string' ? new Date(cooldownEnd).getTime() : cooldownEnd;
  const remaining = end - now;

  if (remaining <= 0) {
    return { hours: 0, minutes: 0, seconds: 0, isActive: false };
  }

  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

  return { hours, minutes, seconds, isActive: true };
};

/**
 * Format cooldown time for display
 * @param {Object} cooldown - Cooldown object from getCooldownRemaining
 * @returns {string} Formatted string
 */
export const formatCooldown = (cooldown) => {
  if (!cooldown.isActive) return 'Available';
  
  const parts = [];
  if (cooldown.hours > 0) parts.push(`${cooldown.hours}h`);
  if (cooldown.minutes > 0) parts.push(`${cooldown.minutes}m`);
  if (cooldown.seconds > 0) parts.push(`${cooldown.seconds}s`);
  
  return parts.join(' ') + ' remaining';
};

/**
 * Calculate learning cost based on current knowledge level
 * @param {number} currentLevel - Current knowledge level
 * @returns {number} Cost in AstRON tokens
 */
export const calculateLearningCost = (currentLevel) => {
  return currentLevel;
};

/**
 * Calculate mining output based on knowledge level
 * @param {number} knowledgeLevel - Current knowledge level
 * @returns {number} Number of resources to mine
 */
export const calculateMiningOutput = (knowledgeLevel) => {
  return knowledgeLevel;
};

/**
 * Check if user can craft a recipe
 * @param {Object} recipe - Recipe object
 * @param {Object} userResources - User's resource inventory
 * @returns {boolean} Whether user can craft
 */
export const canCraftRecipe = (recipe, userResources) => {
  return recipe.requirements.every(
    req => (userResources[req.resource] || 0) >= req.amount
  );
};

/**
 * Check if address is admin
 * @param {string} address - Wallet address to check
 * @param {string} adminAddress - Admin address
 * @returns {boolean} Whether address is admin
 */
export const isAdmin = (address, adminAddress) => {
  if (!address || !adminAddress) return false;
  return address.toLowerCase() === adminAddress.toLowerCase();
};

/**
 * Generate a unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Format number with thousand separators
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export const formatNumber = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * Calculate time remaining until deadline
 * @param {string|number} timestamp - Claim timestamp
 * @param {number} hours - Hours until deadline (default 48)
 * @returns {string} Formatted time remaining
 */
export const getTimeUntilDeadline = (timestamp, hours = 48) => {
  const claimTime = typeof timestamp === 'string' ? new Date(timestamp).getTime() : timestamp;
  const deadline = claimTime + (hours * 60 * 60 * 1000);
  const remaining = deadline - Date.now();

  if (remaining <= 0) return 'Overdue';

  const hoursLeft = Math.floor(remaining / (1000 * 60 * 60));
  const minutesLeft = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  return `${hoursLeft}h ${minutesLeft}m`;
};

/**
 * Deep clone an object
 * @param {Object} obj - Object to clone
 * @returns {Object} Cloned object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
