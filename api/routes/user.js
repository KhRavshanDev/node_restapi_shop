require('dotenv').config();
const express = require("express");
const router = express();
const checkAuth = require("../middleware/check-auth.js");

const UserController = require("../controllers/user.js")

router.post("/signup", UserController.register);
router.post('/login', UserController.login);
router.delete("/:userId", checkAuth, UserController.deleteUser);

module.exports = router;