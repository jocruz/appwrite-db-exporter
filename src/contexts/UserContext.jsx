import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchDatabases, getCurrentSession, login, logout } from '../services/AuthService'; // Adjust path as needed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [databases, setDatabases] = useState([]);

    useEffect(() => {
        const fetchSessionAndData = async () => {
            try {
                const session = await getCurrentSession();
                setUser(session); // Set user state if session exists
                const dbs = await fetchDatabases();
                setDatabases(dbs); // Fetch and set databases
            } catch (error) {
                console.log('No active session found:', error);
            }
        };
        fetchSessionAndData();
    }, []);

    // Handle user login
    const handleLogin = async (email, password) => {
        try {
            const response = await login(email, password); // Call your login function
            setUser(response); // Set user state upon successful login
            const dbs = await fetchDatabases();
            setDatabases(dbs); // Fetch and set databases
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
            setDatabases([]); // Clear databases on logout
        } catch (error) {
            setError(error.message); // Handle logout error
        }
    };

    return (
        <UserContext.Provider value={{ user, error, databases, handleLogin, handleLogout }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
