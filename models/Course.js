const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

const Schema = mongoose.Schema;

//const UserSchema = require("./User").model("users").schema;

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
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: "user"
    }]
});

CourseSchema.plugin(mongoose_fuzzy_searching, {
    fields: ['crn', 'subject', 'course_number', 'course_section', 'course_title']
})

module.exports = Course = mongoose.model("course", CourseSchema);