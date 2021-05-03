const express = require('express');
const recLoader = require("./recLoader");
let router = express.Router();

const entityInputs = [
    "Do you guys have any idea how to code in JavaScript or React i'm still learning and not that good at it.",
    "I'm still learning how to implement a linked list in java"
];

recLoader(entityInputs).then(results => {
    console.log(results);
});