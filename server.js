const express = require("express");
const fs = require("fs");
const path = require("path")
const uuid = require('uuid');
const mainDir = path.join(__dirname, "/public")

const app = express();
const PORT = process.env.PORT || 5000;

// Allows you to use all files in the "public" directory
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", (req, res) => res.sendFile(path.join(mainDir, "index.html")));

app.get("/notes", (req, res) => res.sendFile(path.join(mainDir, "notes.html")));

app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "/db/db.json")));

app.get("/api/notes/:id", (req, res) => {
    const saveNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    // 
    res.json(saveNotes[Number(req.params.id)]);
});

app.post("/api/notes", (req, res) => {
    const storeNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    // user data is being accessed from the fetch in index.js 
    const incomingNote = req.body;

    // adding a text field named 'id' to incomingNote and assigning a unique id using uuid
    incomingNote.id = uuid.v4();
    console.log(incomingNote);

    // incomingNote will now have the notes from the user and unique id
    storeNotes.push(incomingNote);
    fs.writeFileSync("./db/db.json", JSON.stringify(storeNotes));

    // Sending a json response back to the client
    res.json(storeNotes);
});



app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
