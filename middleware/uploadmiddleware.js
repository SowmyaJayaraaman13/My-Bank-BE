const multer = require("multer");

// Set up multer for in-memory storage
const storage = multer.memoryStorage(); // Store file in memory
const upload = multer({ storage });

module.exports = upload;
