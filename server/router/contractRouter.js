const express = require("express");
const router = express.Router();
const {
	faucet,
	getBalance,
	deploy,
	balanceOf,
	transfer,
} = require("../controller/contractController");

router.post("/faucet", faucet);
router.get("/getBalance", getBalance);
router.post("/deploy", deploy);
router.post("/balanceOf", balanceOf);
router.post("/transfer", transfer);
module.exports = router;
