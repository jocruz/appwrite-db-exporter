import { account, databases } from "../appwriteClient"; // Importing account and databases from Appwrite client configuration.

/**
 * Logs in a user using email and password.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Object} response - The response from the Appwrite API on successful login.
 * @throws Will throw an error if the login attempt fails.
 */
export const login = async (email, password) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    console.log("Login successful:", response);
    return response; // Return the successful login response.
  } catch (error) {
    console.error("Login failed:", error);
    throw error; // Throw an error if login fails.
  }
};

/**
 * Logs out the current user session.
 *
 * @returns {void}
 * @throws Will throw an error if the logout attempt fails.
 */
export const logout = async () => {
  try {
    await account.deleteSession("current"); // Logs out the current session.
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error);
    throw error; // Throw an error if logout fails.
  }
};

/**
 * Retrieves the current user session.
 *
 * @returns {Object} response - The current session data from the Appwrite API.
 * @throws Will throw an error if no active session is found or if retrieval fails.
 */
export const getCurrentSession = async () => {
  try {
    const response = await account.get();
    console.log("Current session:", response);
    return response; // Return the current session data.
  } catch (error) {
    console.error("No active session found:", error);
    throw error; // Throw an error if no active session is found.
  }
};

/**
 * Fetches documents from a specific collection in the database.
 *
 * @param {string} databaseId - The ID of the database to fetch documents from.
 * @param {string} collectionId - The ID of the collection to fetch documents from.
 * @returns {Array} response.documents - An array of documents from the specified collection.
 * @throws Will throw an error if fetching documents fails.
 */
export const getDocuments = async (databaseId, collectionId) => {
  try {
    const response = await databases.listDocuments(databaseId, collectionId);
    console.log("Documents:", response);
    return response.documents; // Return the fetched documents.
  } catch (error) {
    console.error("Fetching documents failed:", error);
    throw error; // Throw an error if fetching documents fails.
  }
};
