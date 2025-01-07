// backend/routes/nftRoutes.js
const express = require('express');
const nftController = require('../controllers/nftController');

const router = express.Router();
console.log("Api/mint route");

// Route to mint NFT (without file upload)
router.post('/', nftController.mintNFT);



module.exports = router;

