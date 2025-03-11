const express = require('express');
const router = express.Router();
const fileController = require('../controllers/fileController');
const upload = require('../middleware/upload');

// Upload a file
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Download a file
router.get('/download/:id', fileController.downloadFile);

// List all files
router.get('/list', fileController.listFiles);

// Delete a file
router.delete('/:id', fileController.deleteFile);

module.exports = router; 