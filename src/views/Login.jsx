// import React, { useState } from 'react';
// import { useUser } from '../contexts/UserContext'; // Adjust path as needed

// const Login = () => {
//     const { user, handleLogin, handleLogout, error, documents } = useUser();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await handleLogin(email, password);
//             console.log("Login successful!");
//             // Handle successful login (e.g., redirect to dashboard)
//         } catch (error) {
//             console.error('Login failed:', error);
//         }
//     };

//     const renderDocuments = () => {
//         if (documents.length === 0) {
//             return <p>No documents available</p>;
//         }

//         return (
//             <ul>
//                 {documents.map((doc) => (
//                     <li key={doc.$id}>{JSON.stringify(doc)}</li>
//                 ))}
//             </ul>
//         );
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             {error && <p>{error}</p>}
//             {user ? (
//                 <div>
//                     <p>Welcome, {user.email}</p>
//                     <button onClick={handleLogout}>Logout</button>
//                     <h3>Documents</h3>
//                     {renderDocuments()}
//                 </div>
//             ) : (
//                 <form onSubmit={handleSubmit}>
//                     <label>Email:</label>
//                     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//                     <label>Password:</label>
//                     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//                     <button type="submit">Login</button>
//                 </form>
//             )}
//         </div>
//     );
// };

// export default Login;
import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext'; // Adjust path as needed

const Login = () => {
    const { user, handleLogin, handleLogout, error, documents, fetchDocuments } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (user) {
            fetchDocuments(); // Fetch documents if user is logged in
        }
    }, [user, fetchDocuments]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleLogin(email, password);
            console.log("Login successful!");
        } catch (error) {
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
                    <div>
                        <h3>Documents:</h3>
                        {documents.length > 0 ? (
                            <ul>
                                {documents.map((doc) => (
                                    <li key={doc.$id}>{doc.$id}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No documents available.</p>
                        )}
                    </div>
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
