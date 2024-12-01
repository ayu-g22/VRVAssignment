import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { io } from 'socket.io-client';
import 'react-toastify/dist/ReactToastify.css';


const Modal = ({ isOpen, onClose, options }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem('userid');
    // Initialize socket connection
    const newSocket = io('http://localhost:4001', {
      query: { userId: uid },
      withCredentials: true,
      transports: ['websocket', 'polling'],
    });
    setSocket(newSocket);

    // Listen for an incoming request
    newSocket.on('receiveRequest', (data) => {
      const { shiftedFrom, recipientId, requestMessage } = data;
      // Show the modal with "Accept" or "Decline" buttons
      handleIncomingRequest(shiftedFrom, recipientId, requestMessage);
    });

    // Clean up socket connection on component unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  const handleConfirmClick = async () => {
    if (selectedOption) {
      try {
        const shiftedFrom = localStorage.getItem('userid');
        const shiftedTo = selectedOption;
        // Send the selected option to the backend API
        const response = await fetch('http://localhost:4000/api/transfer/transfer-control', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shiftedFrom, shiftedTo }),
        });

        const result = await response.json();
        if (result.ok) {
          // Emit the selected option using socket.io
          if (socket) {
            socket.emit('transfer', {
              recipientId: selectedOption,
              shiftedFrom,
              requestMessage: "Do you want to accept?",
            });
          }

          toast.success('Data updated successfully!', { position: 'top-center' });
        } else {
          toast.error(`Failed to update data: ${result.message}`, { position: 'top-center' });
        }
      } catch (error) {
        toast.error(`Error updating data: ${error.message}`, { position: 'top-center' });
      } finally {
        onClose();
      }
    } else {
      toast.warning('Please select an option!', { position: 'top-center' });
    }
  };

  const handleIncomingRequest = (shiftedFrom, recipientId, requestMessage) => {
    // Display a modal to the recipient user
    const isAccepted = window.confirm(`${requestMessage} from user ${shiftedFrom}.`);

    // Emit acceptance or rejection response
    if (socket) {
      socket.emit('response', {
        recipientId,
        shiftedFrom,
        isAccepted,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h1 className="text-center text-xl font-bold mb-4 text-black">Transfer your keys</h1>
        <h2 className="text-md font-bold mb-4 text-black">Q1: Who is driving the car?</h2>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="border p-2 rounded mb-4 w-full text-black"
        >
          <option value="">Select...</option>
          {options.map((option, index) => (
            <option key={index} value={option['_id']}>{option['name']} - {option['phoneNumber']}</option>
          ))}
        </select>
        <button
          onClick={handleConfirmClick}
          className="bg-blue-500 text-white p-2 rounded mr-2 text-black"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="bg-gray-500 text-white p-2 rounded text-black"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
