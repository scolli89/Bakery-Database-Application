const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const bakery = require('./routes/bakery.route');

const mysql = require('mysql');
const sqlport = 3306;
const port= 5000;
const urlBase = "/bake";

var db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "bob",
  password: "123456789",
  database: 'bakery'
});

db.connect((err) => { if (err) { throw err; } console.log('Connected to database'); });
global.db = db;

global.db = db;

app.set('port', process.env.port || port); //comment missing
app.set('views', __dirname + '/views'); //comment missing
app.set('view engine', 'ejs'); //comment missing
app.use(bodyParser.urlencoded({ extended: false })); //comment missing
app.use(bodyParser.json()); //comment missing
app.use(express.static(path.join(__dirname, 'public'))); //comment missing
app.use(fileUpload()); //comment missing

//comment this section
app.use("/bake",bakery);

// set the app to listen on the port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});