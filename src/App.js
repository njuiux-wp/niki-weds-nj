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
  const { user, logout } = useAuth();

  useEffect(() => {
    if (user) {
      loadDataForActiveTab();
    }
  }, [user, activeTab]); // Depend on user and activeTab

  const loadDataForActiveTab = () => {
    // Assuming you have a function to fetch data based on `activeTab`
    switch (activeTab) {
      case 'dashboard':
        // Fetch data specific to the dashboard
        break;
      case 'otherTab': // Add cases as needed
        // Fetch data for other tabs
        break;
      default:
        break;
    }
  };

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
          <Login />
        </div>
      )}
    </div>
  );
};


export default App;
