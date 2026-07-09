import guppy from "../assets/guppy.jpg";
import betta1 from "../assets/betta1.jpg";
import betta2 from "../assets/betta2.jpg";
import betta3 from "../assets/betta3.jpg";
import guppyvideo from "../assets/guppyvideo.mp4";

const products = [
  {
  id: 1,
  category: "Fish",
  name: "Guppy Fish",
  price: 1800,
  image: guppy,
  images: [guppy, betta1, betta2, betta3],
  video: guppyvideo,
  oldPrice: 2200,
  stock: 18,
  rating: 4.9,
  reviews: 126,
  badge: "Best Seller",
  description: "Healthy imported Guppy Fish..."
},
  // {
  //   id: 1,
  //   name: "Gold Fish",
  //   price: 2500,
  //   image: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?w=600",
  //   category: "Fish",
  //   rating: 5
  // },

  {
    id: 2,
    name: "Betta Fish",
    price: 1800,
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600",
    category: "Fish",
    rating: 5
  },

  {
    id: 3,
    name: "Angel Fish",
    price: 3200,
    image: "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600",
    category: "Fish",
    rating: 4
  },

  {
    id: 4,
    name: "Aquarium Filter",
    price: 7500,
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=600",
    category: "Accessories",
    rating: 5
  },

  {
    id: 5,
    name: "Air Pump",
    price: 4500,
    image: "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=600",
    category: "Accessories",
    rating: 4
  },

  {
    id: 6,
    name: "Aquarium Plant",
    price: 1200,
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
    category: "Plants",
    rating: 5
  }
  
];

export default products;