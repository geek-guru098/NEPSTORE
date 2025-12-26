export const SAMPLE_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    price: 185000,
    category: "electronics",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&auto=format&fit=crop",
    description:
      "Latest iPhone with A17 Pro chip, Titanium design, and Pro camera system",
    rating: 4.8,
    stock: 15,
  },
  {
    id: "2",
    name: "Samsung Galaxy S24",
    price: 135000,
    category: "electronics",
    brand: "Samsung",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&auto=format&fit=crop",
    description: "AI-powered smartphone with professional-grade camera",
    rating: 4.6,
    stock: 25,
  },
  {
    id: "3",
    name: "MacBook Air M2",
    price: 165000,
    category: "electronics",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop",
    description: "Supercharged by M2 chip with 13-inch Retina display",
    rating: 4.9,
    stock: 10,
  },
  {
    id: "4",
    name: "Nike Air Jordan 1",
    price: 14500,
    category: "fashion",
    brand: "Nike",
    image:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500&auto=format&fit=crop",
    description: "Classic basketball sneakers with premium leather",
    rating: 4.7,
    stock: 50,
  },
  {
    id: "5",
    name: "Levi's 501 Original",
    price: 6500,
    category: "fashion",
    brand: "Levi's",
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop",
    description: "Original fit jeans with button fly",
    rating: 4.5,
    stock: 100,
  },
  {
    id: "6",
    name: "Bose QuietComfort 45",
    price: 32000,
    category: "electronics",
    brand: "Bose",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop",
    description: "Wireless noise cancelling headphones",
    rating: 4.8,
    stock: 30,
  },
  {
    id: "7",
    name: "Zara Oversized T-Shirt",
    price: 2200,
    category: "fashion",
    brand: "Zara",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop",
    description: "Comfortable cotton oversized t-shirt",
    rating: 4.3,
    stock: 200,
  },
  {
    id: "8",
    name: "Apple Watch Series 9",
    price: 75000,
    category: "electronics",
    brand: "Apple",
    image:
      "https://images.unsplash.com/photo-1579586337278-3fdb946b7d8a?w=500&auto=format&fit=crop",
    description: "Smartwatch with advanced health features",
    rating: 4.7,
    stock: 20,
  },
];

export const CATEGORIES = [
  { id: "electronics", name: "Electronics", icon: "💻" },
  { id: "fashion", name: "Fashion", icon: "👕" },
];

export const BRANDS = {
  electronics: ["Apple", "Samsung", "Sony", "Bose", "Dell", "HP"],
  fashion: ["Nike", "Adidas", "Levi's", "Zara", "H&M", "Puma"],
};
