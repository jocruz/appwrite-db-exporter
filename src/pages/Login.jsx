import React, { useState } from "react";
import { useUser } from "../components/contexts/UserContext"; // Provides access to user context and related actions.

const Login = () => {
  // Manages state for user credentials and form inputs.
  const { user, handleLogin, handleLogout, error, documents } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handles user login on form submission.
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await handleLogin(email, password);
      console.log("Login successful!");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  // Renders documents if available; shows message if none are found.
  const renderDocuments = () =>
    documents.length > 0 ? (
      <ul>
        {documents.map((doc, index) => (
          <li key={index}>
            <p>Name: {doc.Name || "No name provided"}</p>
            <p>ID: {doc.$id || "No ID"}</p>
            <p>Tenant: {doc.$tenant || "No Tenant"}</p>
            <p>Database ID: {doc.$databaseId || "No Database ID"}</p>
            <p>Collection ID: {doc.$collectionId || "No Collection ID"}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No documents available.</p>
    );

  // Main render function for the login component.
  return (
    <div>
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      {user ? (
        <div className="user-info">
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Logout</button>

          <div>
            <h3>Documents:</h3>
            {renderDocuments()}
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
};

export default Login;
