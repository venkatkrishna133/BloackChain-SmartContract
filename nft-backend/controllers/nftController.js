// nft-backend/controller/nftController.js
const { mintNFT } = require('../services/web3Service');

exports.mintNFT = async (req, res) => {
  console.log('Inside mintNFT');
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);
  try {
    const { nftName, description, walletAddress } = req.body;
    const file = req.files?.file?.[0]; // Access the uploaded file

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    // Convert file to Base64 (if needed for the NFT metadata)
    const fileBase64 = file.buffer.toString('base64');

    // Call the mintNFT service
    const transactionHash = await mintNFT(walletAddress, nftName, description, fileBase64);

    res.status(200).json({ transactionHash });
  } catch (error) {
    console.error('Error minting NFT:', error);
    res.status(500).json({ error: 'Failed to mint NFT' });
  }
};
