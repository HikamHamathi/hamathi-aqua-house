
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded review photos
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// Authentication Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// Review Routes
const reviewRoutes = require("./routes/reviewRoutes");
app.use("/api/reviews", reviewRoutes);

// Home / API Test
app.get("/", (req, res) => {
  res.json({
    message: "Hamathi Aqua House API is running!"
  });
});

// Handle upload and other errors
app.use((err, req, res, next) => {
  console.error("API Error:", err.message);

  if (err instanceof require("multer").MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        success: false,
        message: "Each photo must be 5MB or smaller"
      });
    }

    if (err.code === "LIMIT_FILE_COUNT" ||
        err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        success: false,
        message: "Maximum 2 photos are allowed"
      });
    }
  }

  if (
    err.message === "Only JPG, PNG and WEBP images are allowed"
  ) {
    return res.status(400).json({
      success: false,
      message: err.message
    });
  }

  res.status(500).json({
    success: false,
    message: "Something went wrong on the server"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Hamathi Aqua House API running on port ${PORT}`);
});
