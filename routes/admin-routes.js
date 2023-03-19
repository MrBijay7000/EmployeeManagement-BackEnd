const express = require("express");
const adminControllers = require("../controllers/admin-controllers");

const router = express.Router();

router.get("/", adminControllers.getAdminUser);

router.post("/createTask", adminControllers.createTask);

router.delete("/:jid", adminControllers.deleteTask);

router.get("/viewAllEmployee", adminControllers.viewAllEmployes);

router.get("/employee/:eid", adminControllers.viewEmployeById);

router.post("/addEmployes", adminControllers.createEmployee);

module.exports = router;
