// src/App.js
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import './App.css';
import Modal from 'react-modal';
import AppRoutes from './Routes';
import { AuthProvider, useAuth } from './context/AuthContext'; // Import useAuth
import BottomNavbar from './widgets/BottomNavbar';
import Header from './widgets/Header';
import Login from './components/Auth/Login';


function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    Modal.setAppElement('#app'); // Ensure this matches the element ID in your component
  }, []); // Empty dependency array to run once on mount

  return (
    <Router>
      <AuthProvider> {/* Keep AuthProvider to provide context */}
        <Main activeTab={activeTab} setActiveTab={setActiveTab} />
      </AuthProvider>
    </Router>
  );
}

const Main = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth(); // Use the custom hook to get user and logout

  return (
    <div id="app" className="w-full">
      {user ? (
        <>
          <Header />
          <main className="wrapper-container w-full max-w-[400px] mx-auto min-h-screen app-theme-bg px-[20px] pt-[20px] pb-[70px]">
            <AppRoutes />
          </main>
          <BottomNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
        </>
      ) : (
        <div className="wrapper-container w-full max-w-[400px] mx-auto min-h-screen app-theme-bg px-[20px] pt-[20px] pb-[70px]">
          <Login /> {/* Add this line to ensure Login component is rendered when user is null */}
        </div>
      )}
    </div>
  );
}

export default App;
