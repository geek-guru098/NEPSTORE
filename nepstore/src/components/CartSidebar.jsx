import React from "react";
import { X, ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const CartSidebar = ({ onClose }) => {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } =
    useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      alert("Please login to proceed to checkout");
      return;
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 flex max-w-full">
        <div className="relative w-screen max-w-md">
          <div className="flex h-full flex-col bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="w-8 h-8 text-blue-600" />
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      Shopping Cart
                    </h2>
                    <p className="text-sm text-gray-500">
                      {getTotalItems()} items
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="mt-12 text-center">
                  <p className="text-gray-500">Your cart is empty</p>
                </div>
              ) : (
                <div className="mt-8">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-4 border-b"
                    >
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="ml-4">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            NPR {item.price.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between mb-4">
                  <p>Total:</p>
                  <p className="font-bold">
                    NPR {getTotalPrice().toLocaleString()}
                  </p>
                </div>
                <Link
                  to="/checkout"
                  onClick={handleCheckout}
                  className="btn-primary w-full text-center py-3 block"
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
