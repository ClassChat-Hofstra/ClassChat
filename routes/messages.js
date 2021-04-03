const express = require('express');

const User = require("../models/User");
const Course = require("../models/Course");
const Message = require("../models/Message");

let router = express.Router();

router.post("/newmessage", (req, res) => {
    console.log(req.body);
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            const newMessage = new Message({
                sender: user._id,
                body: req.body.body
            })
            Course.updateOne({
                crn: req.body.crn
            }, {
                $push: {
                    messages: newMessage
                }
            }).catch((err) => console.log(err));
            res.sendStatus(200);
        }
    })
})

module.exports = router;