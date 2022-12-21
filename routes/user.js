const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/userController");
const validateUserInput = require("../middleware/validateUserInput");
router.post("/signup", validateUserInput, signUp);
router.post("/login", logIn);

module.exports = router;
