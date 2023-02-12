//vars
const express = require('express');
//require json file
const db = require('./db/db.json')
const PORT = 3001;

// initialize
const app = express();
app.get('/', (req, res) => res.send('Visit http://localhost:3001/api'));


