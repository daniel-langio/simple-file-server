const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

const fileController = {
  // Upload a file
  uploadFile: async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const fileInfo = {
        id: uuidv4(),
        originalName: req.file.originalname,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
        uploadDate: new Date().toISOString()
      };

      // Store file metadata
      await fs.writeFile(
        path.join(UPLOAD_DIR, `${fileInfo.id}.json`),
        JSON.stringify(fileInfo)
      );

      res.status(201).json(fileInfo);
    } catch (error) {
      res.status(500).json({ error: 'Error uploading file' });
    }
  },

  // Download a file
  downloadFile: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Read file metadata
      const metadataPath = path.join(UPLOAD_DIR, `${id}.json`);
      const metadata = JSON.parse(
        await fs.readFile(metadataPath, 'utf-8')
      );

      const filePath = path.join(UPLOAD_DIR, metadata.filename);
      res.download(filePath, metadata.originalName);
    } catch (error) {
      res.status(404).json({ error: 'File not found' });
    }
  },

  // List all files
  listFiles: async (req, res) => {
    try {
      const files = await fs.readdir(UPLOAD_DIR);
      const fileList = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const metadata = JSON.parse(
            await fs.readFile(path.join(UPLOAD_DIR, file), 'utf-8')
          );
          fileList.push(metadata);
        }
      }

      res.json(fileList);
    } catch (error) {
      res.status(500).json({ error: 'Error listing files' });
    }
  },

  // Delete a file
  deleteFile: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Read file metadata
      const metadataPath = path.join(UPLOAD_DIR, `${id}.json`);
      const metadata = JSON.parse(
        await fs.readFile(metadataPath, 'utf-8')
      );

      // Delete both the file and its metadata
      const filePath = path.join(UPLOAD_DIR, metadata.filename);
      await Promise.all([
        fs.unlink(filePath),
        fs.unlink(metadataPath)
      ]);

      res.json({ message: 'File deleted successfully' });
    } catch (error) {
      res.status(404).json({ error: 'File not found' });
    }
  }
};

module.exports = fileController; 