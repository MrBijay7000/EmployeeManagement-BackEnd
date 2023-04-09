const express = require("express");
const adminControllers = require("../controllers/admin-controllers");

const router = express.Router();

router.post("/signup", adminControllers.signUp);

router.get("/", adminControllers.getAdminUser);

router.post("/createTask", adminControllers.createTask);

router.get("/taskGiven", adminControllers.taskGiven);

router.delete("/:tid", adminControllers.deleteTask);

router.delete("/employee/:eid", adminControllers.deleteEmployee);

router.get("/viewAllEmployee", adminControllers.viewAllEmployes);

router.get("/employee/:eid", adminControllers.viewEmployeById);

router.post("/addEmployes", adminControllers.createEmployee);

router.get("/viewAllLeave", adminControllers.viewAllLeave);

module.exports = router;
