const jwt = require("jsonwebtoken");

// Authentication middleware: verifies JWT token on protected routes
const verifySession = (req, res, next) => {
  try {
    const rawHeader = req.headers.authorization;

    // Check if authorization header exists
    if (!rawHeader) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    // Token can come as: "Bearer <token>" OR just "<token>"
    const headerParts = rawHeader.split(" ");
    const tokenValue = headerParts.length === 2 ? headerParts[1] : headerParts[0];

    if (!tokenValue) {
      return res.status(401).json({ status: false, message: "Invalid token format" });
    }

    // Validate the JWT token using secret key
    const tokenPayload = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Attach decoded user info to request
    req.user = tokenPayload;

    // Allow access to the next middleware/controller
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ status: false, message: "Unauthorized" });
  }
};

module.exports = verifySession;
