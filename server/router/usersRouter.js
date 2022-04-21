const express = require("express");
const router = express.Router();
const { login, signup, findById } = require("../controller/usersController");

router.post("/login", login);

router.post("/signup", signup);

router.get("/:userid", findById);

module.exports = router;
