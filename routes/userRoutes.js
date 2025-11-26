const express = require('express');
const { registerUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');

const userRouter = express.Router(); 
// Using a router keeps server.js neat and organized

// Route: Create a new user account
// POST /api/v1/user/signup
userRouter.post('/signup', registerUser);

// Route: Login existing user
// POST /api/v1/user/login
userRouter.post('/login', loginUser);

// Export router for server.js
module.exports = userRouter;
