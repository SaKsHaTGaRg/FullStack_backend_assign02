//express and mongo db setup
const express = require("express");
const mongoose = require("mongoose"); 
const dotenv = require("dotenv");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// CORS — MUST BE BEFORE ROUTES!!!
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (
//         !origin ||
//         origin.includes("localhost") ||
//         /vercel\.app$/.test(origin)
//       ) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//   })
// );

app.use(
  cors({
    origin: [
      "https://101512083-comp-3123-assignment2-fro-three.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  dbName: "assign01",
});

// test route
app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// API routes WITH PREFIX
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/employee", require("./routes/employeeRoutes"));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
