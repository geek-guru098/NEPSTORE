import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import AuthModal from "./AuthModal";
import CartSidebar from "./CartSidebar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const categories = [
    { name: "Electronics", path: "/shop?category=electronics" },
    { name: "Fashion", path: "/shop?category=fashion" },
    { name: "New Arrivals", path: "/shop?category=new" },
    { name: "On Sale", path: "/shop?category=sale" },
  ];

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">NepStore</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {category.name}
                </Link>
              ))}
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {/* Cart Button */}
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </button>

              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden md:inline text-gray-700">
                      {user.email?.split("@")[0]}
                    </span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 hidden group-hover:block">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        {user.emailVerified ? "✓ Verified" : "⚠ Not verified"}
                      </p>
                    </div>
                    <Link
                      to="/checkout"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Checkout
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="btn-primary flex items-center space-x-2"
                >
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </button>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <div className="flex flex-col space-y-3">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={category.path}
                    className="text-gray-600 hover:text-blue-600 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
                {user ? (
                  <>
                    <div className="pt-2 border-t">
                      <p className="text-sm text-gray-500 py-2">
                        Logged in as:
                      </p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-red-600 hover:text-red-800 py-2 text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMenuOpen(false);
                    }}
                    className="btn-primary mt-2"
                  >
                    Login / Signup
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Modals */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
    </>
  );
};

export default Header;
