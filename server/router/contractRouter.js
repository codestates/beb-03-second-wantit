const express = require("express");
const router = express.Router();
const {
  faucet,
  getBalance,
  deploy,
  balanceOf,
} = require("../controller/contractController");

router.post("/faucet", faucet);
router.get("/getBalance", getBalance);
router.post("/deploy", deploy);
router.get("/balanceOf", balanceOf);
module.exports = router;
