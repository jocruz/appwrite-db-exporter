import React, { useState } from "react";
import { useUser } from "../contexts/UserContext"; // Import the useUser hook from UserContext for state and actions related to user session.

const Login = () => {
  // State management for user credentials.
  const { user, handleLogin, handleLogout, error, documents } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission for user login.
  const handleSubmit = async (event) => {
    event.preventDefault();  // Prevent the default form submit action.
    try {
      await handleLogin(email, password);  // Attempt to login using credentials from state.
      console.log("Login successful!");
    } catch (error) {
      console.error("Login failed:", error.message);  // Log any errors during the login process.
    }
  };

  // Function to render documents associated with the logged-in user.
  const renderDocuments = () =>
    documents.length > 0 ? (
      <ul>
        {documents.map((doc) => (
          <li key={doc.$id}>{doc.$id}</li>  // List each document by its ID.
        ))}
      </ul>
    ) : (
      <p>No documents available.</p>  // Display message if no documents are available.
    );

  // Render the login form or user information depending on the login state.
  return (
    <div>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}  // Display any error messages.
      {user ? (
        <div className="user-info">
          <p>Welcome, {user.email}</p>  // Show welcome message with user's email if logged in.
          <button onClick={handleLogout}>Logout</button>  // Provide logout button.
          <div>
            <h3>Documents:</h3>
            {renderDocuments()}  // Call renderDocuments to display the user's documents.
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>  // Show login form if no user is logged in.
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}  // Update email state on change.
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}  // Update password state on change.
            required
          />
          <button type="submit">Login</button>  // Submit button for the form.
        </form>
      )}
    </div>
  );
};

export default Login;
