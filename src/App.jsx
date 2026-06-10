import React, { useState } from 'react';
import LoginScreen from './components/LoginScreen';
import MainDashboard from './components/MainDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 font-sans text-gray-900 selection:bg-zs-red selection:text-white">
      {!isAuthenticated ? (
        <LoginScreen onLogin={() => setIsAuthenticated(true)} />
      ) : (
        <MainDashboard onLogout={() => setIsAuthenticated(false)} />
      )}
    </div>
  );
}

export default App;
