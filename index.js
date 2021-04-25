require('dotenv').config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const auth = require("./routes/auth");
const courses = require("./routes/courses");
const messages = require("./routes/messages");

const PORT = process.env.PORT || 5000;

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);


//delete later
const User = require("./models/User");
const Course = require("./models/Course");
const Message = require("./models/Message");
const {
    log
} = require('console');

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
app.use("/messages", messages)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

io.on('connection', (socket) => {
    //socket.join("24068");
    //console.log(socket.id);
    // socket.on('chat message', (msg) => {
    //     socket.broadcast.emit("msg: " + msg);
    // });


    socket.on('subscribe', (data) => {
        console.log("crn: " + data);
        socket.join(data);
    });

    socket.on("test", (client, callback) => {
        //console.log(client);
        callback({
            status: "ok"
        });
    })

    socket.on('send-post', (post) => {
        User.findOne({
            email: post.email
        }, function (err, user) {
            if (err) {
                console.log(err);
            } else {
                const newMessage = new Message({
                    sender: user._id,
                    body: post.body,
                    date: post.obj.date
                })
                Course.updateOne({
                    crn: post.crn
                }, {
                    $push: {
                        messages: newMessage
                    }
                }).catch((err) => console.log(err));
                socket.to(post.crn).emit("recieve", {
                    obj: post.obj,
                    crn: post.crn
                })
            }
        })

    });
});



http.listen(PORT, err => {
    if (err) {
        return console.log("ERROR", err)
    }
    console.log(`Listening on port ${PORT}`);
});