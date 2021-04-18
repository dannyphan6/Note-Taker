const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 5000;

// Allows you to use all files in the "public directory"
app.use(express.static("public"));


app.use(express.urlencoded({extended: true}));
app.use(express.json());


