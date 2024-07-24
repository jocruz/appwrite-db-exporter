// src/App.js
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { UserProvider } from './components/contexts/UserContext'; // Adjust path as needed
import Login from './pages/Login';

const App = () => {
    return (
        <ChakraProvider>
            <UserProvider>
                <div className="App">
                    <Login />
                    {/* Other components and routes */}
                </div>
            </UserProvider>
        </ChakraProvider>
    );
};

export default App;
