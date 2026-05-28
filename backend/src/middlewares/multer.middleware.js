import multer from "multer";

// define storage engine for multer
const storage = multer.memoryStorage();

export const upload = multer({
  storage: storage, // use memory storage for uploaded files
  limits: { fileSize: 10 * 1024 * 1024 }, // limit file size to 10MB because we are storing files in memory
});


