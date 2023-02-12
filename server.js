const express = require('express');
const path = require('path');
const dbData = require('./db/db.json');
const uuid = require("uuid");
const fs = require("fs");

let notes = dbData;

const PORT = 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/notes', (req, res) => res.json(notes));

app.post("/api/notes", (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
  
    fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
      if (err) throw err;
      res.send(newNote);
    });
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
