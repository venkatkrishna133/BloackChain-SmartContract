# Blockchain & Smart Contract - NFT Marketplace

## 📦 Overview

This is a fully functional **NFT Marketplace** built using **React** for the frontend, **Node.js** for the backend, and **Hardhat** for deploying and managing smart contracts on the **Goerli test network**. This project allows users to mint NFTs on the blockchain, providing an interactive and decentralized experience.

> **Note**: As this is deployed on a test network (Goerli), the NFT creation is limited and requires minimal balance to mint. Currently, I do not have sufficient balance in my Goerli account to mint NFTs, but the contract works as intended.

---

## 🛠️ Features

- **Frontend**: Developed using React, users can connect their wallet using **MetaMask** to interact with the application.
- **Backend**: Built using **Node.js**, which communicates with the Ethereum network via smart contracts.
- **Smart Contract**: Deployed on the **Goerli test network** using **Hardhat**.
- **NFT Creation**: Anyone with a MetaMask wallet can create NFTs on the test network (requires some ETH in the wallet).
- **Test Environment**: This application is running on the Goerli test network, so no real transactions occur.

---

## 🔧 Installation & Setup

### **1. Clone the Repository**:
    ```bash
        git clone https://github.com/your-username/BloackChain-SmartContract.git
        cd BloackChain-SmartContract

2. Install Dependencies for Frontend:
 - Navigate to the nft-frontend folder and install dependencies:
     - cd nft-frontend
     - npm install

3. Install Dependencies for Backend:
 - Navigate to the nft-backend folder and install dependencies:
    - cd ../nft-backend
    - npm install
4. Set Up Smart Contracts:
 - In the nft-backend folder, navigate to the smart contract files.
 - Deploy the contract to the Goerli test network using Hardhat:
     - npx hardhat run scripts/deploy.js --network goerli
5. Set Up Environment Variables:
 - In both the frontend and backend, you may need to set environment variables such as the Infura API key, MetaMask private key, and Goerli wallet addresses for testing.
 - Create a .env file in both the frontend and backend directories and configure the required variables.
6. Run the Application:
 - Start the backend:
    - cd nft-backend
    - npm start
 - Start the frontend:
    - cd ../nft-frontend
    - npm start
 - This should launch the app in your browser, where you can connect your MetaMask wallet and interact with the application.

---

**👤 About the Author**:

- Name: Venkatraman.
- GitHub: venkatkrishna133.
- Email: developingccode@gmail.com.

---

**🌐 Frontend Demo**:
You can test the frontend by connecting your MetaMask wallet and minting NFTs using the Goerli test network. The UI allows you to connect your wallet, view available NFTs, and mint new ones.

---

**📄 License**:
This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.
