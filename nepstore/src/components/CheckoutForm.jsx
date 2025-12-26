import React, { useState } from "react";
import { MapPin, Phone, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import PaymentModal from "./PaymentModal";

const CheckoutForm = () => {
  const { cart, getTotalPrice } = useCart();
  const [showPayment, setShowPayment] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "Kathmandu",
    paymentMethod: "khalti",
  });

  const cities = [
    "Kathmandu",
    "Lalitpur",
    "Bhaktapur",
    "Pokhara",
    "Biratnagar",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold mb-6">Shipping Information</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <User className="w-4 h-4 mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={shippingInfo.fullName}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, fullName: e.target.value })
                }
                className="input-field"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <Phone className="w-4 h-4 mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={shippingInfo.phone}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, phone: e.target.value })
                }
                className="input-field"
                placeholder="9800000000"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div>
              <label className="flex items-center text-sm font-medium mb-2">
                <MapPin className="w-4 h-4 mr-2" />
                Delivery Address
              </label>
              <textarea
                value={shippingInfo.address}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, address: e.target.value })
                }
                className="input-field min-h-[100px]"
                placeholder="Street, Ward Number, City"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <select
                value={shippingInfo.city}
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, city: e.target.value })
                }
                className="input-field"
                required
              >
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="khalti"
                    checked={shippingInfo.paymentMethod === "khalti"}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Khalti</span>
                    <p className="text-sm text-gray-500">
                      Pay with Khalti wallet
                    </p>
                  </div>
                </label>

                <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={shippingInfo.paymentMethod === "cod"}
                    onChange={(e) =>
                      setShippingInfo({
                        ...shippingInfo,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="mr-3"
                  />
                  <div>
                    <span className="font-medium">Cash on Delivery</span>
                    <p className="text-sm text-gray-500">
                      Pay when you receive the product
                    </p>
                  </div>
                </label>
              </div>
            </div>

            <button type="submit" className="btn-primary w-full py-3">
              Proceed to Payment
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow p-6 h-fit">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center py-3 border-b"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <span className="font-medium">
                  NPR {(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>NPR {getTotalPrice().toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <div className="flex justify-between border-t pt-3 text-lg font-bold">
              <span>Total</span>
              <span>NPR {getTotalPrice().toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal
          amount={getTotalPrice()}
          shippingInfo={shippingInfo}
          onClose={() => setShowPayment(false)}
        />
      )}
    </>
  );
};

export default CheckoutForm;
