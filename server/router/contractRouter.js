const express = require("express");
const router = express.Router();
const { faucet } = require("../controller/contractController");

router.post("/ethFaucet", faucet);

module.exports = router;
