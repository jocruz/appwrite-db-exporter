import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentSession, getDocuments, login, logout } from "../api/authentication/AuthService";

// Create a context to manage user authentication and related operations.
const UserContext = createContext();

// Define a provider component that will encapsulate the logic for user authentication and data fetching.
export const UserProvider = ({ children }) => {
  // Local state to store the current user, documents, and any errors encountered.
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  // Retrieve environment variables for the database and collection IDs.
  const databaseId = process.env.REACT_APP_DATABASE_ID;
  const collectionId = process.env.REACT_APP_COLLECTION_ID;

  // Effect to initialize the user session when the component mounts.
  useEffect(() => {
    const initializeSession = async () => {
      try {
        // Attempt to fetch the current session.
        const session = await getCurrentSession();
        setUser(session); // Update the user state if a session is found.
      } catch (error) {
        console.error("No active session found:", error);
        setError("Failed to fetch session"); // Set error state if session retrieval fails.
      }
    };
    initializeSession();
  }, []);

  // Handle user login by validating credentials and fetching documents upon success.
  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      setUser(response); // Update the user state upon successful login.
      await fetchDocuments(); // Fetch documents for the logged-in user.
      setError(null); // Clear any existing errors.
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed"); // Set error state if login fails.
    }
  };

  // Handle user logout by clearing the user and documents state.
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null); // Clear the user state upon logout.
      setDocuments([]); // Clear the documents state upon logout.
      setError(null); // Clear any existing errors.
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed"); // Set error state if logout fails.
    }
  };

  // Fetch documents from the database for the current user.
  const fetchDocuments = async () => {
    try {
      const docs = await getDocuments(databaseId, collectionId);
      console.log("Fetched Documents:", docs); // Log the fetched documents.
      setDocuments(docs); // Update the documents state with the fetched data.
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Failed to fetch documents"); // Set error state if document fetching fails.
    }
  };

  // Return the UserContext provider with the state and functions defined above.
  return (
    <UserContext.Provider
      value={{ user, error, documents, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to consume the UserContext, providing access to user-related state and functions.
export const useUser = () => useContext(UserContext);
