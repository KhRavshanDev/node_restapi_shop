const express = require("express");
const router = express();
const mongoose = require("mongoose");

const User = require("../models/user.js")

router.post("/signup", (req, res, next) => {
    const user = new User({
        _id: 
    })
})

module.exports = router;