// Employee controller: CRUD operations for employees

const Employee = require("../models/Employee");

// GET ALL EMPLOYEES
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json(
      employees.map((emp) => ({
        employee_id: emp._id,
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
        dateOfJoining: emp.dateOfJoining,
        profileImage: emp.profileImage || null  
      }))
    );
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// GET EMPLOYEE BY ID
const getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.eid);

    if (!emp) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    return res.status(200).json(emp);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// CREATE EMPLOYEE
const createEmployee = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.profileImage = req.file.filename;
    }

    const newEmp = new Employee(data);
    const savedEmp = await newEmp.save();

    res.status(201).json({
      message: "Employee created successfully",
      employee_id: savedEmp._id
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {
  try {
    const updateData = req.body;

    if (req.file) {
      updateData.profileImage = req.file.filename;
    }

    const updatedEmp = await Employee.findByIdAndUpdate(
      req.params.eid,
      updateData,
      { new: true }
    );

    if (!updatedEmp) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json({ message: "Employee updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {
  try {
    const deletedEmp = await Employee.findByIdAndDelete(req.params.eid);

    if (!deletedEmp) {
      return res.status(404).json({ status: false, message: "Employee not found" });
    }

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

// SEARCH EMPLOYEES
const searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;

    const query = {};
    if (department) query.department = department;
    if (position) query.position = position;

    const employees = await Employee.find(query);

    if (!employees || employees.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No employees found matching criteria",
      });
    }

    return res.status(200).json(
      employees.map(emp => ({
        employee_id: emp._id,
        first_name: emp.first_name,
        last_name: emp.last_name,
        email: emp.email,
        position: emp.position,
        department: emp.department,
        salary: emp.salary,
        dateOfJoining: emp.dateOfJoining,
        profileImage: emp.profileImage || null 
      }))
    );

  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, message: "Server error" });
  }
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  searchEmployees,
};
