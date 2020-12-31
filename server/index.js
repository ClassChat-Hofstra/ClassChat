const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();
const PORT = process.env.PORT || 5000;


app.use(bodyParser.urlencoded({
    extended: true
}));

