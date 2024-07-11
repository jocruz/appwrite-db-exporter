import { Account, Client, Databases } from "appwrite"; // Importing necessary classes from the Appwrite SDK

/**
 * Initializes the Appwrite client with the specified endpoint and project ID.
 * These values are retrieved from environment variables to ensure that sensitive information
 * is not hardcoded into the source code.
 */

// Initialize the Appwrite client
const client = new Client();
client.setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT); // Set the API endpoint using an environment variable
client.setProject(process.env.REACT_APP_PROJECT_ID); // Set the project ID using an environment variable

/**
 * Set up Account and Databases services.
 * The Account service is used for managing user authentication.
 * The Databases service is used for interacting with the database and performing CRUD operations.
 */
const account = new Account(client);
const databases = new Databases(client);

// Export the configured Appwrite services for use in other parts of the application
export { account, client, databases };
