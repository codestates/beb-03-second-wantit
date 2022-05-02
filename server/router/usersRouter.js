const express = require("express");
const router = express.Router();
const {
	login,
	signup,
	findById,
	checkid,
} = require("../controller/usersController");

router.post("/login", login);

router.post("/signup", signup);

router.get("/:userid", findById);

router.post("/checkid", checkid);

module.exports = router;
