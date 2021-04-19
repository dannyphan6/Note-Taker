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

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")));

app.get("/api/notes/:id", (req, res) => {
    let storeNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    console.log("storeNotes", storeNotes);
    console.log(req.params.id);
    res.json(storeNotes[Number(req.params.id)]);
});

app.post("/api/notes", (req, res) => {
    let storeNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let incomingNote = req.body;
    console.log(incomingNote);
    let incomingNoteId = storeNotes.length.toString();
    storeNotes.push(incomingNote)
    fs.writeFileSync("./db/db.json", JSON.stringify(storeNotes));
    res.json(storeNotes)
});

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
