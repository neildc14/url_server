const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/userController");
const validateUserInput = require("../middleware/validateUserInput");

router.post("/au/signup", validateUserInput, signUp);
router.post("/au/login", logIn);

module.exports = router;
