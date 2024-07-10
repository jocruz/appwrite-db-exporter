// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { getCurrentSession, getDocuments, login, logout } from '../services/AuthService'; // Adjust path as needed

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null);
//     const [error, setError] = useState(null);
//     const [documents, setDocuments] = useState([]); // State to store documents

//     const databaseId = 'YOUR_DATABASE_ID'; // Replace with your actual database ID
//     const collectionId = 'YOUR_COLLECTION_ID'; // Replace with your actual collection ID

//     useEffect(() => {
//         const fetchSession = async () => {
//             try {
//                 const session = await getCurrentSession();
//                 setUser(session); // Set user state if session exists
//             } catch (error) {
//                 console.log('No active session found:', error);
//             }
//         };
//         fetchSession();
//     }, []);

//     // Handle user login
//     const handleLogin = async (email, password) => {
//         try {
//             const response = await login(email, password); // Call your login function
//             setUser(response); // Set user state upon successful login
//             setError(null); // Clear any previous login errors

//             // Fetch documents after login
//             const docs = await getDocuments(databaseId, collectionId);
//             setDocuments(docs);
//         } catch (error) {
//             setError(error.message); // Handle login error
//         }
//     };

//     // Handle user logout
//     const handleLogout = async () => {
//         try {
//             await logout();
//             setUser(null); // Clear user state on logout
//             setDocuments([]); // Clear documents on logout
//         } catch (error) {
//             setError(error.message); // Handle logout error
//         }
//     };

//     return (
//         <UserContext.Provider value={{ user, error, handleLogin, handleLogout, documents }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

// // Custom hook to use user context
// export const useUser = () => useContext(UserContext);

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentSession, getDocuments, login, logout } from '../services/AuthService'; // Adjust path as needed

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [documents, setDocuments] = useState([]);
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

    // Fetch documents from a specific collection
    const fetchDocuments = async () => {
        try {
            const databaseId = '668c704a001db3dab75a'; // Replace with your database ID
            const collectionId = '668c9164003e5c6ec7e0'; // Replace with your collection ID
            const docs = await getDocuments(databaseId, collectionId);
            setDocuments(docs);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError(error.message); // Handle fetch error
        }
    };

    // Handle user login
    const handleLogin = async (email, password) => {
        try {
            const response = await login(email, password); // Call your login function
            setUser(response); // Set user state upon successful login
            fetchDocuments(); // Fetch documents after successful login
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
            setDocuments([]); // Clear documents on logout
        } catch (error) {
            setError(error.message); // Handle logout error
        }
    };

    return (
        <UserContext.Provider value={{ user, error, documents, handleLogin, handleLogout, fetchDocuments }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use user context
export const useUser = () => useContext(UserContext);
