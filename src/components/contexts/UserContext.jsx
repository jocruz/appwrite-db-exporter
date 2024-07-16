import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentSession,
  getDocuments,
  login,
  logout,
} from "../../api/authentication/AuthService";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);

  const manageSession = async () => {
    try {
      const session = await getCurrentSession();
      if (session) {
        setUser(session); // Set user data upon successful session retrieval
        const docs = await getDocuments(); // Fetch documents if session is valid
        setDocuments(docs);
      } else {
        setUser(null);
        setDocuments([]);
      }
    } catch (error) {
      console.error("Session management failed:", error);
      setError("Failed to manage session"); // Handle errors in session retrieval or document fetching
    }
  };

  // Effect to manage session and document fetching
  useEffect(() => {
    manageSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { user } = await login(email, password);
      setUser(user); // Update user state with logged in user data.
      setError(null); // Reset errors upon successful login.
      await manageSession(); // Ensure documents are fetched after a new login
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed"); // Set error state upon login failure.
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setDocuments([]);
      setError(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed");
    }
  };

  return (
    <UserContext.Provider
      value={{ user, error, documents, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);