const express = require('express');
const { registerUser} = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');
const router = express.Router(); // create a mini router , so server.js is clean

// POST /api/v1/user/signup
router.post('/signup', registerUser);

// POST /api/v1/user/login
router.post('/login', loginUser);
module.exports = router; // make it available to server.js
