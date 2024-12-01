const asyncHandler = require("express-async-handler");
const TransferControl = require("../models/transfer-model");
const User = require("../models/userModel");
const mongoose = require("mongoose");


const getUserName = asyncHandler(async (req, res) =>{
    const { userId } = req.params;
  
    try {
      // Find user by ID in the database
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Send user details as a response
      res.json({
        name: user.name,
        phone: user.phoneNumber,
        // Add other details as needed
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

  module.exports = { getUserName };