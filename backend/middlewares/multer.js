import multer from "multer";

// Configure storage
const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, file.originalname); // Set the uploaded file's name
  },
});

// File filter to validate file types
const fileFilter = (req, file, callback) => {
  // Allowed MIME types
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true); // Accept the file
  } else {
    callback(new Error("Invalid file type. Only JPEG and PNG files are allowed."), false); // Reject the file
  }
};

// Multer configuration
const upload = multer({
  storage: storage, // Use the defined storage
  fileFilter: fileFilter, // Add the file filter
  limits: { fileSize: 2 * 1024 * 1024 }, // Optional: 2 MB file size limit
});

export default upload;
