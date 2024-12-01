import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Importing axios for API calls
import Navbar from './Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';  // Importing ClipLoader for loading spinner

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Effect to fetch dashboard data
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axios
        .get('http://localhost:4000/api/auth', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setDashboardData(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          setError('You are not authorized to access this page');
          setLoading(false);
        });
    } else {
      setError('No token found. Please login first.');
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">
      <ClipLoader color={'#3498db'} loading={true} size={50} />
    </div>
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-gray-200">
      <Navbar />

      {/* Centered Dashboard Content */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-xl rounded-xl p-8 mx-auto max-w-lg text-center space-y-6">
          <h2 className="text-4xl font-bold text-indigo-600 mb-4">
            Welcome, <span className="text-gray-800">{dashboardData?.name}</span>!
          </h2>
          <p className="text-xl text-gray-700">
            Email: <span className="font-semibold text-gray-900">{dashboardData?.email}</span>
          </p>
          <p className="text-lg font-medium">
            <span 
              className={`ml-2 ${dashboardData?.isVehicleRegistered ? 'text-green-600' : 'text-red-600'}`}>
              {dashboardData?.isVehicleRegistered ? 'This is your owner dashboard.' : 'This is your driver dashboard.'}
            </span>
          </p>

          {/* Conditionally display vehicle number if user owns a vehicle */}
          {dashboardData?.isVehicleRegistered && dashboardData?.vehicleNumber && (
            <p className="text-lg font-medium text-gray-800 mt-4">
              Vehicle Number: <span className="font-semibold text-gray-900">{dashboardData?.vehicleNumber}</span>
            </p>
          )}
        </div>
      </div>

      {/* Toaster for notifications */}
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
