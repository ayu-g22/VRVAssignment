import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import NavBar from './Navbar';
import RequestHandler from './User2Modal';

const Settings = () => {
  const [acquaintances, setAcquaintances] = useState([]);
  const [settings, setSettings] = useState({
    username: 'JohnDoe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    acquitances: [],
  });

  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: '/path/to/profile.jpg',
  });

  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [privacy, setPrivacy] = useState({
    showProfilePicture: true,
    showOnlineStatus: false,
  });

  const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility
  const [newAcquaintance, setNewAcquaintance] = useState({ name: '', phoneNumber: '' }); // State to store new acquaintance data

  // State to handle edit mode
  const [editableField, setEditableField] = useState(null);
  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  // Fetch acquaintances data from backend on component mount
  useEffect(() => {
    const uid = localStorage.getItem('userid');
    // Replace with your backend API endpoint
    fetch('http://localhost:4000/api/get-drivers', {
      method: 'POST', // Change to POST method
      headers: {
        'Content-Type': 'application/json', // Set appropriate content type
      },
      body: JSON.stringify({ uid }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.ok) {
          // Assuming data.data is an array of acquaintances
          setAcquaintances(data.data.map((item) => ({
            id: item['id'], // Ensure you have an ID to uniquely identify each acquaintance
            name: item.name,
            phoneNumber: item['phoneNumber'],
          })));
        } else {
          console.error('Failed to fetch data:', data.message);
        }
      })
      .catch((error) => console.error('Error fetching acquaintances:', error));
  }, []);

  // Handler functions
  const handleDeleteAcquaintance = (id) => {
    const uid = localStorage.getItem('userid');
    // Call API to delete acquaintance from backend
    fetch(`http://localhost:4000/api/members/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: uid }),
    })
      .then((response) => {
        if (response.ok) {
          setAcquaintances((prev) =>
            prev.filter((member) => member.id !== id)
          );
        } else {
          console.error('Failed to delete acquaintance.');
        }
      })
      .catch((error) => console.error('Error deleting acquaintance:', error));
  };

  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handlePrivacyChange = (e) => {
    setPrivacy({ ...privacy, [e.target.name]: e.target.checked });
  };

  const handleEditClick = (field) => {
    setEditableField(field);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const toggleEditable = (field) => {
    setIsEditable({ ...isEditable, [field]: !isEditable[field] });
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleAddAcquaintance = () => {
    const uid = localStorage.getItem('userid');
    // Call API to add acquaintance to backend
    fetch('http://localhost:4000/api/add-drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...newAcquaintance, uid }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAcquaintances((prev) => [
          ...prev,
          { id: data.id, ...newAcquaintance }, // Ensure the ID is handled correctly
        ]);
        setNewAcquaintance({ name: '', phoneNumber: '' });
        handleModalClose();
      })
      .catch((error) => console.error('Error adding acquaintance:', error));
  };

  return (
    <>
      <NavBar />
      <div className="bg-gray-100 min-h-screen py-8 px-4">
        <div className="container mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Settings</h1>

          {/* Profile Settings */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Profile Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Name Field */}
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly={!isEditable.name}
                />
                <button
                  onClick={() => toggleEditable('name')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ✏️
                </button>
              </div>

              {/* Email Field */}
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly={!isEditable.email}
                />
                <button
                  onClick={() => toggleEditable('email')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ✏️
                </button>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </section>

          {/* Password Management */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              {/* Current Password Field */}
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Current Password</label>
                <input
                  type="password"
                  name="current"
                  value={password.current}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly={!isEditable.currentPassword}
                />
                <button
                  onClick={() => toggleEditable('currentPassword')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ✏️
                </button>
              </div>

              {/* New Password Field */}
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">New Password</label>
                <input
                  type="password"
                  name="new"
                  value={password.new}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly={!isEditable.newPassword}
                />
                <button
                  onClick={() => toggleEditable('newPassword')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ✏️
                </button>
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Confirm Password</label>
                <input
                  type="password"
                  name="confirm"
                  value={password.confirm}
                  onChange={handlePasswordChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  readOnly={!isEditable.confirmPassword}
                />
                <button
                  onClick={() => toggleEditable('confirmPassword')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ✏️
                </button>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Change Password</button>
            </div>
          </section>

          {/* Notifications */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notification Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label className="block text-gray-700 mb-2">
                <input
                  type="checkbox"
                  name="email"
                  checked={notifications.email}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                Email Notifications
              </label>
              <label className="block text-gray-700 mb-2">
                <input
                  type="checkbox"
                  name="sms"
                  checked={notifications.sms}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                SMS Notifications
              </label>
              <label className="block text-gray-700 mb-2">
                <input
                  type="checkbox"
                  name="push"
                  checked={notifications.push}
                  onChange={handleNotificationChange}
                  className="mr-2"
                />
                Push Notifications
              </label>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </section>

          {/* Privacy Settings */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Privacy Settings</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <label className="block text-gray-700 mb-2">
                <input
                  type="checkbox"
                  name="showProfilePicture"
                  checked={privacy.showProfilePicture}
                  onChange={handlePrivacyChange}
                  className="mr-2"
                />
                Show Profile Picture
              </label>
              <label className="block text-gray-700 mb-2">
                <input
                  type="checkbox"
                  name="showOnlineStatus"
                  checked={privacy.showOnlineStatus}
                  onChange={handlePrivacyChange}
                  className="mr-2"
                />
                Show Online Status
              </label>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">Save Changes</button>
            </div>
          </section>

          {/* Acquaintances */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Acquaintances</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <button
                onClick={handleModalOpen}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4"
              >
                Add Acquaintance
              </button>
            
            </div>
          </section>

          {/* Modal for Adding Acquaintance */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Acquaintance</h2>
                <label className="block mb-4">
                  <span className="text-gray-700">Unique name</span>
                  <input
                    type="text"
                    value={newAcquaintance.name}
                    onChange={(e) => setNewAcquaintance({ ...newAcquaintance, name: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <label className="block mb-4">
                  <span className="text-gray-700">Phone Number</span>
                  <input
                    type="text"
                    value={newAcquaintance.phoneNumber}
                    onChange={(e) => setNewAcquaintance({ ...newAcquaintance, phoneNumber: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </label>
                <div className="flex justify-end">
                  <button
                    onClick={handleModalClose}
                    className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddAcquaintance}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Add
                  </button>
                </div>
                <RequestHandler />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
