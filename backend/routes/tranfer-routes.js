const express = require("express");
const router = express.Router();
const { transferControl } = require("../controllers/transfer-controller");

router.post("/transfer-control", transferControl);

module.exports = router;