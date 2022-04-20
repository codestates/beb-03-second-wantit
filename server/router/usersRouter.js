const express = require("express");
const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.get("/:userid", findById);

module.exports = router;
