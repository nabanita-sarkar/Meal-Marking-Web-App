const http = require("http");

const hostname = "127.0.0.1";
const port = 1337;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    //res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

var express = require("express");
var mysql = require("mysql");
var app = express();
var path = require("path");
//var bodyParser = require('body-parser');

//app.use(bodyParser.json());

//app.use(bodyParser.urlencoded({ extended: false}));
//app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded());
//app.use(express.static(path.join(__dirname, '/Mark.css')));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_new_password",
    database: "HostelDB"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/Mark.html"));
});

app.post("/Mark", function(req, res) {
    var name = req.body.name;
    var year = req.body.year;
    var V_NV = req.body.V_NV;

    //res.write(path.join(__dirname+'/index.html'));

    con.query(
        "INSERT INTO Mark(Name, Year, V_NV) VALUES(?,?,?)",
        [name, year, V_NV],
        function(err) {
            if (err) throw err;
            console.log("1 record inserted");

            //console.log(rows[0]);
            //return callback(rows);
            //res.end();
        }
    );

    res.end();
});

app.listen(1337);
