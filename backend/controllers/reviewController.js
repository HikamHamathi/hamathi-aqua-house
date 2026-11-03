
const db = require("../db");
const fs = require("fs");
const path = require("path");

exports.createReview = async (req, res) => {
  const uploadedFiles = req.files || [];

  try {
    const { product_id, rating, title, comment } = req.body;

    if (!product_id || !rating || !title?.trim() || !comment?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please complete all required review fields"
      });
    }

    const productId = Number(product_id);
    const reviewRating = Number(rating);

    if (!Number.isInteger(productId) || productId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    if (!Number.isInteger(reviewRating) ||
        reviewRating < 1 ||
        reviewRating > 5) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 1 and 5"
      });
    }

    if (uploadedFiles.length > 2) {
      return res.status(400).json({
        success: false,
        message: "Maximum 2 photos are allowed"
      });
    }

    // Confirm that the product exists
    const [products] = await db.query(
      "SELECT id FROM products WHERE id = ?",
      [productId]
    );

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    const connection = await db.getConnection();

    try {
      await connection.beginTransaction();

      const [reviewResult] = await connection.query(
        `INSERT INTO reviews
        (product_id, user_id, rating, title, comment, status)
        VALUES (?, ?, ?, ?, ?, 'pending')`,
        [
          productId,
          req.user.id,
          reviewRating,
          title.trim(),
          comment.trim()
        ]
      );

      const reviewId = reviewResult.insertId;

      for (const file of uploadedFiles) {
        const imagePath = `/uploads/reviews/${file.filename}`;

        await connection.query(
          `INSERT INTO review_images (review_id, image_path)
           VALUES (?, ?)`,
          [reviewId, imagePath]
        );
      }

      await connection.commit();

      return res.status(201).json({
        success: true,
        message: "Review submitted successfully. Waiting for admin approval.",
        reviewId
      });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (error) {
    console.error("Create Review Error:", error);

    // Remove uploaded files if the database operation fails
    uploadedFiles.forEach((file) => {
      fs.unlink(file.path, () => {});
    });

    return res.status(500).json({
      success: false,
      message: "Unable to submit review"
    });
  }
};

// Get approved reviews for a product
exports.getProductReviews = async (req, res) => {
  try {
    const productId = Number(req.params.productId);

    if (!Number.isInteger(productId) || productId < 1) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID"
      });
    }

    const [reviews] = await db.query(
      `SELECT
        r.id,
        r.product_id,
        r.user_id,
        r.rating,
        r.title,
        r.comment,
        r.created_at,
        u.name AS customer_name
       FROM reviews r
       JOIN users u ON u.id = r.user_id
       WHERE r.product_id = ?
       AND r.status = 'approved'
       ORDER BY r.created_at DESC`,
      [productId]
    );

    for (const review of reviews) {
      const [images] = await db.query(
        `SELECT image_path
         FROM review_images
         WHERE review_id = ?`,
        [review.id]
      );

      review.images = images.map((image) => image.image_path);
    }

    return res.json({
      success: true,
      reviews
    });

  } catch (error) {
    console.error("Get Reviews Error:", error);

    return res.status(500).json({
      success: false,
      message: "Unable to load reviews"
    });
  }
};
