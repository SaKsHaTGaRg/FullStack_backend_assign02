const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ status: false, message: "No token provided" });
    }

    // Accept both formats:
    // "Bearer <token>" or just "<token>"
    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : parts[0];

    if (!token) {
      return res.status(401).json({ status: false, message: "Invalid token format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ status: false, message: "Unauthorized" });
  }
};

module.exports = auth;
