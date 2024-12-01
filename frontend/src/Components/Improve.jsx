import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavHalf from './NavHalf';
import drivingTipsImage from '../images/driving-tips.jpg'; // Example image
import Navbar from './Navbar';

const ImproveWithUs = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

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
      })
      .catch((err) => {
        setError('You are not authorized to access this page');
      });
    } else {
      setError('No token found. Please login first.');
    }
  }, []);
  return (
    <>
    {dashboardData ? (
              <Navbar />

      ) : (
        <NavHalf />

      )}
      <div className="flex flex-col items-center min-h-screen bg-gray-100 p-20">
        {/* Improve With Us Section */}
        <div className="p-8 w-full max-w-4xl bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Improve Your Driving Skills with Us</h2>
          
          {/* Introduction */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Why Improve Your Driving Skills?</h3>
            <p className="text-gray-700 mb-4">
              Enhancing your driving skills not only makes you a safer driver but also improves your overall driving experience. Whether you're a new driver or an experienced one, there is always room for improvement. Here are some tips, tricks, and best practices to help you become a more confident and skilled driver.
            </p>
            <img
              src={drivingTipsImage}
              alt="Driving Tips"
              className="w-full h-auto object-cover rounded-md mb-4 p-4"
            />
          </section>

          {/* Tips and Tricks */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Tips and Tricks for Better Driving</h3>
            <ul className="list-disc pl-6 space-y-4">
              <li className="text-gray-800">Practice defensive driving by staying alert and anticipating potential hazards.</li>
              <li className="text-gray-800">Take regular driving courses to refine your skills and learn new techniques.</li>
              <li className="text-gray-800">Adjust your mirrors and seat properly before starting your drive for better visibility.</li>
              <li className="text-gray-800">Use your vehicle’s safety features, such as ABS, traction control, and lane assist, effectively.</li>
              <li className="text-gray-800">Avoid distractions like texting or eating while driving to maintain focus on the road.</li>
            </ul>
          </section>

          {/* Best Practices */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Best Practices for Safe Driving</h3>
            <ul className="list-disc pl-6 space-y-4">
              <li className="text-gray-800">Follow all traffic laws and signals to ensure safety on the road.</li>
              <li className="text-gray-800">Maintain a safe distance from the vehicle ahead to allow ample braking time.</li>
              <li className="text-gray-800">Check your blind spots before changing lanes or merging onto highways.</li>
              <li className="text-gray-800">Be mindful of pedestrians and cyclists, and always yield at crosswalks.</li>
              <li className="text-gray-800">Regularly inspect your vehicle for maintenance needs, such as tire pressure and oil levels.</li>
            </ul>
          </section>

          {/* Additional Resources */}
          <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Additional Resources</h3>
            <p className="text-gray-700 mb-4">
              To further enhance your driving skills, consider exploring additional resources such as:
            </p>
            <ul className="list-disc pl-6 space-y-4">
              <li className="text-gray-800">Online driving courses and tutorials.</li>
              <li className="text-gray-800">Books and articles on advanced driving techniques.</li>
              <li className="text-gray-800">Local driving clubs and workshops.</li>
            </ul>
          </section>
        </div>
      </div>
    </>
  );
};

export default ImproveWithUs;
