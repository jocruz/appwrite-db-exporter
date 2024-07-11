Here is your updated README.md reflecting the changes in your project structure and functionalities:

```markdown
# 📚 Appwrite Data to CSV - README

Welcome to the Appwrite Data to CSV project! This README will guide you through the structure and functionality of key components in this project.

To start the project we are using Yarn Package Manager,

```bash
yarn
yarn install
yarn start
```

## 🚀 Project Structure

### 📂 `pages/Login.jsx`

#### Description
The `Login` component manages user authentication and document display. It handles user input for email and password and conditionally renders user-specific documents or a login form based on authentication status.

#### Key Features
- **State Management**: Uses `useState` for managing email, password, and document states.
- **Form Handling**: Manages login form submission with credential validation and error handling.
- **Dynamic Rendering**: Conditionally renders user documents or login form based on user's authentication status.

#### Example Code
```jsx
const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await handleLogin(email, password);
    console.log("Login successful!");
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};

const renderDocuments = () => (
  documents.length > 0 ? (
    <ul>
      {documents.map((doc, index) => (
        <li key={index}>{/* Document details here */}</li>
      ))}
    </ul>
  ) : (
    <p>No documents available.</p>
  )
);
```

### 📂 `contexts/UserContext.jsx`

#### Description
Manages user session, authentication state, and document retrieval through a centralized context provider.

#### Key Features
- **Session Initialization**: Automatically initializes user session on component mount.
- **Authentication Management**: Provides methods for user login and logout.
- **Document Management**: Handles fetching of documents upon user authentication.

#### Example Code
```jsx
useEffect(() => {
  const initializeSession = async () => {
    try {
      const session = await getCurrentSession();
      if (session) {
        setUser(session);
        const docs = await getDocuments();
        setDocuments(docs);
      }
    } catch (error) {
      setError("Failed to fetch session");
    }
  };
  initializeSession();
}, []);
```

### 📂 `api/authentication/AuthService.js`

#### Description
Handles interactions with the Appwrite API for user authentication and document retrieval.

#### Key Features
- **User Login and Logout**: Implements user authentication mechanisms.
- **Session Management**: Retrieves and manages user session data.
- **Document Retrieval**: Fetches user-specific documents from the database.

#### Example Code
```javascript
export const login = async (email, password) => {
  try {
    const response = await account.createEmailPasswordSession(email, password);
    return { user: response, databaseId: DATABASE_ID, collectionId: COLLECTION_ID };
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const getDocuments = async () => {
  try {
    const response = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
    return response.documents;
  } catch (error) {
    throw new Error("Fetching documents failed");
  }
};
```

### 📂 `api/appwriteClient.js`

#### Description
Initializes and configures the Appwrite client with endpoint and project settings to facilitate backend interactions.

#### Key Features
- **Client Configuration**: Sets up the Appwrite client with necessary configuration.
- **Service Initialization**: Initializes services for account management and database operations.

#### Example Code
```javascript
const client = new Client();
client.setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT);
client.setProject(process.env.REACT_APP_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);
```

### 📂 `src/App.js`

#### Description
The root component that encapsulates the entire application, providing user context and rendering the `Login` component.

#### Key Features
- **Context Provision**: Supplies the user context to the application.
- **Component Rendering**: Manages the primary interface and routing of the application.

#### Example Code
```jsx
<UserProvider>
  <div className="App">
    <Login />
    {/* Additional components or routes */}
  </div>
</UserProvider>
```
```