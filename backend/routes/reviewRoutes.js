
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const reviewController = require("../controllers/reviewController");
const verifyToken = require("../middleware/authMiddleware");

// Create upload directory if it does not exist
const uploadDirectory = path.join(
  __dirname,
  "../uploads/reviews"
);

fs.mkdirSync(uploadDirectory, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDirectory);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const uniqueName =
      `review-${Date.now()}-${Math.round(Math.random() * 1e9)}${extension}`;

    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG and WEBP images are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 2
  }
});

// Submit a review (login required)
router.post(
  "/",
  verifyToken,
  upload.array("photos", 2),
  reviewController.createReview
);

// Get approved reviews for a product (public)
router.get(
  "/product/:productId",
  reviewController.getProductReviews
);

module.exports = router;
