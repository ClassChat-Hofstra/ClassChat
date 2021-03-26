require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const auth = require("./routes/auth");
const courses = require("./routes/courses");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));

app.use("/courses", courses);
app.use("/auth", auth);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


app.listen(PORT, err => {
    if (err) {
        return console.log("ERROR", err)
    }
    console.log(`Listening on port ${PORT}`);
});