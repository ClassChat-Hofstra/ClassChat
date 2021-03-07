const express = require('express');

const Course = require("../models/Course");
const User = require("../models/User");

const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

let router = express.Router();

router.get("/allcourses", (req, res) => {
    Course.find({})
        .then((data) => {
            res.send(data);
        })

});

router.post("/currentcourses", (req, res) => {
    User.findOne({
        email: req.body.email
    }, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            res.send(user.courses);
        }
    })
})

router.post("/addcourse", (req, res) => {
    User.updateOne({
            email: req.body.email
        }, {
            $push: {
                courses: req.body.course
            }
        })
        .then(res.sendStatus(200))
        .catch((e) => console.log(e));
});

router.post("/removecourse", (req, res) => {
    User.updateOne({
            email: req.body.email
        }, {
            $pull: {
                courses: {
                    crn: req.body.crn
                }
            }
        })
        .then(res.sendStatus(200))
        .catch((e) => console.log(e));
})

router.post("/searchcourses", async (req, res) => {
    try {
        const courseResults = await Course.fuzzySearch(req.body.query);
        res.send(courseResults);
    } catch (e) {
        console.log(e);
    }
})

module.exports = router;