const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String
    },
    userId: {
      type: String
    },
    lastDrive: {
        type: Date
    },
    Challan: {
        type: String
    },
    Amount: {
        type: Number
    },
    DCS_Charge: {
        type: Number
    }
  },
  { Timestamp: true }
);

module.exports = mongoose.model("Challan", userSchema);
