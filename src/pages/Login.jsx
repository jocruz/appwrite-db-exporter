import React from "react";
import DocumentList from "../components/contexts/DocumentList";
import LoginHandling from "../components/contexts/LoginHandling";
import { useUser } from "../components/contexts/UserContext"; // Provides access to user context and related actions.

const Login = () => {
  // Manages state for user credentials and form inputs.
  const { user, handleLogin, handleLogout, error, documents } = useUser();  

const handleLoginSubmit = async (email, password) => {
    await handleLogin(email, password);
  };

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
            <DocumentList documents={documents} />
          </div>
        </div>
      ) : (
        <LoginHandling onSubmit={handleLoginSubmit} />
      )}
    </div>
  );
};

export default Login;
