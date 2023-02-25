const express = require("express");
const adminControllers = require("../controllers/admin-controllers");

const router = express.Router();

router.get("/", adminControllers.getAdminUser);

module.exports = router;
