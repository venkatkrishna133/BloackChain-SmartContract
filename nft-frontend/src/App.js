import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignupPage from './components/LoginSignupPage/LoginSignupPage';
import NFTCreationPage from './components/NFTCreation/NFTCreationPage';
import DashboardPage from './components/Dashboard/DashboardPage';

function App() {
  const [walletAddress, setWalletAddress] = useState(null);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<LoginSignupPage />} />
          <Route
            path="/create-nft"
            element={<NFTCreationPage walletAddress={walletAddress} setWalletAddress={setWalletAddress} />}
          />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
