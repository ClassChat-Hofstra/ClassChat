const express = require('express');

const User = require("../models/User");
const Course = require("../models/Course");


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
        })
        .populate("courses")
        .then(user => {
            res.send(user.courses);
        })
        .catch(error => {
            console.log(error);
        })

})

router.post("/addcourse", (req, res) => {
    User.findOneAndUpdate({
            email: req.body.email
        }, {
            $push: {
                courses: req.body.course.course_object._id
            }
        }, {
            new: true
        })
        .then((user) => {
            Course.updateOne({
                    crn: req.body.course.crn
                }, {
                    $push: {
                        users: user._id
                    }
                })
                .catch((e) => console.log(e));

            res.sendStatus(200);
        })
        .catch((e) => console.log(e));
});

router.post("/removecourse", (req, res) => {
    User.findOneAndUpdate({
            email: req.body.email
        }, {
            $pull: {
                courses: req.body.course.course_object._id

            }
        }, {
            new: true
        })
        .then((user) => {
            Course.updateOne({
                    crn: req.body.course.crn
                }, {
                    $pull: {
                        users: user._id
                    }
                })
                .catch((e) => console.log(e));
            res.sendStatus(200);
        })
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