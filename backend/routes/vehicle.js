const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); // Assuming you have a Vehicle model

// Route to check if the user owns a vehicle
router.post('/check-vehicle', async (req, res) => {
  const { uid } = req.body;

  try {
    // Check if the user owns a vehicle by querying the Vehicle collection
    var vehicle = await User.findOne({ _id: uid });
    vehicle=vehicle.vehicleNumber;
    if (vehicle==='') {
      // User does not own a vehicle
      return res.status(404).json({ ok: false, message: 'User does not own a vehicle' });
    }

    // User owns a vehicle
    res.status(200).json({ ok: true, message: 'User owns a vehicle' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Error checking vehicle ownership', error: error.message });
  }
});

module.exports = router;
