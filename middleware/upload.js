const multer = require("multer");
const path = require("path");

// Configure how uploaded files will be stored
const fileStorageEngine = multer.diskStorage({
  // Set upload destination folder
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },

  // Create unique filename based on timestamp + original extension
  filename: (req, file, callback) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    callback(null, uniqueName);
  }
});

// Initialize multer with storage rules
const uploadMiddleware = multer({ storage: fileStorageEngine });

// Export to use in routes
module.exports = uploadMiddleware;
