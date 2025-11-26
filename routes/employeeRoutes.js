const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees
} = require("../controllers/employeeController");

// GET all employees
router.get("/", auth, getAllEmployees);

// SEARCH employees
router.get("/search/by", auth, searchEmployees);

// GET employee by ID
router.get("/:eid", auth, getEmployeeById);

// CREATE employee (with image upload)
router.post("/", auth, upload.single("profileImage"), createEmployee);

// UPDATE employee (with image upload)
router.put("/:eid", auth, upload.single("profileImage"), updateEmployee);

// DELETE employee
router.delete("/:eid", auth, deleteEmployee);

module.exports = router;
