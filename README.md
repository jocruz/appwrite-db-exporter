# 📚 Appwrite Data to CSV - README

Welcome to the Appwrite Data to CSV project! This README will guide you through the structure and functionality of key components in this project.

To start the project we are using Yarn Package Manager,

``` $yarn ```
``` $yarn install ```
```$ yarn start ```

## 🚀 Project Structure

### 📂 `pages/Login.jsx`

#### Description
The `Login` component provides the user interface for logging in and displaying user-specific documents. It manages user input for email and password, handles the login process, and conditionally renders either the login form or user information based on the user's authentication state.

#### Important Points
- **State Management**: Manages email and password inputs using `useState`.
- **Form Submission**: Handles form submission to log in the user.
- **Document Rendering**: Displays a list of documents for the logged-in user.

#### Key Functionality
- **handleSubmit**: Manages form submission for login.
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
  ```
- **renderDocuments**: Displays documents associated with the user.
  ```jsx
  const renderDocuments = () =>
    documents.length > 0 ? (
      <ul>
        {documents.map((doc) => (
          <li key={doc.$id}>{doc.$id}</li>
        ))}
      </ul>
    ) : (
      <p>No documents available.</p>
    );
  ```

### 📂 `contexts/UserContext.jsx`

#### Description
The `UserContext` manages user authentication and related operations. It provides a context for managing the user's session, logging in, logging out, and fetching user-specific documents.

#### Important Points
- **State Management**: Manages user, documents, and error states.
- **Session Initialization**: Initializes user session on component mount.
- **Login/Logout Handling**: Functions to handle user login and logout.
- **Document Fetching**: Fetches documents from the database for the current user.

#### Key Functionality
- **initializeSession**: Initializes the user session on component mount.
  ```jsx
  useEffect(() => {
    const initializeSession = async () => {
      try {
        const session = await getCurrentSession();
        setUser(session);
      } catch (error) {
        console.error("No active session found:", error);
        setError("Failed to fetch session");
      }
    };
    initializeSession();
  }, []);
  ```
- **handleLogin**: Handles user login.
  ```jsx
  const handleLogin = async (email, password) => {
    try {
      const response = await login(email, password);
      setUser(response);
      await fetchDocuments();
      setError(null);
    } catch (error) {
      console.error("Login failed:", error);
      setError("Login failed");
    }
  };
  ```
- **handleLogout**: Handles user logout.
  ```jsx
  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setDocuments([]);
      setError(null);
    } catch (error) {
      console.error("Logout failed:", error);
      setError("Logout failed");
    }
  };
  ```

### 📂 `api/authentication/AuthService.js`

#### Description
The `AuthService` provides functions for user authentication and data fetching from the Appwrite backend. It includes login, logout, session management, and document fetching functionalities.

#### Important Points
- **Error Handling**: Each function handles errors and logs them appropriately.
- **Asynchronous Operations**: Uses async/await for asynchronous operations.

#### Key Functionality
- **login**: Logs in a user using email and password.
  ```javascript
  export const login = async (email, password) => {
    try {
      const response = await account.createEmailPasswordSession(email, password);
      console.log("Login successful:", response);
      return response;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };
  ```
- **logout**: Logs out the current user session.
  ```javascript
  export const logout = async () => {
    try {
      await account.deleteSession("current");
      console.log("Logout successful");
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };
  ```
- **getCurrentSession**: Retrieves the current user session.
  ```javascript
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
  ```
- **getDocuments**: Fetches documents from a specific collection in the database.
  ```javascript
  export const getDocuments = async (databaseId, collectionId) => {
    try {
      const response = await databases.listDocuments(databaseId, collectionId);
      console.log("Documents:", response);
      return response.documents;
    } catch (error) {
      console.error("Fetching documents failed:", error);
      throw error;
    }
  };
  ```

### 📂 `api/appwriteClient.js`

#### Description
Initializes the Appwrite client with the specified endpoint and project ID. It sets up the `Account` and `Databases` services used for user authentication and database interactions.

#### Important Points
- **Environment Variables**: Uses environment variables for endpoint and project ID.
- **Service Setup**: Configures the Appwrite `Account` and `Databases` services.

#### Key Functionality
- **Client Initialization**: Sets up the Appwrite client.
  ```javascript
  const client = new Client();
  client.setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT);
  client.setProject(process.env.REACT_APP_PROJECT_ID);
  ```
- **Service Setup**: Configures `Account` and `Databases` services.
  ```javascript
  const account = new Account(client);
  const databases = new Databases(client);
  ```

### 📂 `src/App.js`

#### Description
The main application component that integrates the `UserProvider` and renders the `Login` component. It serves as the root component of the application.

#### Important Points
- **Context Provider**: Wraps the application with `UserProvider` to provide user context.
- **Component Rendering**: Renders the `Login` component.

#### Key Functionality
- **UserProvider**: Provides user context to the application.
  ```jsx
  <UserProvider>
    <div className="App">
      <Login />
      {/* Other components and routes */}
    </div>
  </UserProvider>
  ```

---