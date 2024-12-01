const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    isVehicleRegistered: {
      type: Boolean,
    },
    vehicleNumber: {
      type: String,
      required: false,
    },
    dlNumber: {
      type: String,
      required: true,
    },
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
