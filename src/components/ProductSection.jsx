import { useState } from "react";
import ProductCard from "./ProductCard";
import "./ProductSection.css";
import products from "../data/products";
import { useSearch } from "../context/SearchContext";

import {
  FaFish,
  FaLeaf,
  FaTools,
  FaTint,
  FaUtensils,
  FaCubes,
  FaThLarge,
  FaArrowRight,
} from "react-icons/fa";

const categories = [
  {
    name: "Ornamental Fish",
    value: "Fish",
    icon: FaFish,
    image: products.find((p) => p.category === "Fish")?.image,
  },
  {
    name: "Glass Fish Tanks",
    value: "Glass Fish Tanks",
    icon: FaCubes,
    image: "/categories/tanks.jpg",
  },
  {
    name: "Customized Tanks",
    value: "Customized Tanks",
    icon: FaTint,
    image: "/categories/custom-tanks.jpg",
  },
  {
    name: "Live Plants",
    value: "Plants",
    icon: FaLeaf,
    image: products.find((p) => p.category === "Plants")?.image,
  },
  {
    name: "Live Cultures",
    value: "Live Cultures",
    icon: FaTint,
    image: "/categories/cultures.jpg",
  },
  {
    name: "Aquarium Food",
    value: "Aquarium Food",
    icon: FaUtensils,
    image: "/categories/food.jpg",
  },
  {
    name: "Accessories",
    value: "Accessories",
    icon: FaTools,
    image: products.find((p) => p.category === "Accessories")?.image,
  },
];

function ProductSection() {
  const { search } = useSearch();

  const [activeCategory, setActiveCategory] = useState("All");
  const [showAllCategories, setShowAllCategories] = useState(false);

  const normalizedSearch = search.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(normalizedSearch);

    const matchesCategory =
      activeCategory === "All" ||
      product.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const selectCategory = (category) => {
    setActiveCategory(category);

    setTimeout(() => {
      document.getElementById("products")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 6);

  return (
    <>
      <section className="aquatic-categories" id="categories">
        <div className="category-heading">
          <div>
            <span className="section-eyebrow">
              EXPLORE OUR COLLECTION
            </span>

            <h2>
              Our <span>Categories</span>
            </h2>

            <p>Everything you need for your aquarium.</p>
          </div>

          <button
            className="category-view-all"
            onClick={() => setShowAllCategories(!showAllCategories)}
          >
            {showAllCategories ? "Show Less" : "View All"}
            <FaArrowRight />
          </button>
        </div>

        <div className="category-grid">
          {visibleCategories.map((category) => {
            const Icon = category.icon;

            const count = products.filter(
              (p) => p.category === category.value
            ).length;

            return (
              <button
                type="button"
                key={category.value}
                className={`category-tile ${
                  activeCategory === category.value ? "selected" : ""
                }`}
                onClick={() => selectCategory(category.value)}
              >
                <div className="category-image-wrap">
                  <div className="category-water-ring">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt=""
                        loading="lazy"
                      />
                    ) : (
                      <Icon className="category-placeholder" />
                    )}
                  </div>

                  <span className="category-icon">
                    <Icon />
                  </span>
                </div>

                <div className="category-info">
                  <h3>{category.name}</h3>
                  <p>
                    {count} {count === 1 ? "Product" : "Products"}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="products" id="products">
        <div className="products-heading">
          <div>
            <span className="section-eyebrow">
              HANDPICKED FOR AQUARIUM LOVERS
            </span>

            <h2>
              {activeCategory === "All"
                ? "Popular in Aquatics"
                : categories.find(
                    (c) => c.value === activeCategory
                  )?.name}
            </h2>
          </div>

          {activeCategory !== "All" && (
            <button
              className="products-view-all"
              onClick={() => setActiveCategory("All")}
            >
              View All <FaArrowRight />
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="products-empty">
            <FaFish />
            <h3>No products found</h3>
            <p>
              Try another search or explore other categories.
            </p>
            <button onClick={() => setActiveCategory("All")}>
              Show All Products
            </button>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                {...product}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default ProductSection;