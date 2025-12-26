import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ShoppingCart,
  Truck,
  Shield,
  RefreshCw,
  Star,
  ChevronLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { SAMPLE_PRODUCTS } from "../utils/constants";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Find product by ID
  const product = SAMPLE_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist.
        </p>
        <Link to="/shop" className="btn-primary inline-flex items-center">
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const images = [
    product.image,
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=500&auto=format&fit=crop",
  ];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/shop"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ChevronLeft className="w-5 h-5 mr-1" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="mb-4">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-2xl"
            />
          </div>
          <div className="flex space-x-4">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-24 h-24 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-blue-600"
                    : "border-gray-200"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {product.category}
            </span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 text-lg mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              {product.rating} • 128 reviews
            </span>
          </div>

          <div className="mb-8">
            <div className="text-5xl font-bold mb-2">
              NPR {product.price.toLocaleString()}
            </div>
            <p className="text-green-600 font-medium">
              In stock • Free delivery
            </p>
            {product.stock < 30 && (
              <p className="text-orange-600 text-sm mt-1">
                Only {product.stock} items left!
              </p>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="mb-8">
            <label className="block text-sm font-medium mb-2">Quantity</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-6 py-2 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="btn-primary flex-1 flex items-center justify-center py-3"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Truck className="w-6 h-6 text-blue-600 mr-3" />
              <div>
                <p className="font-medium">Free Delivery</p>
                <p className="text-sm text-gray-600">1-2 business days</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <p className="font-medium">Warranty</p>
                <p className="text-sm text-gray-600">1 year manufacturer</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <RefreshCw className="w-6 h-6 text-orange-600 mr-3" />
              <div>
                <p className="font-medium">Easy Returns</p>
                <p className="text-sm text-gray-600">7-day return policy</p>
              </div>
            </div>
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <ShoppingCart className="w-6 h-6 text-purple-600 mr-3" />
              <div>
                <p className="font-medium">COD Available</p>
                <p className="text-sm text-gray-600">Pay on delivery</p>
              </div>
            </div>
          </div>

          {/* Buy Now Button */}
          <Link to="/checkout" className="block">
            <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 transition-opacity">
              Buy Now with Khalti
            </button>
          </Link>
        </div>
      </div>

      {/* Specifications */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Specifications</h2>
        <div className="bg-white rounded-xl shadow p-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 text-gray-700">General</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Warranty</span>
                  <span className="font-medium">1 Year</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3 text-gray-700">Shipping Info</h3>
              <div className="space-y-2">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Delivery Time</span>
                  <span className="font-medium">1-2 Business Days</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Shipping Area</span>
                  <span className="font-medium">All Nepal</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">COD Available</span>
                  <span className="font-medium text-green-600">Yes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
