const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel'); // Replace with the actual path to your User model

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check if Authorization header exists and is of type Bearer
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]; // Extract token after "Bearer"
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch user data from database
    const user = await User.findById(decoded.id).select('-password'); // Exclude sensitive fields like password

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Attach user data to the request object
    req.user = user;

    // Send all necessary user data
    return res.status(200).json({
      message: 'User authorized',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        isVehicleRegistered: user.isVehicleRegistered,
        vehicleNumber: user.vehicleNumber,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'Not authorized, token failed' });
  }
});

module.exports = { protect };
