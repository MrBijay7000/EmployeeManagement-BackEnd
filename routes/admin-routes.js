const express = require("express");
const adminControllers = require("../controllers/admin-controllers");

const router = express.Router();

router.get("/", adminControllers.getAdminUser);

router.post("/createTask", adminControllers.createTask);

router.delete("/:jid", adminControllers.deleteTask);

module.exports = router;
