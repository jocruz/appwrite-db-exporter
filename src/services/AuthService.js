// src/services/AuthService.js

import { account } from '../lib/appwrite';

export const login = async (email, password) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);
        console.log('Login successful:', response);
        return response; // Success
    } catch (error) {
        console.error('Login failed:', error);
        throw error; // Failure
    }
};
