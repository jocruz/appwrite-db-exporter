// src/contexts/UserContext.js

import React, { createContext, useContext, useState } from 'react';
import { login } from '../services/AuthService'; // Adjust path as needed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    const handleLogin = async (email, password) => {
        try {
            const response = await login(email, password);
            setUser(response); // Set user state upon successful login
        } catch (error) {
            setError(error.message); // Handle login error
        }
    };

    const handleLogout = () => {
        // Implement logout logic if needed
        setUser(null); // Clear user state
    };

    return (
        <UserContext.Provider value={{ user, error, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
