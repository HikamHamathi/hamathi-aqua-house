import { useParams } from "react-router-dom";
import products from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import "./ProductDetails.css";
import { useState, useEffect } from "react";

function ProductDetails() {
  const { id } = useParams();

const product = products.find(
  (p) => p.id === Number(id)
);

if (!product) return <h2>Product Not Found</h2>;
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isFavourite = wishlist.includes(product.id);
  const [showImage, setShowImage] = useState(false);
  const [showVideo, setShowVideo] = useState(false);


  return (
    <div className="product-gallery">

    <div className="details-image">

        {showVideo ? (

            <video controls autoPlay className="main-image">
                <source src={product.video} type="video/mp4"/>
            </video>

        ) : (

            <img
                src={selectedImage}
                className="main-image"
                alt=""
            />

        )}

    </div>

    <div className="thumbnails">

        {product.images.map((img,index)=>(
            <img
                key={index}
                src={img}
                className="thumb"
                onClick={()=>{
                    setSelectedImage(img);
                    setShowVideo(false);
                }}
            />
        ))}

        {product.video && (
            <div
                className="video-thumb"
                onClick={()=>setShowVideo(true)}
            >
                🎥
            </div>
        )}

    </div>

      <div className="details-info">

        <h1>{product.name}</h1>

        <p className="price">
          Rs. {product.price}
        </p>

        <p>
          ⭐ {product.rating} ({product.reviews} Reviews)
        </p>

        <p className="stock">
          ✅ In Stock ({product.stock})
        </p>

        <p className="description">
          {product.description}
        </p>

        <div className="details-buttons">

          <button
            className="add-btn"
            onClick={() => addToCart(product)}
          >
            🛒 Add to Cart
          </button>

          <button className="buy-btn">
            ⚡ Buy Now
          </button>

          <button
            className="wish-btn"
            onClick={() => toggleWishlist(product.id)}
          >
            {isFavourite ? "❤️" : "🤍"}
          </button>

        </div>

        {product.video && (
          <div className="product-video">
            <video controls>
              <source src={product.video} type="video/mp4" />
            </video>
          </div>
        )}

      </div>

    </div>
  );
}

export default ProductDetails;