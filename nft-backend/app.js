const express = require('express');
const cors = require('cors');
const multer = require('multer'); // For handling `multipart/form-data`
const nftRoutes = require('./routes/nftRoutes');
require('dotenv').config();

const app = express();

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

app.use(cors());

// Configure multer to handle multipart/form-data
const upload = multer({
  storage: multer.memoryStorage(), // Store files in memory for simplicity
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

// Log parsed request body for debugging
app.use(upload.fields([
  { name: 'file', maxCount: 1 }, // File upload
  { name: 'nftName', maxCount: 1 }, // Text fields
  { name: 'description', maxCount: 1 },
  { name: 'walletAddress', maxCount: 1 },
]));
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  console.log('Request Files:', req.files);
  next();
});

// Mount routes
app.use('/api/mint', nftRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
