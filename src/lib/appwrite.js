import { Account, Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
  .setProject('668c5c3c0015970fb900'); // Your project ID
  
const account = new Account(client);
const databases = new Databases(client); // Add Databases client

export { account, client, databases };
