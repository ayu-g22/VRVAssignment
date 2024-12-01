import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import logo from '../images/logo.png';
import bg from '../images/bg.png';
import NavHalf from './NavHalf';

const SignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpOrPassword, setOtpOrPassword] = useState('');
  const [isOtp, setIsOtp] = useState(true); // Toggle between OTP and password
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handlePhoneNumberChange = (e) => {
    if(e.target.value>1000000000 && e.target.value<=9999999999 && isOtp )
    toast.success('Press send otp link or use password instead', { position: 'top-center' });
    setPhoneNumber(e.target.value);
  };

  const handleOtpOrPasswordChange = (e) => {
    if(e.target.value>1000000000 && e.target.value<=9999999999 && isOtp )
      toast.success('Press send otp link or use password instead', { position: 'top-center' });
    setOtpOrPassword(e.target.value);
  };

  const handleToggle = () => {
    setIsOtp(!isOtp);
    if (isOtp) {
      handleSendOtp();
    }
  };

  const handleSendOtp = async () => {
    if (!isOtp) {
      setIsOtp(!isOtp);
    }
    try {
      const response = await fetch('http://localhost:5000/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });
      if (response.ok) {
        toast.success('OTP sent successfully!', { position: 'top-center' });
        setIsOtpSent(true);
      } else {
        toast.error('Failed to send OTP', { position: 'top-center' });
      }
    } catch (error) {
      toast.error('Network error', { position: 'top-center' });
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber,
          otpOrPassword,
          isOtp,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        toast.success('Sign in successful!', { position: 'top-center' });
        localStorage.setItem('userid', result?.userId);
        localStorage.setItem('token', result?.token);
        window.location.href = '/dashboard'; // Redirect after successful sign-in
      } else {
        if(result.msg==="User Not Registered"){
          toast.warn("You need to register first. Redirecting you to the registration page.", { position: 'top-center' });
          setTimeout(() => {
            window.location.href = '/register';
          }, 5000);
        }
        else
          toast.error('Sign in error: ' + result.msg, { position: 'top-center' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <NavHalf />
      {/* Toast Container */}
      <ToastContainer />
      <div
        className="flex justify-center items-center min-h-screen bg-gray-100 bg-opacity-70"
        style={{
          backgroundImage: `url(${bg})`, // Set the background image
        }}
      >
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-center">Sign In</h2>
          <form onSubmit={handleSignIn}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otpOrPassword">
                {isOtp ? 'OTP' : 'Password'}
              </label>
              <input
                id="otpOrPassword"
                type={isOtp ? 'text' : 'password'}
                value={otpOrPassword}
                onChange={handleOtpOrPasswordChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handleSendOtp}
                className="text-blue-500 hover:underline text-sm"
              >
                Send OTP
              </button>
            </div>
            <div className="flex items-center justify-between mb-4">
              <button
                type="button"
                onClick={handleToggle}
                className="text-blue-500 hover:underline text-sm"
              >
                {isOtp ? 'Use Password Instead' : 'Use OTP Instead'}
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 bg-gray-800"
            >
              Sign In
            </button>
          </form>
          <div className="flex flex-col items-center pt-2 pb-2 font-bold">OR</div>
          <button
            onClick={() => (window.location.href = '/register')}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
          >
            New Registration
          </button>
        </div>
      </div>
    </>
  );
};

export default SignIn;
