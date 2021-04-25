const fs = require("fs");
const path = require("path")
const uuid = require('uuid');

module.exports = app => {
    app.get("/api/notes", (req, res) => res.sendFile(path.join(__dirname, "../db/db.json")));
    
    app.get("/api/notes/:id", (req, res) => {
        const saveNotes = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
    
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

    app.delete("/api/notes/:id", (req, res) => {
        const deleteNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
        fs.writeFileSync("./db/db.json", JSON.stringify(deleteNotes));
    
        res.json(deleteNotes);
    });
}
