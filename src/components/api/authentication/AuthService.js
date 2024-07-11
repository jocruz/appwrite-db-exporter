// Imports the necessary classes for Appwrite interaction.
import { account, databases } from "../appwriteClient";

// Pre-defined constants for database and collection IDs from environment variables.
const DATABASE_ID = process.env.REACT_APP_DATABASE_ID;
const COLLECTION_ID = process.env.REACT_APP_COLLECTION_ID;

/**
 * Authenticates a user with email and password, retrieves session details.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @returns {Object} - Contains user session information and identifiers for database access.
 * @throws Error when authentication fails.
 */
export const login = async (email, password) => {
  try {
    const loginResponse = await account.createEmailPasswordSession(email, password);
    console.log(loginResponse);
    return { user: loginResponse, databaseId: DATABASE_ID, collectionId: COLLECTION_ID };
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

/**
 * Retrieves documents from a specified database and collection.
 * @returns {Array} - Documents fetched from the database.
 * @throws Error when document retrieval fails.
 */
export const getDocuments = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    console.log("Documents:", response);
    return response.documents;
  } catch (error) {
    console.error("Fetching documents failed:", error);
    throw error;
  }
};

/**
 * Ends the current user session.
 * @throws Error when logout fails.
 */
export const logout = async () => {
  try {
    await account.deleteSession("current");
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

/**
 * Retrieves the current active session for a user.
 * @returns {Object} - Current session information.
 * @throws Error when no session is found or retrieval fails.
 */
export const getCurrentSession = async () => {
  try {
    const response = await account.get();
    console.log("Current session:", response);
    return response;
  } catch (error) {
    console.error("No active session found:", error);
    throw error;
  }
};
