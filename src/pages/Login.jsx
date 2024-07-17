import React from "react";
import DocumentList from "../components/contexts/DocumentList";
import LoginForm from "../components/contexts/LoginForm";
import { useUser } from "../components/contexts/UserContext";

const Login = () => {
  const { user, handleLogin, handleLogout, error, documents } = useUser();

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
        <LoginForm handleLogin={handleLogin} /> // Use the LoginForm component here
      )}
    </div>
  );
};

export default Login;
