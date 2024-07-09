import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Adjust path as needed

const Login = () => {
    const { user, handleLogin, handleLogout, error } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(email, password);
            console.log("Login successful!");
            // Handle successful login (e.g., redirect to dashboard)
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p>{error}</p>}
            {user ? (
                <div>
                    <p>Welcome, {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
            )}
        </div>
    );
};

export default Login;
