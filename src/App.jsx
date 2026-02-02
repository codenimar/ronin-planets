import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WalletProvider } from './context/WalletContext';
import { GameProvider } from './context/GameContext';
import { ToastProvider } from './components/Common/Toast';
import MainLayout from './components/Layout/MainLayout';
import WalletConnect from './components/Auth/WalletConnect';
import Dashboard from './components/Dashboard/Dashboard';
import PlanetGrid from './components/Planets/PlanetGrid';
import PlanetDetail from './components/Planets/PlanetDetail';
import Factory from './components/Factory/Factory';
import RewardsList from './components/Rewards/RewardsList';
import AdminPanel from './components/Admin/AdminPanel';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <WalletProvider>
        <GameProvider>
          <ToastProvider>
            <Routes>
              <Route path="/" element={<WalletConnect />} />
              <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/planets" element={<PlanetGrid />} />
                <Route path="/planets/:planetId" element={<PlanetDetail />} />
                <Route path="/factory" element={<Factory />} />
                <Route path="/rewards" element={<RewardsList />} />
                <Route path="/admin" element={<AdminPanel />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </ToastProvider>
        </GameProvider>
      </WalletProvider>
    </BrowserRouter>
  );
}

export default App;
