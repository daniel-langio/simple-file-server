const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;
require('dotenv').config();

const fileRoutes = require('./routes/fileRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('uploads')); // Serve uploaded files statically

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), 'uploads');
fs.mkdir(uploadDir, { recursive: true }).catch(console.error);

// Routes
app.use('/api/files', fileRoutes);

// Serve the upload page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'upload.html'));
});

// API documentation route
app.get('/api', (req, res) => {
  res.json({
    message: 'File Storage API Documentation',
    endpoints: {
      upload: 'POST /api/files/upload',
      download: 'GET /api/files/download/:id',
      list: 'GET /api/files/list',
      delete: 'DELETE /api/files/:id'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Visit http://localhost:${port} to access the file upload interface`);
}); 