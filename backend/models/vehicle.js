const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicleNumber: { type: String, required: true },
  model: { type: String, required: true },
  registrationDate: { type: Date, required: true },
  // Additional fields as per your requirements
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
