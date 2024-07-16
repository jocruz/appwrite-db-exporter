import React from "react";
import LoginHandling from "../components/contexts/LoginHandling";
import { useUser } from "../components/contexts/UserContext"; // Provides access to user context and related actions.

const Login = () => {
  // Manages state for user credentials and form inputs.
  const { user, handleLogin, handleLogout, error, documents } = useUser();  

const handleLoginSubmit = async (email, password) => {
    await handleLogin(email, password);
  };
const renderDocuments = () =>
  documents.length > 0 ? (
    <ul>
      {documents.map((doc, index) => (
        <li key={index}>
         <p>Name: {doc.Name || "No name provided"}</p>
         <p>ID: {doc.$id || "No ID"}</p>
         <p>Tenant: {doc.$tenant || "No Tenant"}</p>
         <p>Database ID: {doc.$databaseId || "No Database ID"}</p>            <p>Collection ID: {doc.$collectionId || "No Collection ID"}</p>
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
        <LoginHandling onSubmit={handleLoginSubmit} />
      )}
    </div>
  );
};

export default Login;
