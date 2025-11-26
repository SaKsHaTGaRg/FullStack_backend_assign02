// User model: Defines structure of user documents stored in MongoDB

const mongoose = require("mongoose");

// Schema for user accounts
const accountSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Unique username
    email:    { type: String, required: true, unique: true }, // Unique email
    password: { type: String, required: true },               // Encrypted password

    // Auto-generated timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Export schema as model
module.exports = mongoose.model("User", accountSchema);
