// src/components/NFTCreation/NFTCreationPage.js

// import { mintNFT } from '../../services/api'; // Import your mintNFT function from the API service
import React, { useState,useEffect } from 'react';
import './NFTCreationPage.css';

import { connectWallet } from '../../services/walletService'; // Import wallet connection service
import { mintNFT } from '../../services/nftService'; // New service for frontend minting
import contractABI from '../../contracts/MyNFT.json'; // Correct path
import { JsonRpcProvider } from 'ethers';


const NFTCreationPage = () => {
  const [nftName, setNftName] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [walletAddress, setWalletAddress] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleConnectWallet = async () => {
    try {
      const { walletAddress } = await connectWallet();
      setWalletAddress(walletAddress);
      setMessage(`Wallet connected: ${walletAddress}`);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      setMessage('Failed to connect wallet. Please try again.');
    }
  };

  const [contractAddress, setContractAddress] = useState(null);

    useEffect(() => {
        setContractAddress(process.env.REACT_APP_CONTRACT_ADDRESS);
        if(!process.env.REACT_APP_CONTRACT_ADDRESS){
            console.error("Contract address not found in environment variables. Make sure REACT_APP_CONTRACT_ADDRESS is set in .env.local")
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!walletAddress) {
            alert('Please connect your wallet first.');
            return;
        }

        if (!nftName || !description || !file) {
            alert('Please fill all the fields.');
            return;
        }

        if(!contractAddress){
            alert("Contract address not found. Check console for details.")
            return
        }

        setLoading(true);

        
try {
  const provider = new JsonRpcProvider(window.ethereum);
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const signer = provider.getSigner();

  const reader = new FileReader();

  reader.readAsDataURL(file);
  reader.onloadend = async () => {
      const base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      const metadata = {
          name: nftName,
          description: description,
          image: `data:image/png;base64,${base64String}`,
      };

      const tx = await mintNFT(signer, contractAddress, contractABI.abi, metadata); // Pass ABI
      console.log('Transaction Hash:', tx.hash);
      setMessage('NFT Created Successfully! Transaction Hash: ' + tx.hash);
      setLoading(false);
  };
  reader.onerror = () => {
      console.error("There was an error reading the file!");
  };
} catch (error) {
  console.error('Error minting NFT:', error);
  setMessage('Error creating NFT');
  setLoading(false);
}
    };
  return (
    <div className="nft-creation">
      <h2>Create Your NFT</h2>
      {!walletAddress ? (
        <button onClick={handleConnectWallet}>Connect Wallet</button>
      ) : (
        <p>Connected Wallet: {walletAddress}</p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <label htmlFor="nftName">NFT Name</label>
          <input
            type="text"
            id="nftName"
            value={nftName}
            onChange={(e) => setNftName(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="input-field">
          <label htmlFor="file">Upload Image</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Minting NFT...' : 'Create NFT'}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default NFTCreationPage;
