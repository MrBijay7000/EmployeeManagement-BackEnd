const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

router.post("/signup", usersControllers.signUp);

router.post("/login", usersControllers.login);

router.get("/", usersControllers.getUsers);

router.get("/viewTask", usersControllers.viewTask);

router.get("/:tid", usersControllers.viewTaskById);

router.post("/applyForLeave", usersControllers.applyForLeave);

router.use(checkAuth);

module.exports = router;
