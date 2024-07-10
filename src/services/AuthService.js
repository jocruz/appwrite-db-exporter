// import { account, databases } from '../lib/appwrite';

// export const login = async (email, password) => {
//     try {
//         const response = await account.createEmailPasswordSession(email, password);
//         console.log('Login successful:', response);
//         return response; // Success
//     } catch (error) {
//         console.error('Login failed:', error);
//         throw error; // Failure
//     }
// };

// export const logout = async () => {
//     try {
//         await account.deleteSession('current'); // Logs out the current session
//         console.log('Logout successful');
//     } catch (error) {
//         console.error('Logout failed:', error);
//         throw error; // Failure
//     }
// };

// export const getCurrentSession = async () => {
//     try {
//         const response = await account.get();
//         console.log('Current session:', response);
//         return response; // Success
//     } catch (error) {
//         console.error('No active session found:', error);
//         throw error; // Failure
//     }
// };

// // New function to fetch documents from a specified collection
// export const getDocuments = async (databaseId, collectionId) => {
//     try {
//         const response = await databases.listDocuments(databaseId, collectionId);
//         console.log('Documents fetched:', response.documents);
//         return response.documents; // Success
//     } catch (error) {
//         console.error('Error fetching documents:', error);
//         throw error; // Failure
//     }
// };

import { account, databases } from '../lib/appwrite';

export const login = async (email, password) => {
    try {
        const response = await account.createEmailSession(email, password);
        console.log('Login successful:', response);
        return response; // Success
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Failure
    }
};

// export const login = async (email, password) => {
//     try {
//         const response = await account.createEmailPasswordSession(email, password);
//         console.log('Login successful:', response);
//         return response; // Success
//     } catch (error) {
//         console.error('Login failed:', error);
//         throw error; // Failure
//     }
// };

export const logout = async () => {
    try {
        await account.deleteSession('current'); // Logs out the current session
        console.log('Logout successful');
    } catch (error) {
        console.error('Logout failed:', error);
        throw error; // Failure
    }
};

export const getCurrentSession = async () => {
    try {
        const response = await account.get();
        console.log('Current session:', response);
        return response; // Success
    } catch (error) {
        console.error('No active session found:', error);
        throw error; // Failure
    }
};

// Method to fetch documents from a specific collection
export const getDocuments = async (databaseId, collectionId) => {
    try {
        const response = await databases.listDocuments(databaseId, collectionId);
        console.log('Documents:', response);
        return response.documents; // Success
    } catch (error) {
        console.error('Fetching documents failed:', error);
        throw error; // Failure
    }
};
