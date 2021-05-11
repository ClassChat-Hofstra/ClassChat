const express = require('express');

let router = express.Router();

//Load User Model
const User = require("../models/User");

router.post("/updateNameAndEmail", (req, res) => {
    User.updateOne({
        email: req.body.email
    }, {
        $set: {
            name: req.body.name,
            email: req.body.newEmail
        }
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
})

router.post("/getManyUsers", (req, res) => {
    User.find().where("_id").in(req.body.userIDs).exec((err, users) => {
        if (err) {
            console.log(err);
        } else {
            res.send(users);
        }
    })
})

module.exports = router;