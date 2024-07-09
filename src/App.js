// src/App.js

import React from 'react';
import { UserProvider } from './contexts/UserContext'; // Adjust path as needed
import Login from './views/Login'; // Adjust path as needed

const App = () => {
    return (
        <UserProvider>
            <div className="App">
                <Login />
                {/* Other components and routes */}
            </div>
        </UserProvider>
    );
};

export default App;
