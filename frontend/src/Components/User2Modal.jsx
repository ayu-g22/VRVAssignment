import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';

const RequestHandler = () => {
  const [socket, setSocket] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requestDetails, setRequestDetails] = useState(null);
  const [shiftedFromUserName, setShiftedFromUserName] = useState(''); // Store the username

  useEffect(() => {
    const uid = localStorage.getItem('userid');
    
    // Initialize socket connection
    const newSocket = io('http://localhost:4001', {
      query: { userId: uid },
      withCredentials: true,
      transports: ['websocket', 'polling']
    });

    setSocket(newSocket);

    // Listen for an incoming request
    newSocket.on('receiveRequest', async (data) => {
      setRequestDetails(data);
      setIsModalOpen(true); // Open the modal when a request is received
      
      // Fetch the username corresponding to shiftedFrom userId
      if (data.shiftedFrom) {
        await fetchUserName(data.shiftedFrom);
      }
    });

    // Clean up socket connection on component unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const fetchUserName = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
      if (response.data && response.data.name) {
        setShiftedFromUserName(response.data.name + ' ('+ response.data.phone + ')');
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  const handleAccept = () => {
    if (socket && requestDetails) {
      // Emit acceptance response
      socket.emit('response', {
        recipientId: requestDetails.recipientId,
        shiftedFrom: requestDetails.shiftedFrom,
        isAccepted: true,
      });

      setIsModalOpen(false); // Close the modal
    }
  };

  const handleDecline = () => {
    if (socket && requestDetails) {
      // Emit decline response
      socket.emit('response', {
        recipientId: requestDetails.recipientId,
        shiftedFrom: requestDetails.shiftedFrom,
        isAccepted: false,
      });

      setIsModalOpen(false); // Close the modal
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4 text-black">Transfer Request</h2>
            <p className="mb-4 text-black">
              You have received a transfer request from {shiftedFromUserName ? shiftedFromUserName : `User ${requestDetails.shiftedFrom}`}.
            </p>
            <div className="flex justify-between">
              <button
                onClick={handleAccept}
                className="bg-green-500 text-white p-2 rounded"
              >
                Accept
              </button>
              <button
                onClick={handleDecline}
                className="bg-red-500 text-white p-2 rounded"
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestHandler;
