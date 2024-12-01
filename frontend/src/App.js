import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './Components/Login';
import Register from './Components/Register';
import Settings from './Components/Settings';
import Dashboard from './Components/Dashboard';

import { ClipLoader } from 'react-spinners';

const App = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);  // New loading state

  useEffect(() => {
    // Get token from local storage or cookies
    const token = localStorage.getItem('token');

    if (token) {
      axios.get('http://localhost:4000/api/auth', {
        headers: {
          Authorization: `Bearer ${token}`,  // Add Bearer prefix
        }
      })
      .then((response) => {
        setDashboardData(response.data);
        setLoading(false);  // Stop loading after data is received
      })
      .catch((err) => {
        setError('You are not authorized to access this page');
        setLoading(false);  // Stop loading on error
      });
    } else {
      setError('No token found. Please login first.');
      setLoading(false);  // Stop loading when no token is found
    }
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
    <ClipLoader color={'#3498db'} loading={true} size={50} />
  </div>
  }

  return (
    <Router>
      <Routes>
        {/* If authenticated, redirect to Dashboard, otherwise SignIn */}
        {dashboardData ? (
          <Route path="/" element={<Dashboard />} />
        ) : (
          <Route path="/" element={<SignIn />} />
        )}

        {/* SignIn page route */}
        <Route path="/register" element={<Register />} />
        <Route path="/settings" element={<Settings />} />

        {/* Main page route */}
        <Route
          path="/dashboard"
          element={dashboardData ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
