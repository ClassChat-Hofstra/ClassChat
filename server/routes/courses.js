const express = require('express');

//Load User Model
const Course = require("../models/Course");

let router = express.Router();

router.get("/allcourses", (req, res) => {
    Course.find({})
        .then((data) => {
            res.send(data);
        })

});

module.exports = router;