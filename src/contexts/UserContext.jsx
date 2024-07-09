import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentSession, login, logout } from '../services/AuthService'; // Adjust path as needed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getCurrentSession();
                setUser(session); // Set user state if session exists
            } catch (error) {
                console.log('No active session found:', error);
            }
        };
        fetchSession();
    }, []);

    // Handle user login
    const handleLogin = async (email, password) => {
        try {
            const response = await login(email, password); // Call your login function
            setUser(response); // Set user state upon successful login
            setError(null); // Clear any previous login errors
        } catch (error) {
            setError(error.message); // Handle login error
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            await logout();
            setUser(null); // Clear user state on logout
        } catch (error) {
            setError(error.message); // Handle logout error
        }
    };

    return (
        <UserContext.Provider value={{ user, error, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
