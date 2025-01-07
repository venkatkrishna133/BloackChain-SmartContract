// frontend/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [nfts, setNfts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fetch NFTs from the backend (or blockchain directly)
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mint'); // Fetch from the new backend endpoint
      const data = await response.json();
      setNfts(data);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  // Function to handle navigation to the NFT creation page
  const handleCreateNFT = () => {
    navigate('/create-nft');
  };

  return (
    <div className="dashboard">
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Dashboard!</h1>
        <p>This is your landing page after a successful login.</p>
      </div>
      <h2>Your NFTs</h2>
      <div className="nft-grid">
        {nfts.map((nft, index) => (
          <div className="nft-card" key={index}>
            <img src={nft.imageUrl} alt={nft.name} />
            <h3>{nft.name}</h3>
            <p>{nft.description}</p>
          </div>
        ))}
      </div>

      {/* Button to navigate to the NFT creation page */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handleCreateNFT} style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
          Create New NFT
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
