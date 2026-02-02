# 🚀 Ronin Planets - AstRONauts NFT Game

A blockchain-based space exploration game where players can manage their AstRONauts NFTs, mine resources across 10 unique planets, increase knowledge levels, and craft recipes to earn rewards on the Ronin Network.

![Ronin Planets](https://img.shields.io/badge/Ronin-Network-00ffff?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61dafb?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2-646cff?style=for-the-badge&logo=vite)

## 🎮 Features

### Core Gameplay
- **🦊 Multi-Wallet Support**: Connect with Ronin Wallet (Extension/Mobile) or MetaMask
- **🖼️ NFT Management**: View and manage your AstRONauts NFT collection
- **🌍 10 Unique Planets**: Each with distinct resources and themes
- **🔬 Science Laboratory**: Learn about resources to increase mining efficiency
- **⛏️ Resource Mining**: Mine resources based on your knowledge level
- **⏰ Cooldown System**: 12-hour cooldown with real-time countdown
- **🏭 Crafting Factory**: Combine resources using 20 unique recipes
- **🎁 Rewards System**: Earn points and claim rewards
- **👑 Admin Panel**: Create and manage rewards (admin-only)

### The 10 Planets
1. **Crystalia** → Crystallite (energy crystals)
2. **Volcanus** → Magmastone (volcanic mineral)
3. **Aquaris** → Hydroflux (liquid energy)
4. **Terranova** → Biomatter (organic compounds)
5. **Nebulos** → Stardust (cosmic particles)
6. **Glacius** → Cryonite (frozen gas)
7. **Solaria** → Photonite (light energy)
8. **Umbros** → Darkmatter (shadow essence)
9. **Electros** → Voltium (electric charge)
10. **Aerion** → Windforce (atmospheric pressure)

## 🛠️ Tech Stack

- **Frontend**: React 19.2 with Vite
- **Blockchain**: Ethers.js 6.9 for Ronin Network integration
- **Routing**: React Router DOM 6.20
- **State Management**: React Context API
- **Storage**: LocalStorage (MVP) - ready for smart contract migration
- **Styling**: Custom CSS with space/sci-fi theme

## 📋 Prerequisites

- Node.js 18+ and npm
- Ronin Wallet extension OR MetaMask
- AstRONauts NFTs from contract \`0xef01acf3af83a08ae1bb1d4eb656f5576e5d383c\`

## 🚀 Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/codenimar/ronin-planets.git
cd ronin-planets

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
\`\`\`

The app will be available at \`http://localhost:5173\`

## 🔧 Environment Variables

Create a \`.env\` file with:

\`\`\`env
VITE_NFT_CONTRACT_ADDRESS=0xef01acf3af83a08ae1bb1d4eb656f5576e5d383c
VITE_RONIN_RPC_URL=https://api.roninchain.com/rpc
VITE_ADMIN_ADDRESS=0x0C778693BDa15912CFB07f63E5ed92886CA94411
\`\`\`

## 🎯 How to Play

### 1. Connect Your Wallet
- Click "Connect Wallet" in the top navigation
- Choose between Ronin Wallet or MetaMask
- Approve the connection request

### 2. View Your AstRONauts
- After connecting, you'll see all your AstRONauts NFTs
- Each NFT displays its current status (Available/Cooldown)
- View your resource inventory and knowledge levels

### 3. Visit Planets
- Browse the 10 available planets
- Click on a planet to view its details
- Each planet has a Science Laboratory and Mine

### 4. Learn in the Laboratory
- **Cost**: Equal to current knowledge level (Level 1→2 costs 1 AstRON)
- **Effect**: Increases knowledge level by 1 (max 100)
- **Cooldown**: 12 hours per NFT
- Higher knowledge = higher mining output

### 5. Mine Resources
- **Output**: Resources equal to your knowledge level (1-100)
- **Cooldown**: 12 hours per NFT
- Resources are added to your inventory
- Use resources to craft recipes

### 6. Craft in the Factory
- View all 20 available recipes
- Each recipe requires 5 different resources
- Check if you have sufficient resources (highlighted in green)
- Craft to consume resources and earn points
- Points can be exchanged for rewards

### 7. Claim Rewards
- Browse available rewards in the Rewards section
- Check required points for each reward
- Claim rewards if you have enough points
- Wait for admin approval (48 hours)

### 8. Cooldown Management
- Each NFT has a 12-hour cooldown after any action
- Real-time countdown displayed on each NFT card
- Actions are disabled during cooldown
- Plan your strategy around cooldowns!

## 👑 Admin Guide

**Admin Address**: \`0x0C778693BDa15912CFB07f63E5ed92886CA94411\`

### Admin Features
- **Toggle Button**: Switch between Member View and Admin Panel
- **Create Rewards**: Add new rewards with name, description, image, and points
- **Manage Claims**: Approve or reject pending reward claims
- **View Statistics**: Monitor game activity and user stats

### Creating Rewards
1. Navigate to Admin Panel → Create Reward
2. Fill in reward details:
   - Name (required)
   - Description (required)
   - Image URL (required)
   - Points Needed (minimum 1)
3. Submit to create the reward

### Managing Claims
1. View pending claims in the Admin Panel
2. See user address, reward name, and claim timestamp
3. Click "Distribute" to approve or "Reject" to deny
4. Rejected claims refund points to the user

## 📁 Project Structure

\`\`\`
ronin-planets/
├── public/              # Static assets
├── src/
│   ├── components/      # React components
│   │   ├── Auth/       # Wallet connection
│   │   ├── Dashboard/  # Main dashboard & NFT cards
│   │   ├── Planets/    # Planet grid, details, lab, mine
│   │   ├── Factory/    # Crafting system
│   │   ├── Rewards/    # Rewards catalog
│   │   ├── Admin/      # Admin panel
│   │   ├── Common/     # Shared components
│   │   └── Layout/     # Layout components
│   ├── context/        # React contexts
│   │   ├── WalletContext.jsx
│   │   └── GameContext.jsx
│   ├── services/       # Blockchain services
│   │   ├── web3Service.js
│   │   └── nftService.js
│   ├── utils/          # Utilities
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── storage.js
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── .env.example        # Environment template
├── package.json        # Dependencies
└── vite.config.js      # Vite configuration
\`\`\`

## 🎨 Game Mechanics

### Knowledge System
- Starts at level 1 for each resource
- Maximum level: 100
- Learning cost = current level in AstRON tokens
- Example: Level 50 → 51 costs 50 AstRON

### Mining Output
- Output = current knowledge level
- Level 1 = 1 resource, Level 100 = 100 resources
- Resources stored in user inventory

### Cooldown Timer
- 12 hours (43,200 seconds) after any action
- Updates every second in real-time
- Format: "Xh Ym Zs remaining" or "Available"

### Crafting System
- 20 unique recipes available
- Each requires 5 different resources from different planets
- Output varies by recipe (50-400 points)
- Resources are consumed upon crafting

### Points & Rewards
- Earn points by crafting recipes
- Spend points to claim rewards
- Pending claims reviewed by admin within 48 hours

## 🔒 Data Storage

**Current**: LocalStorage (MVP/Prototype)
\`\`\`javascript
{
  "users": {
    "0xAddress": {
      "nfts": ["tokenId1", "tokenId2"],
      "knowledge": { "tokenId1": { "Crystallite": 1, ... } },
      "resources": { "Crystallite": 0, ... },
      "cooldowns": { "tokenId1": "2026-02-03T04:33:48Z" },
      "points": 0,
      "claimedRewards": [],
      "craftingHistory": []
    }
  },
  "rewards": [],
  "pendingClaims": []
}
\`\`\`

**Production Migration**:
For production deployment, migrate to:
- Smart contracts for game logic
- Backend API with database for user data
- IPFS for decentralized storage
- On-chain verification for all actions

## 🏗️ Building for Production

\`\`\`bash
# Build the application
npm run build

# Preview production build
npm run preview
\`\`\`

The build will be in the \`dist/\` directory, ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🛣️ Future Roadmap

- [ ] Smart contract integration for on-chain game logic
- [ ] Backend API with database for scalability
- [ ] Multiplayer features and leaderboards
- [ ] Trading system for resources and NFTs
- [ ] Additional planets and resources
- [ ] More crafting recipes
- [ ] Achievements and badges
- [ ] Mobile app versions
- [ ] Staking and yield farming
- [ ] NFT breeding system

## 🐛 Development & Testing

### Mock Data
If blockchain connection fails, the app uses mock NFTs for testing:
- 3 sample AstRONauts
- Placeholder images
- All features functional with localStorage

### Testing Checklist
- [x] Wallet connection (Ronin & MetaMask)
- [x] NFT fetching and display
- [x] Knowledge level tracking
- [x] Mining output calculation
- [x] Cooldown timer accuracy
- [x] Recipe crafting validation
- [x] Points and rewards system
- [x] Admin access control
- [x] Responsive design (mobile/tablet/desktop)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit your changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to the branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Ronin Network for the blockchain infrastructure
- AstRONauts NFT collection creators
- React and Vite communities
- All contributors and testers

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ for the Ronin Network community**

🌟 Star this repo if you find it useful!
