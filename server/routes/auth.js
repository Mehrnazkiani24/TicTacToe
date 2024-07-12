const express = require("express");
const { register, login } = require("../controllers/authController");

console.log("Register function:", register);
console.log("Login function:", login);

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
