import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentSession, getDocuments, login, logout } from "../api/authentication/AuthService";

// Create a context for managing user state across the application.
const UserContext = createContext();

// Provider component to encapsulate user state management.
export const UserProvider = ({ children }) => {
  // State hooks for managing user data, documents, and potential errors.
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  // Effect hook to initialize user session on component mount.
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const session = await getCurrentSession();
        setUser(session); // Set user data upon successful session retrieval.
      } catch (error) {
        console.error("No active session found:", error);
        setError("Failed to fetch session"); // Handle errors in session retrieval.
      }
    };
    initializeSession();
  }, []);

  // Function to handle user login.
  const handleLogin = async (email, password) => {
    try {
      const { user } = await login(email, password);
      setUser(user); // Update user state with logged in user data.
      const docs = await getDocuments(); // Fetch documents post-login.
      setDocuments(docs); // Update state with fetched documents.
      setError(null); // Reset errors upon successful login.
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed"); // Set error state upon login failure.
    }
  };

  // Function to handle user logout.
  const handleLogout = async () => {
    try {
      await logout(); // Perform logout action.
      setUser(null); // Clear user state post-logout.
      setDocuments([]); // Clear documents state post-logout.
      setError(null); // Reset errors post-logout.
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed"); // Set error state upon logout failure.
    }
  };

  // Provider component wrapping child components, passing down user state and handlers.
  return (
    <UserContext.Provider value={{ user, error, documents, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to provide easy access to the user context.
export const useUser = () => useContext(UserContext);
