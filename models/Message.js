const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const MessageSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true
    }
});


module.exports = Course = mongoose.model("message", MessageSchema);