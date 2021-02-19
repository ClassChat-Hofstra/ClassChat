const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    crn: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    course_number: {
        type: String,
        required: true
    },
    course_section: {
        type: String,
        required: true
    },
    course_title: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("course", CourseSchema);