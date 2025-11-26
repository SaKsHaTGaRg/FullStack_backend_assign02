// Employee model: Defines structure of employee records stored in MongoDB

const mongoose = require("mongoose");

// Schema for employee data
const staffSchema = new mongoose.Schema(
  {
    first_name:   { type: String, required: true },
    last_name:    { type: String, required: true },
    email:        { type: String, required: true, unique: true },
    position:     { type: String, required: true },
    salary:       { type: Number, required: true },
    dateOfJoining:{ type: Date, required: true },
    department:   { type: String, required: true },

    // Optional profile image
    profileImage: {
      type: String,
      default: "",
    },
  },
  { 
    // Auto-generate timestamps but rename keys
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },

    // Disable "__v"
    versionKey: false,
  }
);

// Export schema as model
module.exports = mongoose.model("Employee", staffSchema);
