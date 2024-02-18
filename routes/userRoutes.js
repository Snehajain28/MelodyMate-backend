
const express = require('express');
const { registerUser } = require('../controller/registerUser');
const { loginUser } = require('../controller/loginUser');
const { forgotPassword } = require('../controller/forgetPassword');
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);


module.exports = router;