const adminRoutes = require("./All_routes/adminRoutes");
const studentRoutes = require("./All_routes/studentRoutes");
const commonRoutes = require("./All_routes/commonRoutes");
const facultyRoutes = require("./All_routes/facultyRoutes");
const express = require("express");
const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/student", studentRoutes);
router.use("/common", commonRoutes);
router.use("/faculty", facultyRoutes);
module.exports = router;