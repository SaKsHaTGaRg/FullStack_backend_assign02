// User controller: Handles signup & login processes

const Account = require("../models/User"); // renamed locally only
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER NEW USER
const signupAccount = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if username or email already exists
    const duplicate = await Account.findOne({ $or: [{ username }, { email }] });
    if (duplicate) {
      return res.status(400).json({ message: "Username or email already exists" });
    }

    // Hash the password before storing
    const saltValue = await bcrypt.genSalt(10);
    const securePass = await bcrypt.hash(password, saltValue);

    // Create new account entry
    const userDocument = new Account({
      username,
      email,
      password: securePass,
    });

    await userDocument.save();

    res.status(201).json({
      message: "User registered successfully",
      user_id: userDocument._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// LOGIN EXISTING USER
const authenticateAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Must include either username or email + password
    if ((!username && !email) || !password) {
      return res.status(400).json({
        message: "Username/email and password are required",
      });
    }

    // Find user based on username or email
    const accountMatch = await Account.findOne({
      $or: [{ username }, { email }],
    });

    if (!accountMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid username/email or password.",
      });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, accountMatch.password);
    if (!passwordMatch) {
      return res.status(400).json({
        status: false,
        message: "Invalid username/email or password.",
      });
    }

    // Generate auth token
    const sessionToken = jwt.sign(
      {
        id: accountMatch._id,
        username: accountMatch.username,
        email: accountMatch.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      message: "Login successful",
      jwt_token: sessionToken,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: "Server error" + err.message,
    });
  }
};

// Export functionality
module.exports = {
  registerUser: signupAccount,
  loginUser: authenticateAccount,
};
