import React, { useState } from "react";
import { X, Loader } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const PaymentModal = ({ amount, shippingInfo, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { clearCart } = useCart();

  const handleKhaltiPayment = () => {
    setLoading(true);

    // Simulate Khalti payment
    setTimeout(() => {
      setLoading(false);
      toast.success("Payment successful! Order placed.");
      clearCart();
      onClose();
      window.location.href = "/";
    }, 2000);
  };

  const handleCODPayment = () => {
    toast.success("Order placed successfully! Cash on delivery selected.");
    clearCart();
    onClose();
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Complete Payment</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
              disabled={loading}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Total Amount:</span>
              <span className="text-2xl font-bold text-blue-600">
                NPR {amount.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Order will be delivered to {shippingInfo.address},{" "}
              {shippingInfo.city}
            </p>
          </div>

          {shippingInfo.paymentMethod === "khalti" ? (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Khalti Payment</h3>
                    <p className="text-sm text-gray-500">
                      Pay with your Khalti wallet
                    </p>
                  </div>
                  <img
                    src="https://khalti.com/static/img/logo.svg"
                    alt="Khalti"
                    className="h-8"
                  />
                </div>
              </div>

              <button
                onClick={handleKhaltiPayment}
                disabled={loading}
                className="btn-primary w-full py-3 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  "Pay with Khalti"
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                You will be redirected to Khalti for secure payment
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium">Cash on Delivery</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Pay when you receive your order. Our delivery person will
                  collect the payment.
                </p>
              </div>

              <button
                onClick={handleCODPayment}
                className="btn-primary w-full py-3"
              >
                Confirm Order
              </button>

              <p className="text-sm text-gray-500">
                Note: A small delivery charge may apply for COD orders
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
