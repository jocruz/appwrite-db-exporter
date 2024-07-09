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
