// express and mongodb setup
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ------------------------
// GLOBAL MIDDLEWARE
// ------------------------
app.use(express.json());

// Make uploads folder public
app.use("/uploads", express.static("uploads"));

// ------------------------
// CORS CONFIG (IMPORTANT FOR RENDER + VERCEL)
// ------------------------
app.use(
  cors({
    origin: [
      "https://101512083-comp-3123-assignment2-fro-three.vercel.app", // your frontend URL
      "http://localhost:3000",                                        // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ------------------------
// MONGO DB CONNECTION
// ------------------------
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "assign01",
  })
  .then(() => console.log("🔥 MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ------------------------
// TEST ROUTE
// ------------------------
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// ------------------------
// API ROUTES
// ------------------------
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/employee", require("./routes/employeeRoutes"));

// ------------------------
// START SERVER
// ------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
