const express = require("express");
const fs = require("fs");
const path = require("path")
const htmlDir = path.join(__dirname, "/public")

const app = express();
let PORT = process.env.PORT || 5000;

// Allows you to use all files in the "public directory"
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/notes", (req, res) => res.sendFile(path.join(htmlDir, "notes.html")));

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
