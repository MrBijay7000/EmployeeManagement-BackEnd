const express = require("express");
const usersControllers = require("../controllers/users-controllers");
const router = express.Router();

router.post("/signup", usersControllers.signUp);

router.post("/login", usersControllers.login);

router.get("/", usersControllers.getUsers);

router.get("/viewTask", usersControllers.viewTask);

router.get("/:tid", usersControllers.viewTaskById);

module.exports = router;
