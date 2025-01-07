import React, { useState } from 'react';
import { connectWallet } from '../../services/walletService';

const ConnectWalletButton = ({ onWalletConnected }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [error, setError] = useState(null);

  const handleConnectWallet = async () => {
    try {
      const { walletAddress } = await connectWallet();
      setWalletAddress(walletAddress);
      onWalletConnected(walletAddress); // Notify parent component about the connection
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {walletAddress ? (
        <p>Connected Wallet: {walletAddress}</p>
      ) : (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ConnectWalletButton;
