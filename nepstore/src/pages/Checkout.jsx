import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import CheckoutForm from "../components/CheckoutForm";
import { ShoppingCart, AlertCircle } from "lucide-react";

const Checkout = () => {
  const { cart, getTotalItems } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Login Required</h1>
        <p className="text-gray-600 mb-8">
          Please login to proceed with checkout
        </p>
        <Link to="/" className="btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">
          Add some products to your cart before checking out
        </p>
        <Link to="/shop" className="btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Checkout</h1>
        <div className="flex items-center text-gray-600">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mr-4">
            {getTotalItems()} items
          </span>
          <span>Logged in as: {user.email}</span>
        </div>
      </div>

      <CheckoutForm />

      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h3 className="font-bold text-lg mb-2">📦 Delivery Information</h3>
        <ul className="text-gray-600 space-y-1">
          <li>• Free delivery within Kathmandu Valley (1-2 business days)</li>
          <li>• Outside valley delivery: NPR 200-500 (2-4 business days)</li>
          <li>• Cash on delivery available nationwide</li>
          <li>• 7-day return policy for defective products</li>
        </ul>
      </div>
    </div>
  );
};

export default Checkout;
