const asyncHandler = require("express-async-handler");
const User = require("../models/dashboard-model");
const mongoose = require("mongoose");

const getChallan = asyncHandler(async (req, res) => {
    const userId = req.body.uid;

    try {
        // Fetch the user using the `userId` field in the document
        const challan = await User.find({ userId : userId });

        if (!challan) {
            return res.status(404).json({ msg: "No Challans for this User" });
        }

        res.status(200).json({ ok: true, data : challan });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
});


module.exports = { getChallan };
