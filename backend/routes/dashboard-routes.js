const express = require("express");
const router = express.Router();
const { getChallan ,regiterUser } = require("../controllers/dashboard-controller");
// const validateToken = require("../middlewares/validateTokenHandler");

router.post("/challan", getChallan);

module.exports = router;