import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your Firebase configuration
const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY ||
    "AIzaSyDlM1ACMYXcYGkOCNfl_Uu4b2oq0XmsctM",
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ||
    "nepstore-39b91.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "nepstore-39b91",
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ||
    "nepstore-39b91.firebasestorage.app",
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1007110448286",
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID ||
    "1:1007110448286:web:2f6b624c22e226e0fd878f",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-B9GYGV8RQK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
