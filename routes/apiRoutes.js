const fs = require("fs");
const path = require("path")
const uuid = require('uuid');

module.exports = app => {
    app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "../db/db.json")));
    
    app.get("/api/notes/:id", (req, res) => {
        const saveNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
    
        // Takes the response and returns a valid JSON object back to the client
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

    app.delete("/api/notes/:id", (req, res) => {
        let deleteNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

        // When route is ran, front end will give the parameter an id 
        const noteId = req.params.id;

        // Filters through the array of deleteNotes and tries to match the front end note to the unique id assigned on line 22
        // IF it does match, then remove it from the array
        let filterNotes = deleteNotes.filter((note) => noteId !== note.id);

        deleteNotes = filterNotes;
    
        // Update the array with the selected note removed
        fs.writeFileSync("./db/db.json", JSON.stringify(filterNotes));
    
        res.end();
    });
};
