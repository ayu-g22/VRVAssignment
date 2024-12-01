const asyncHandler = require("express-async-handler");
const TransferControl = require("../models/transfer-model");
const User = require("../models/userModel");
const mongoose = require("mongoose");

const transferControl = asyncHandler(async (req, res) => {
    const { shiftedFrom , shiftedTo } = req.body;
    const shiftedFromObjectId = new mongoose.Types.ObjectId(shiftedFrom);
    
      const user = await User.findById({_id: shiftedFromObjectId});

    if(!user){
        return res.status(404).json({msg : "Invalid User"});
    }

    const vehicleNumber = user.vehicleNumber;

    const config = await TransferControl.create({
        shiftedFrom,
        shiftedTo,
        vehicleNumber: vehicleNumber
      });

      if (config) {
        res.status(201).json({ msg: "Transfered Added", ok: true });
      } else {
        res.status(400).json({ msg: "Failed to Transfer Control" });
      }
});


module.exports = { transferControl };
