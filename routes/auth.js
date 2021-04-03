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

router.post("/currentuser", (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.send(user);
        }
    })
})

module.exports = router;