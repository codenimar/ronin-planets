// Contract and network configuration
export const NFT_CONTRACT_ADDRESS = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
export const RONIN_RPC_URL = import.meta.env.VITE_RONIN_RPC_URL;
export const ADMIN_ADDRESS = import.meta.env.VITE_ADMIN_ADDRESS;

// Cooldown duration in milliseconds (12 hours)
export const COOLDOWN_DURATION = 12 * 60 * 60 * 1000;

// Maximum knowledge level
export const MAX_KNOWLEDGE_LEVEL = 100;

// Planets configuration
export const PLANETS = [
  {
    id: 1,
    name: 'Crystalia',
    resource: 'Crystallite',
    description: 'A shimmering world of energy crystals',
    theme: 'crystal',
    color: '#00ffff',
    gradient: 'linear-gradient(135deg, #0066ff 0%, #00ffff 100%)',
  },
  {
    id: 2,
    name: 'Volcanus',
    resource: 'Magmastone',
    description: 'A volcanic planet with molten mineral deposits',
    theme: 'volcanic',
    color: '#ff4500',
    gradient: 'linear-gradient(135deg, #ff4500 0%, #ff8c00 100%)',
  },
  {
    id: 3,
    name: 'Aquaris',
    resource: 'Hydroflux',
    description: 'An oceanic world of liquid energy',
    theme: 'water',
    color: '#1e90ff',
    gradient: 'linear-gradient(135deg, #1e90ff 0%, #87ceeb 100%)',
  },
  {
    id: 4,
    name: 'Terranova',
    resource: 'Biomatter',
    description: 'A lush planet teeming with organic compounds',
    theme: 'nature',
    color: '#00ff00',
    gradient: 'linear-gradient(135deg, #228b22 0%, #00ff00 100%)',
  },
  {
    id: 5,
    name: 'Nebulos',
    resource: 'Stardust',
    description: 'A cosmic realm of swirling stellar particles',
    theme: 'space',
    color: '#9370db',
    gradient: 'linear-gradient(135deg, #4b0082 0%, #9370db 100%)',
  },
  {
    id: 6,
    name: 'Glacius',
    resource: 'Cryonite',
    description: 'A frozen world of crystallized gases',
    theme: 'ice',
    color: '#b0e0e6',
    gradient: 'linear-gradient(135deg, #4682b4 0%, #b0e0e6 100%)',
  },
  {
    id: 7,
    name: 'Solaria',
    resource: 'Photonite',
    description: 'A radiant planet bathed in light energy',
    theme: 'light',
    color: '#ffd700',
    gradient: 'linear-gradient(135deg, #ff8c00 0%, #ffd700 100%)',
  },
  {
    id: 8,
    name: 'Umbros',
    resource: 'Darkmatter',
    description: 'A shadowy realm of mysterious essence',
    theme: 'dark',
    color: '#4b0082',
    gradient: 'linear-gradient(135deg, #000000 0%, #4b0082 100%)',
  },
  {
    id: 9,
    name: 'Electros',
    resource: 'Voltium',
    description: 'An electrically charged storm world',
    theme: 'electric',
    color: '#ffff00',
    gradient: 'linear-gradient(135deg, #9400d3 0%, #ffff00 100%)',
  },
  {
    id: 10,
    name: 'Aerion',
    resource: 'Windforce',
    description: 'A gaseous planet with powerful atmospheric currents',
    theme: 'wind',
    color: '#87ceeb',
    gradient: 'linear-gradient(135deg, #f0f8ff 0%, #87ceeb 100%)',
  },
];

// All resources
export const RESOURCES = PLANETS.map(p => p.resource);

// Recipes configuration
export const RECIPES = [
  {
    id: 1,
    name: 'Basic Energy Cell',
    description: 'A simple power source for basic equipment',
    requirements: [
      { resource: 'Crystallite', amount: 10 },
      { resource: 'Voltium', amount: 5 },
      { resource: 'Photonite', amount: 3 },
      { resource: 'Windforce', amount: 2 },
      { resource: 'Hydroflux', amount: 1 },
    ],
    output: 50,
  },
  {
    id: 2,
    name: 'Advanced Power Core',
    description: 'High-capacity energy storage unit',
    requirements: [
      { resource: 'Magmastone', amount: 20 },
      { resource: 'Darkmatter', amount: 15 },
      { resource: 'Cryonite', amount: 10 },
      { resource: 'Stardust', amount: 8 },
      { resource: 'Biomatter', amount: 5 },
    ],
    output: 150,
  },
  {
    id: 3,
    name: 'Plasma Conduit',
    description: 'Channels energy at extreme efficiency',
    requirements: [
      { resource: 'Voltium', amount: 15 },
      { resource: 'Photonite', amount: 12 },
      { resource: 'Magmastone', amount: 10 },
      { resource: 'Crystallite', amount: 8 },
      { resource: 'Stardust', amount: 5 },
    ],
    output: 120,
  },
  {
    id: 4,
    name: 'Cryogenic Stabilizer',
    description: 'Keeps systems at optimal temperatures',
    requirements: [
      { resource: 'Cryonite', amount: 25 },
      { resource: 'Hydroflux', amount: 15 },
      { resource: 'Windforce', amount: 10 },
      { resource: 'Biomatter', amount: 8 },
      { resource: 'Crystallite', amount: 5 },
    ],
    output: 130,
  },
  {
    id: 5,
    name: 'Quantum Processor',
    description: 'Computing power beyond conventional limits',
    requirements: [
      { resource: 'Darkmatter', amount: 30 },
      { resource: 'Stardust', amount: 20 },
      { resource: 'Crystallite', amount: 15 },
      { resource: 'Photonite', amount: 10 },
      { resource: 'Voltium', amount: 8 },
    ],
    output: 200,
  },
  {
    id: 6,
    name: 'Bio-Synthesizer',
    description: 'Generates organic compounds from raw materials',
    requirements: [
      { resource: 'Biomatter', amount: 30 },
      { resource: 'Hydroflux', amount: 20 },
      { resource: 'Windforce', amount: 12 },
      { resource: 'Crystallite', amount: 8 },
      { resource: 'Photonite', amount: 5 },
    ],
    output: 140,
  },
  {
    id: 7,
    name: 'Stellar Navigator',
    description: 'Guides ships through cosmic anomalies',
    requirements: [
      { resource: 'Stardust', amount: 25 },
      { resource: 'Darkmatter', amount: 18 },
      { resource: 'Photonite', amount: 15 },
      { resource: 'Crystallite', amount: 10 },
      { resource: 'Windforce', amount: 7 },
    ],
    output: 170,
  },
  {
    id: 8,
    name: 'Thermal Regulator',
    description: 'Manages extreme heat and cold',
    requirements: [
      { resource: 'Magmastone', amount: 22 },
      { resource: 'Cryonite', amount: 22 },
      { resource: 'Hydroflux', amount: 10 },
      { resource: 'Voltium', amount: 8 },
      { resource: 'Biomatter', amount: 5 },
    ],
    output: 145,
  },
  {
    id: 9,
    name: 'Lightning Capacitor',
    description: 'Stores and releases electrical energy',
    requirements: [
      { resource: 'Voltium', amount: 30 },
      { resource: 'Crystallite', amount: 18 },
      { resource: 'Photonite', amount: 12 },
      { resource: 'Magmastone', amount: 10 },
      { resource: 'Windforce', amount: 8 },
    ],
    output: 160,
  },
  {
    id: 10,
    name: 'Shadow Cloak',
    description: 'Provides stealth capabilities',
    requirements: [
      { resource: 'Darkmatter', amount: 35 },
      { resource: 'Stardust', amount: 15 },
      { resource: 'Cryonite', amount: 12 },
      { resource: 'Biomatter', amount: 8 },
      { resource: 'Hydroflux', amount: 5 },
    ],
    output: 180,
  },
  {
    id: 11,
    name: 'Atmospheric Purifier',
    description: 'Creates breathable environments',
    requirements: [
      { resource: 'Windforce', amount: 28 },
      { resource: 'Biomatter', amount: 20 },
      { resource: 'Hydroflux', amount: 15 },
      { resource: 'Photonite', amount: 10 },
      { resource: 'Crystallite', amount: 6 },
    ],
    output: 155,
  },
  {
    id: 12,
    name: 'Graviton Anchor',
    description: 'Manipulates gravitational fields',
    requirements: [
      { resource: 'Darkmatter', amount: 25 },
      { resource: 'Magmastone', amount: 20 },
      { resource: 'Stardust', amount: 15 },
      { resource: 'Voltium', amount: 12 },
      { resource: 'Cryonite', amount: 10 },
    ],
    output: 190,
  },
  {
    id: 13,
    name: 'Photonic Array',
    description: 'Amplifies light-based energy',
    requirements: [
      { resource: 'Photonite', amount: 32 },
      { resource: 'Crystallite', amount: 22 },
      { resource: 'Voltium', amount: 15 },
      { resource: 'Stardust', amount: 10 },
      { resource: 'Windforce', amount: 8 },
    ],
    output: 175,
  },
  {
    id: 14,
    name: 'Hydro-Generator',
    description: 'Converts liquid energy to power',
    requirements: [
      { resource: 'Hydroflux', amount: 30 },
      { resource: 'Voltium', amount: 20 },
      { resource: 'Crystallite', amount: 15 },
      { resource: 'Windforce', amount: 12 },
      { resource: 'Biomatter', amount: 10 },
    ],
    output: 165,
  },
  {
    id: 15,
    name: 'Volcanic Forge',
    description: 'Processes materials at extreme temperatures',
    requirements: [
      { resource: 'Magmastone', amount: 35 },
      { resource: 'Crystallite', amount: 20 },
      { resource: 'Voltium', amount: 15 },
      { resource: 'Photonite', amount: 12 },
      { resource: 'Darkmatter', amount: 8 },
    ],
    output: 185,
  },
  {
    id: 16,
    name: 'Cosmic Reactor',
    description: 'Harnesses the power of stars',
    requirements: [
      { resource: 'Stardust', amount: 40 },
      { resource: 'Photonite', amount: 25 },
      { resource: 'Darkmatter', amount: 20 },
      { resource: 'Crystallite', amount: 15 },
      { resource: 'Magmastone', amount: 12 },
    ],
    output: 250,
  },
  {
    id: 17,
    name: 'Zero-Point Module',
    description: 'Taps into vacuum energy',
    requirements: [
      { resource: 'Darkmatter', amount: 45 },
      { resource: 'Cryonite', amount: 30 },
      { resource: 'Stardust', amount: 25 },
      { resource: 'Voltium', amount: 18 },
      { resource: 'Crystallite', amount: 15 },
    ],
    output: 300,
  },
  {
    id: 18,
    name: 'Life Support System',
    description: 'Sustains biological functions in space',
    requirements: [
      { resource: 'Biomatter', amount: 35 },
      { resource: 'Hydroflux', amount: 28 },
      { resource: 'Windforce', amount: 20 },
      { resource: 'Photonite', amount: 15 },
      { resource: 'Cryonite', amount: 12 },
    ],
    output: 195,
  },
  {
    id: 19,
    name: 'Warp Drive Core',
    description: 'Enables faster-than-light travel',
    requirements: [
      { resource: 'Darkmatter', amount: 50 },
      { resource: 'Stardust', amount: 40 },
      { resource: 'Crystallite', amount: 30 },
      { resource: 'Voltium', amount: 25 },
      { resource: 'Photonite', amount: 20 },
    ],
    output: 400,
  },
  {
    id: 20,
    name: 'Terraforming Engine',
    description: 'Transforms planetary environments',
    requirements: [
      { resource: 'Biomatter', amount: 40 },
      { resource: 'Hydroflux', amount: 35 },
      { resource: 'Windforce', amount: 30 },
      { resource: 'Magmastone', amount: 25 },
      { resource: 'Cryonite', amount: 20 },
    ],
    output: 350,
  },
];

// Wallet types
export const WALLET_TYPES = {
  RONIN_EXTENSION: 'ronin-extension',
  RONIN_MOBILE: 'ronin-mobile',
  METAMASK: 'metamask',
};
