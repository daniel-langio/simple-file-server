# File Storage API

A RESTful API for file storage built with Express.js. This API allows you to upload, download, list, and delete files.

## Features

- File upload with metadata storage
- File download by ID
- List all uploaded files
- Delete files
- CORS support
- Error handling
- File size limit (10MB)

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Create a `.env` file in the root directory (already done with basic configuration):
```env
PORT=3000
NODE_ENV=development
```

## Running the Application

Development mode with hot-reload:
```bash
pnpm dev
```

Production mode:
```bash
pnpm start
```

## API Endpoints

### Upload a File
- **POST** `/api/files/upload`
- Body: `multipart/form-data`
- Field: `file`

### Download a File
- **GET** `/api/files/download/:id`
- Returns the file as a download

### List All Files
- **GET** `/api/files/list`
- Returns a list of all uploaded files with metadata

### Delete a File
- **DELETE** `/api/files/:id`
- Deletes both the file and its metadata

## Project Structure

- `src/index.js` - Main application entry point
- `src/routes/` - API routes
- `src/controllers/` - Request handlers
- `src/middleware/` - Custom middleware
- `uploads/` - File storage directory
- `.env` - Environment variables
- `package.json` - Project configuration and dependencies

## File Storage

Files are stored in the `uploads` directory with the following structure:
- Actual files are stored with unique names
- Metadata is stored in JSON files with the file ID as the filename 