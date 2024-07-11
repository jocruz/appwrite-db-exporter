// src/App.js

import React from 'react';
import { UserProvider } from './components/contexts/UserContext'; // Adjust path as needed
import Login from './pages/Login'

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
