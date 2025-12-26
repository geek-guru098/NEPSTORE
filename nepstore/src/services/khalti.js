export const initializeKhalti = (amount, productIdentity, productName) => {
  return new Promise((resolve, reject) => {
    if (!window.KhaltiCheckout) {
      reject(new Error("Khalti SDK not loaded"));
      return;
    }

    const config = {
      publicKey: import.meta.env.VITE_KHALTI_PUBLIC_KEY,
      productIdentity: productIdentity,
      productName: productName,
      productUrl: window.location.origin,
      eventHandler: {
        onSuccess(payload) {
          console.log("Payment successful:", payload);
          resolve(payload);
        },
        onError(error) {
          console.error("Payment error:", error);
          reject(error);
        },
        onClose() {
          reject(new Error("Payment window closed"));
        },
      },
      paymentPreference: ["KHALTI"],
    };

    const checkout = new window.KhaltiCheckout(config);
    checkout.show({ amount: amount * 100 }); // Convert to paisa
  });
};
