const express = require('express');

let router = express.Router();

//Load User Model
const User = require("../models/User");

router.post("/register", (req) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email
    });
    newUser.save();
});

module.exports = router;