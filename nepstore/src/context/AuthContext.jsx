import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification, // Add this
  sendPasswordResetEmail, // Optional: for reset password
  applyActionCode, // For handling email verification
  checkActionCode, // For checking verification codes
  confirmPasswordReset, // Optional
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState("");

  // Initialize default users in localStorage
  useEffect(() => {
    const savedUsers = localStorage.getItem("nepstoreUsers");
    if (!savedUsers) {
      const defaultUsers = [
        {
          id: 1,
          name: "Acer User",
          email: "acer@example.com",
          role: "Customer",
          status: "Active",
          joinDate: "2024-01-15",
          emailVerified: true, // Add email verification status
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          role: "Customer",
          status: "Active",
          joinDate: "2024-02-20",
          emailVerified: true,
        },
        {
          id: 3,
          name: "Admin User",
          email: "admin@nepstore.com",
          role: "Admin",
          status: "Active",
          joinDate: "2024-01-01",
          emailVerified: true,
        },
      ];
      localStorage.setItem("nepstoreUsers", JSON.stringify(defaultUsers));
    }
  }, []);

  // NEW: Send verification email
  const sendVerificationEmail = async () => {
    setError("");
    setAuthLoading(true);

    try {
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }

      await sendEmailVerification(auth.currentUser, {
        url: `${window.location.origin}/login?verified=true`, // Redirect URL after verification
        handleCodeInApp: true, // Recommended for mobile
      });

      return {
        success: true,
        message: "Verification email sent! Please check your inbox.",
      };
    } catch (error) {
      console.error("Error sending verification email:", error);

      let errorMessage = "Failed to send verification email.";
      if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // NEW: Resend verification email
  const resendVerificationEmail = async () => {
    return await sendVerificationEmail();
  };

  // NEW: Check if user's email is verified
  const checkEmailVerification = async () => {
    try {
      if (!auth.currentUser) {
        return false;
      }

      // Reload user to get latest verification status
      await auth.currentUser.reload();
      return auth.currentUser.emailVerified;
    } catch (error) {
      console.error("Error checking email verification:", error);
      return false;
    }
  };

  // NEW: Handle email verification link
  const verifyEmail = async (actionCode) => {
    setError("");
    setAuthLoading(true);

    try {
      // Apply the verification code
      await applyActionCode(auth, actionCode);

      // Check the code to get email
      const info = await checkActionCode(auth, actionCode);
      const email = info.data.email;

      // Update user's emailVerified status in Firestore
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, {
          emailVerified: true,
          verifiedAt: new Date().toISOString(),
        });
      }

      // Update localStorage
      try {
        const existingUsers = JSON.parse(
          localStorage.getItem("nepstoreUsers") || "[]"
        );
        const updatedUsers = existingUsers.map((user) =>
          user.email === email ? { ...user, emailVerified: true } : user
        );
        localStorage.setItem("nepstoreUsers", JSON.stringify(updatedUsers));
      } catch (localStorageError) {
        console.log("LocalStorage update skipped:", localStorageError);
      }

      return {
        success: true,
        message: "Email verified successfully!",
        email: email,
      };
    } catch (error) {
      console.error("Error verifying email:", error);

      let errorMessage = "Email verification failed.";
      if (error.code === "auth/invalid-action-code") {
        errorMessage = "Invalid or expired verification link.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "Account has been disabled.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "User account not found.";
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // UPDATED: Signup function with email verification
  const signup = async (email, password, userData) => {
    setError("");
    setAuthLoading(true);

    try {
      // Validate inputs
      if (!email || !password || !userData.name) {
        throw new Error("All fields are required");
      }

      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters");
      }

      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Send verification email immediately after signup
      await sendEmailVerification(userCredential.user, {
        url: `${
          window.location.origin
        }/login?verified=true&email=${encodeURIComponent(email)}`,
        handleCodeInApp: true,
      });

      // Update user profile with display name
      await updateProfile(userCredential.user, {
        displayName: userData.name,
      });

      // Create user document in Firestore
      const userDoc = {
        uid: userCredential.user.uid,
        name: userData.name,
        email: email,
        createdAt: new Date().toISOString(),
        role: "customer",
        status: "active",
        joinDate: new Date().toISOString().split("T")[0],
        emailVerified: false, // Initialize as not verified
        verificationSentAt: new Date().toISOString(),
        ...userData,
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userDoc);

      // Update local user state
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userData.name,
        emailVerified: false,
        ...userDoc,
      });

      // Dispatch event to notify admin panel
      const event = new CustomEvent("userRegistered", {
        detail: {
          type: "NEW_USER",
          name: userData.name,
          email: email,
          role: "customer",
          status: "active",
          emailVerified: false,
          timestamp: new Date().toISOString(),
        },
      });
      window.dispatchEvent(event);

      // Update localStorage for admin panel
      try {
        const existingUsers = JSON.parse(
          localStorage.getItem("nepstoreUsers") || "[]"
        );
        const newUser = {
          id: existingUsers.length + 1,
          name: userData.name,
          email: email,
          role: "customer",
          status: "active",
          joinDate: new Date().toISOString().split("T")[0],
          emailVerified: false,
        };
        localStorage.setItem(
          "nepstoreUsers",
          JSON.stringify([...existingUsers, newUser])
        );
      } catch (localStorageError) {
        console.log("LocalStorage update skipped:", localStorageError);
      }

      return {
        success: true,
        message:
          "Account created successfully! Please check your email to verify your account.",
        user: userCredential.user,
        requiresVerification: true,
      };
    } catch (error) {
      console.error("Signup error:", error);

      let errorMessage = "Signup failed. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email already in use. Please use a different email.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password should be at least 6 characters.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // UPDATED: Login function with email verification check
  const login = async (email, password, requireVerification = true) => {
    setError("");
    setAuthLoading(true);

    try {
      // Validate inputs
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check if email is verified
      if (requireVerification && !userCredential.user.emailVerified) {
        // Optional: Resend verification email
        await sendEmailVerification(userCredential.user, {
          url: `${window.location.origin}/login?verified=true`,
          handleCodeInApp: true,
        });

        return {
          success: false,
          message:
            "Please verify your email first. We've sent a new verification email.",
          requiresVerification: true,
        };
      }

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, "users", userCredential.user.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};

      // Update local user state
      setUser({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
        emailVerified: userCredential.user.emailVerified,
        ...userData,
      });

      return {
        success: true,
        message: "Logged in successfully!",
        user: userCredential.user,
      };
    } catch (error) {
      console.error("Login error:", error);

      let errorMessage = "Login failed. Please try again.";
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        errorMessage = "Invalid email or password.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many attempts. Please try again later.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "Account has been disabled.";
      } else if (error.code === "auth/email-not-verified") {
        errorMessage = "Email not verified. Please check your inbox.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      setError(errorMessage);
      return { success: false, message: errorMessage };
    } finally {
      setAuthLoading(false);
    }
  };

  // Logout function (unchanged)
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return { success: true, message: "Logged out successfully!" };
    } catch (error) {
      console.error("Logout error:", error);
      setError("Error logging out. Please try again.");
      return { success: false, message: "Error logging out." };
    }
  };

  // Get all users (for admin) - updated to include emailVerified
  const getAllUsers = async () => {
    try {
      const usersRef = collection(db, "users");
      const snapshot = await getDocs(usersRef);
      const users = [];
      snapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });

      // Merge with localStorage for demo
      try {
        const localUsers = JSON.parse(
          localStorage.getItem("nepstoreUsers") || "[]"
        );
        const mergedUsers = users.map((user) => {
          const localUser = localUsers.find((u) => u.email === user.email);
          return localUser ? { ...localUser, ...user } : user;
        });
        return mergedUsers;
      } catch {
        return users;
      }
    } catch (error) {
      console.error("Error fetching users:", error);

      // Fallback to localStorage
      try {
        return JSON.parse(localStorage.getItem("nepstoreUsers") || "[]");
      } catch {
        return [];
      }
    }
  };

  // Update user (for admin) - updated to handle email verification
  const updateUser = async (userId, userData) => {
    try {
      // Update Firestore
      await setDoc(doc(db, "users", userId), userData, { merge: true });

      // Update localStorage
      try {
        const existingUsers = JSON.parse(
          localStorage.getItem("nepstoreUsers") || "[]"
        );
        const updatedUsers = existingUsers.map((user) =>
          user.email === userData.email ? { ...user, ...userData } : user
        );
        localStorage.setItem("nepstoreUsers", JSON.stringify(updatedUsers));
      } catch (localStorageError) {
        console.log("LocalStorage update skipped:", localStorageError);
      }

      return { success: true, message: "User updated successfully!" };
    } catch (error) {
      console.error("Error updating user:", error);
      return { success: false, message: "Error updating user." };
    }
  };

  // NEW: Listen for auth state changes and email verification
  const checkEmailVerificationStatus = async (firebaseUser) => {
    try {
      await firebaseUser.reload();
      if (firebaseUser.emailVerified) {
        // Update Firestore
        const userRef = doc(db, "users", firebaseUser.uid);
        await updateDoc(userRef, {
          emailVerified: true,
          verifiedAt: new Date().toISOString(),
        });

        // Update localStorage
        try {
          const existingUsers = JSON.parse(
            localStorage.getItem("nepstoreUsers") || "[]"
          );
          const updatedUsers = existingUsers.map((user) =>
            user.email === firebaseUser.email
              ? { ...user, emailVerified: true }
              : user
          );
          localStorage.setItem("nepstoreUsers", JSON.stringify(updatedUsers));
        } catch (localStorageError) {
          console.log("LocalStorage update skipped:", localStorageError);
        }
      }
    } catch (error) {
      console.error("Error checking verification status:", error);
    }
  };

  // UPDATED: Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Check email verification status
          await checkEmailVerificationStatus(firebaseUser);

          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          const userData = userDoc.exists() ? userDoc.data() : {};

          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified,
            ...userData,
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            emailVerified: firebaseUser.emailVerified,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // NEW: Monitor URL for verification redirect
  useEffect(() => {
    const checkVerificationRedirect = () => {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("verified") === "true" && user && !user.emailVerified) {
        // User just verified email, refresh status
        if (auth.currentUser) {
          auth.currentUser.reload();
        }
      }
    };

    checkVerificationRedirect();
  }, [user]);

  const value = {
    user,
    signup,
    login,
    logout,
    getAllUsers,
    updateUser,
    sendVerificationEmail, // NEW
    resendVerificationEmail, // NEW
    checkEmailVerification, // NEW
    verifyEmail, // NEW
    loading,
    authLoading,
    error,
    clearError: () => setError(""),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
