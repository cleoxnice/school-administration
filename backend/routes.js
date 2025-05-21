const express = require("express");
const router = express.Router();
const {
  getAllTeachers,
  createTeacher,
  getUnassignedTeachers,
} = require("./controllers/teacher/teacher.controller");
const {
  getAllClasses,
  createClass,
} = require("./controllers/class/class.controller");

// Teacher routes
router.get("/teachers", getAllTeachers);
router.post("/teachers", createTeacher);
router.get("/teachers/unassigned", getUnassignedTeachers);

// Class routes
router.get("/classes", getAllClasses);
router.post("/classes", createClass);

module.exports = router;
