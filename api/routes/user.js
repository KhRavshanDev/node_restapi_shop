require('dotenv').config();
const express = require("express");
const router = express();

const UserController = require("../controllers/user.js")

router.post("/signup", UserController.register);
router.post('/login', UserController.login);
router.delete("/:userId", UserController.deleteUser);

module.exports = router;