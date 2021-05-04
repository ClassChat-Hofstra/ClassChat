const express = require('express');
const recLoader = require("./recLoader");
let router = express.Router();

const Course = require("../models/Course");
const e = require('cors');

// const entityInputs = [ //sample input
//     "Do you guys have any idea how to code in JavaScript or React i'm still learning and not that good at it.",
//     "I'm still learning how to implement a linked list in java"
// ];

// recLoader(entityInputs).then(results => {
//     console.log(results);
// });

router.post("/newrec", (req, res) => {
    // Course.updateOne({
    //     crn: "24068"
    // }, {
    //     $push: {
    //         recommendations: "asdf"
    //     }
    // }, function (err, course) {
    //     if (err) {
    //         console.log(err);
    //     } else {
    //         res.send(course)
    //     }
    // })
    recLoader(req.body.messages).then(results => {
        Course.updateOne({
            crn: req.body.crn
        }, {
            $set: {
                recommendations: results
            }
        }, function (err) {
            if (err) {
                console.log(err);
            } else {
                res.send(results);
            }
        })
        //res.send(results);
    }).catch(e => {
        console.log(e);
    })

})

module.exports = router;