import React, { createContext, useState, useEffect, useContext } from "react";
// REMOVE toast import
// import toast from 'react-hot-toast';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("nepstore_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nepstore_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + quantity,
        };
        alert(`Updated ${product.name} quantity`); // Use alert instead of toast
        return updatedCart;
      } else {
        const newItem = { ...product, quantity };
        alert(`Added ${product.name} to cart`); // Use alert instead of toast
        return [...prevCart, newItem];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const item = prevCart.find((item) => item.id === productId);
      if (item) {
        alert(`Removed ${item.name} from cart`); // Use alert instead of toast
      }
      return prevCart.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    alert("Cart cleared"); // Use alert instead of toast
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
