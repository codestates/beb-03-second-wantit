const express = require("express");
const router = express.Router();
const { faucet, getBalance } = require("../controller/contractController");

router.post("/ethFaucet", faucet);
router.get("/getBalance", getBalance);

module.exports = router;
