require('dotenv').config();
const express = require("express");
const router = express();
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/user.js")
const UserController = require("../controllers/user.js")

router.post("/signup", UserController.register);
router.post('/login', UserController.login);

router.delete("/:userId", (req, res, next) => {
    User.findByIdAndDelete({ _id: req.params.userId })
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted',
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;