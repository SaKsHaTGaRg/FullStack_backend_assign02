// Employee model: this defines the structure of employee documents in MongoDB
const mongoose = require("mongoose");
const EmployeeSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String, required: true },
    salary: { type: Number, required: true },
    dateOfJoining: { type: Date, required: true },
    department: { type: String, required: true },
    profileImage: {
        type: String,
        default: ""
    }

}, { 
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    versionKey: false
});

module.exports = mongoose.model("Employee", EmployeeSchema);