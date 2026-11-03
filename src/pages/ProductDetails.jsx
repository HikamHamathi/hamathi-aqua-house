
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import {
  FaHeart,
  FaShoppingCart,
  FaStar,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaMinus,
  FaPlus,
  FaCamera,
  FaTimes,
} from "react-icons/fa";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find((p) => p.id === Number(id));

  const relatedProducts = products
    .filter(
      (p) =>
        p.id !== Number(id) &&
        (!product || p.category === product.category)
    )
    .slice(0, 4);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [selectedImage, setSelectedImage] = useState("");
  const [showVideo, setShowVideo] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Review form
  const [reviewName, setReviewName] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  // Review photos (maximum 2)
  const [reviewPhotos, setReviewPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [photoError, setPhotoError] = useState("");

  const [reviewMessage, setReviewMessage] = useState("");

  const MAX_PHOTOS = 2;
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  useEffect(() => {
    setSelectedImage(product?.images?.[0] || product?.image || "");
    setShowVideo(false);
    setQuantity(1);
  }, [product]);

  // Generate image previews and clean up preview URLs
  useEffect(() => {
    const urls = reviewPhotos.map((file) =>
      URL.createObjectURL(file)
    );

    setPhotoPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [reviewPhotos]);

  if (!product) {
    return (
      <div className="pd-not-found">
        <h2>Product Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : [product.image].filter(Boolean);

  const isFavourite = wishlist.includes(product.id);
  const inStock = product.stock === undefined || product.stock > 0;

  const formatPrice = (price) =>
    `Rs. ${Number(price || 0).toLocaleString("en-LK")}`;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });
    navigate("/checkout");
  };

  // Handle review photo selection
  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    setPhotoError("");
    setReviewMessage("");

    if (selectedFiles.length === 0) return;

    if (selectedFiles.length > MAX_PHOTOS) {
      setPhotoError("You can upload a maximum of 2 photos.");
      e.target.value = "";
      return;
    }

    for (const file of selectedFiles) {
      if (!allowedTypes.includes(file.type)) {
        setPhotoError(
          "Only JPG, JPEG, PNG and WEBP images are allowed."
        );
        e.target.value = "";
        return;
      }

      if (file.size > MAX_FILE_SIZE) {
        setPhotoError(
          "Each photo must be smaller than 5MB."
        );
        e.target.value = "";
        return;
      }
    }

    setReviewPhotos(selectedFiles);
  };

  // Remove selected photo
  const handleRemovePhoto = (index) => {
    setReviewPhotos((currentPhotos) =>
      currentPhotos.filter((_, i) => i !== index)
    );

    setPhotoError("");

    const fileInput = document.getElementById("review-photo");

    if (fileInput) {
      fileInput.value = "";
    }
  };

  // Submit review
  const handleReviewSubmit = (e) => {
    e.preventDefault();

    if (
      !reviewName.trim() ||
      !reviewTitle.trim() ||
      !reviewText.trim()
    ) {
      setReviewMessage("Please complete all required fields.");
      return;
    }

    if (reviewPhotos.length > MAX_PHOTOS) {
      setPhotoError("You can upload a maximum of 2 photos.");
      return;
    }

    // Frontend demonstration only.
    // Backend review API will be connected separately.
    setReviewMessage(
      "Thank you! Your review has been submitted and is waiting for admin approval."
    );

    setReviewName("");
    setReviewEmail("");
    setReviewTitle("");
    setReviewText("");
    setReviewRating(5);
    setReviewPhotos([]);
    setPhotoError("");

    e.target.reset();
  };

  return (
    <main className="pd-page">

      {/* BREADCRUMB */}
      <div className="pd-breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <span>{product.category || "Products"}</span>
        <span>/</span>
        <strong>{product.name}</strong>
      </div>

      {/* PRODUCT TOP SECTION */}
      <section className="pd-main">

        <div className="pd-gallery">

          <div className="pd-main-image">
            {showVideo && product.video ? (
              <video controls autoPlay>
                <source src={product.video} type="video/mp4" />
              </video>
            ) : selectedImage ? (
              <img src={selectedImage} alt={product.name} />
            ) : (
              <div className="pd-image-placeholder">
                No product image
              </div>
            )}

            {product.badge && (
              <span className="pd-badge">{product.badge}</span>
            )}
          </div>

          <div className="pd-thumbnails">
            {images.map((img, index) => (
              <button
                type="button"
                key={index}
                className={`pd-thumb ${
                  selectedImage === img && !showVideo ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedImage(img);
                  setShowVideo(false);
                }}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                />
              </button>
            ))}

            {product.video && (
              <button
                type="button"
                className={`pd-video-thumb ${
                  showVideo ? "active" : ""
                }`}
                onClick={() => setShowVideo(true)}
              >
                ▶
                <span>Video</span>
              </button>
            )}
          </div>
        </div>

        <div className="pd-information">

          <span className="pd-category">
            {product.category || "Aquarium Product"}
          </span>

          <h1>{product.name}</h1>

          <div className="pd-rating">
            <span className="pd-stars">★★★★★</span>
            <strong>{product.rating || 0}</strong>
            <span>({product.reviews || 0} Reviews)</span>
            <a href="#customer-reviews">Read Reviews</a>
          </div>

          <div className="pd-price-row">
            <strong>{formatPrice(product.price)}</strong>

            {product.oldPrice && (
              <>
                <del>{formatPrice(product.oldPrice)}</del>
                <span className="pd-discount">
                  {Math.round(
                    ((product.oldPrice - product.price) /
                      product.oldPrice) *
                      100
                  )}% OFF
                </span>
              </>
            )}
          </div>

          <div className={`pd-stock ${inStock ? "" : "out-of-stock"}`}>
            {inStock ? (
              <>
                <FaCheckCircle /> In Stock
                {product.stock !== undefined &&
                  ` (${product.stock} available)`}
              </>
            ) : (
              "Out of Stock"
            )}
          </div>

          <p className="pd-description">
            {product.description ||
              "Discover quality aquarium products from Hamathi Aqua House."}
          </p>

          <div className="pd-benefits">
            <div>
              <FaTruck />
              <span>Islandwide Delivery</span>
            </div>

            <div>
              <FaShieldAlt />
              <span>Quality Products</span>
            </div>
          </div>

          <div className="pd-quantity">
            <span>Quantity</span>

            <div className="pd-quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity((q) => Math.max(1, q - 1))
                }
                disabled={quantity <= 1}
              >
                <FaMinus />
              </button>

              <strong>{quantity}</strong>

              <button
                type="button"
                onClick={() =>
                  setQuantity((q) =>
                    product.stock !== undefined
                      ? Math.min(product.stock, q + 1)
                      : q + 1
                  )
                }
                disabled={
                  product.stock !== undefined &&
                  quantity >= product.stock
                }
              >
                <FaPlus />
              </button>
            </div>
          </div>

          <div className="pd-actions">
            <button
              type="button"
              className="pd-add-cart"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <FaShoppingCart /> Add to Cart
            </button>

            <button
              type="button"
              className="pd-buy-now"
              onClick={handleBuyNow}
              disabled={!inStock}
            >
              Buy Now
            </button>

            <button
              type="button"
              className={`pd-wishlist ${
                isFavourite ? "selected" : ""
              }`}
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
            >
              <FaHeart />
            </button>
          </div>

          <p className="pd-order-note">
            Payment and order confirmation through WhatsApp.
          </p>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="pd-section">
        <div className="pd-section-heading">
          <span>LEARN MORE</span>
          <h2>Product Details</h2>
        </div>

        <div className="pd-details-box">
          <h3>About this product</h3>

          <p>
            {product.description ||
              `${product.name} is available at Hamathi Aqua House. Contact us for more information about this product.`}
          </p>

          <h3>Product Information</h3>

          <div className="pd-specifications">
            <div>
              <span>Product Name</span>
              <strong>{product.name}</strong>
            </div>

            <div>
              <span>Category</span>
              <strong>{product.category || "Aquarium Product"}</strong>
            </div>

            <div>
              <span>Availability</span>
              <strong>{inStock ? "Available" : "Out of Stock"}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <section className="pd-section" id="customer-reviews">
        <div className="pd-section-heading">
          <span>WHAT CUSTOMERS SAY</span>
          <h2>Customer Reviews</h2>
        </div>

        <div className="pd-review-summary">
          <div className="pd-review-score">
            <strong>{product.rating || "0.0"}</strong>
            <div className="pd-stars">★★★★★</div>
            <span>{product.reviews || 0} Reviews</span>
          </div>

          <div className="pd-review-message">
            <h3>Share your experience</h3>
            <p>
              Purchased this product? Tell other aquarium lovers about
              your experience.
            </p>
          </div>
        </div>

        <div className="pd-review-layout">

          <div className="pd-review-list">
            <h3>Customer Feedback</h3>

            <div className="pd-no-reviews">
              <FaStar />
              <p>No customer reviews are displayed here yet.</p>
              <span>
                Be the first to share your experience!
              </span>
            </div>
          </div>

          <div className="pd-review-form-card">
            <h3>Write a Review</h3>

            <p className="pd-form-subtitle">
              Your feedback helps other customers.
            </p>

            <form
              onSubmit={handleReviewSubmit}
              className="pd-review-form"
            >

              <label>Your Rating *</label>

              <div className="pd-rating-picker">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    className={
                      star <= reviewRating ? "active" : ""
                    }
                    onClick={() => setReviewRating(star)}
                    aria-label={`${star} stars`}
                  >
                    ★
                  </button>
                ))}
              </div>

              <label htmlFor="review-name">Your Name *</label>

              <input
                id="review-name"
                type="text"
                placeholder="Enter your name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                required
              />

              <label htmlFor="review-email">
                Email Address (Optional)
              </label>

              <input
                id="review-email"
                type="email"
                placeholder="Enter your email"
                value={reviewEmail}
                onChange={(e) => setReviewEmail(e.target.value)}
              />

              <label htmlFor="review-title">Review Title *</label>

              <input
                id="review-title"
                type="text"
                placeholder="Give your review a title"
                value={reviewTitle}
                onChange={(e) => setReviewTitle(e.target.value)}
                required
              />

              <label htmlFor="review-text">Your Review *</label>

              <textarea
                id="review-text"
                rows="5"
                placeholder="Share your experience with this product..."
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />

              {/* REVIEW PHOTO UPLOAD */}
              <label
                htmlFor="review-photo"
                className="pd-upload-label"
              >
                <FaCamera />
                Upload Product Photos (Optional)
              </label>

              <input
                id="review-photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handlePhotoChange}
              />

              <small>
                You can upload up to 2 photos. JPG, PNG or WEBP.
                Maximum 5MB per photo.
              </small>

              {/* PHOTO ERROR */}
              {photoError && (
                <p className="pd-photo-error" role="alert">
                  {photoError}
                </p>
              )}

              {/* PHOTO PREVIEWS */}
              {photoPreviews.length > 0 && (
                <div className="pd-photo-preview-list">
                  {photoPreviews.map((preview, index) => (
                    <div
                      className="pd-photo-preview"
                      key={`${preview}-${index}`}
                    >
                      <img
                        src={preview}
                        alt={`Review upload ${index + 1}`}
                      />

                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        aria-label={`Remove photo ${index + 1}`}
                      >
                        <FaTimes />
                      </button>

                      <span>Photo {index + 1}</span>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                className="pd-submit-review"
              >
                Submit Review
              </button>

              {reviewMessage && (
                <p
                  className="pd-review-message-status"
                  role="status"
                >
                  {reviewMessage}
                </p>
              )}

              <small>
                Reviews are checked by our team before appearing publicly.
              </small>
            </form>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="pd-section pd-related">
          <div className="pd-section-heading">
            <span>MORE TO EXPLORE</span>
            <h2>You May Also Like</h2>
          </div>

          <div className="pd-related-grid">
            {relatedProducts.map((item) => (
              <Link
                to={`/product/${item.id}`}
                className="pd-related-card"
                key={item.id}
              >
                <img src={item.image} alt={item.name} />

                <div>
                  <h3>{item.name}</h3>
                  <strong>{formatPrice(item.price)}</strong>
                  <span>View Product →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

    </main>
  );
}

export default ProductDetails;
