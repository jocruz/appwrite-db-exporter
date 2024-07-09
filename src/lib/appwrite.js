// src/lib/appwrite.js
import { Account, Client } from 'appwrite';

const client = new Client();
client
  // Test Account
  .setEndpoint('') // Your Appwrite Endpoint
  .setProject(''); // Your project ID
  
const account = new Account(client);

export { account, client };

