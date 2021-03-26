const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//const CourseSchema = require("./Course").model("course").schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  courses: [{
    type: Schema.Types.ObjectId,
    ref: "course"
  }]
});

module.exports = User = mongoose.model("user", UserSchema);