const express = require("express");
const employeeRouter = express.Router();

const verifySession = require("../middleware/auth");     // Renamed locally only
const fileUpload = require("../middleware/upload");      // Multer middleware

const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require("../controllers/employeeController");

// Fetch all employees
// GET /api/v1/employee/
employeeRouter.get("/", verifySession, getAllEmployees);

// Filter employees by query parameters
// GET /api/v1/employee/search/by
employeeRouter.get("/search/by", verifySession, searchEmployees);

// Fetch a single employee by ID
// GET /api/v1/employee/:eid
employeeRouter.get("/:eid", verifySession, getEmployeeById);

// Create a new employee (with optional profile image)
// POST /api/v1/employee/
employeeRouter.post(
  "/", 
  verifySession, 
  fileUpload.single("profileImage"), 
  createEmployee
);

// Update employee details (with optional new image)
// PUT /api/v1/employee/:eid
employeeRouter.put(
  "/:eid", 
  verifySession, 
  fileUpload.single("profileImage"), 
  updateEmployee
);

// Remove an employee
// DELETE /api/v1/employee/:eid
employeeRouter.delete("/:eid", verifySession, deleteEmployee);

// Export router for server integration
module.exports = employeeRouter;
