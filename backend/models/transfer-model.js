const mongoose = require("mongoose");

const transferControlSchema = mongoose.Schema(
  {
    shiftedFrom: {
      type: String,
      required: true
    },
    shiftedTo: {
      type: String,
      required: true
    },
    vehicleNumber: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TransferControl", transferControlSchema);
