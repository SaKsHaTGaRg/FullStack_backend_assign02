// Employee controller: Handles CRUD + Search operations for employee records

const StaffRecord = require("../models/Employee"); // Renamed local variable only

// FETCH ALL EMPLOYEES
const fetchAllStaff = async (req, res) => {
  try {
    // Pull every staff member from DB
    const staffList = await StaffRecord.find();

    // Format output for frontend
    return res.status(200).json(
      staffList.map((item) => ({
        employee_id: item._id,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        position: item.position,
        department: item.department,
        salary: item.salary,
        dateOfJoining: item.dateOfJoining,
        profileImage: item.profileImage || null,
      }))
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// FETCH EMPLOYEE BY ID
const fetchStaffById = async (req, res) => {
  try {
    // Find employee by MongoID
    const foundStaff = await StaffRecord.findById(req.params.eid);

    if (!foundStaff) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    return res.status(200).json(foundStaff);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// REGISTER/CREATE EMPLOYEE
const addNewStaff = async (req, res) => {
  try {
    const payload = req.body;

    // Attach image if uploaded
    if (req.file) {
      payload.profileImage = req.file.filename;
    }

    const staffEntry = new StaffRecord(payload);
    const savedRecord = await staffEntry.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee_id: savedRecord._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// UPDATE EMPLOYEE DETAILS
const modifyStaff = async (req, res) => {
  try {
    const updatePayload = req.body;

    // Update profile image if new file uploaded
    if (req.file) {
      updatePayload.profileImage = req.file.filename;
    }

    const updatedRecord = await StaffRecord.findByIdAndUpdate(
      req.params.eid,
      updatePayload,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE EMPLOYEE
const removeStaff = async (req, res) => {
  try {
    const deleted = await StaffRecord.findByIdAndDelete(req.params.eid);

    if (!deleted) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    return res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// SEARCH EMPLOYEES USING QUERY PARAMS
const filterStaff = async (req, res) => {
  try {
    const { department, position } = req.query;

    // Build dynamic search filter
    const searchFilter = {};
    if (department) searchFilter.department = department;
    if (position) searchFilter.position = position;

    const filteredList = await StaffRecord.find(searchFilter);

    if (!filteredList || filteredList.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No employees found matching criteria",
      });
    }

    // Format the response
    return res.status(200).json(
      filteredList.map((item) => ({
        employee_id: item._id,
        first_name: item.first_name,
        last_name: item.last_name,
        email: item.email,
        position: item.position,
        department: item.department,
        salary: item.salary,
        dateOfJoining: item.dateOfJoining,
        profileImage: item.profileImage || null,
      }))
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// Export controllers
module.exports = {
  getAllEmployees: fetchAllStaff,
  getEmployeeById: fetchStaffById,
  createEmployee: addNewStaff,
  updateEmployee: modifyStaff,
  deleteEmployee: removeStaff,
  searchEmployees: filterStaff,
};
