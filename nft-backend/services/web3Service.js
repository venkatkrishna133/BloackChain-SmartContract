// nft-backend/services/web3Service.js
const { Web3 } = require('web3');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const web3 = new Web3(process.env.INFURA_RPC_URL || 'http://127.0.0.1:8545');

let contract; // Declare contract outside the try-catch

try {
    const abiPath = path.join(__dirname, '../../../Smart Contracts/hardhat-nft-project/artifacts/contracts/MyNFT.sol/MyNFT.json');
    const MyNFT = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
    contract = new web3.eth.Contract(MyNFT.abi, process.env.CONTRACT_ADDRESS);
} catch (error) {
    console.error("Error loading ABI:", error);
    process.exit(1); // Exit if ABI cannot be loaded
}

exports.mintNFT = async (walletAddress, nftName, description, fileBase64) => {
    try {
        const metadata = {
            name: nftName,
            description: description,
            image: fileBase64 ? `data:image/png;base64,${fileBase64}` : undefined,
        };

        const receipt = await contract.methods.mintNFT(walletAddress, JSON.stringify(metadata)).send({
            from: walletAddress,
            gas: 3000000,
        });

        return receipt.transactionHash;
    } catch (error) {
        console.error('Error in mintNFT:', error);
        throw new Error('Failed to mint NFT');
    }
};