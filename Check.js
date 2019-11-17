const http = require("http");
const hostname = "127.0.0.1";
const port = 1338;

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
var ejs = require("ejs");

//var routes = require("./routes");
//var testtable = require("./routes/testtable");
//var bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false}));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//app.use(express.static(path.join(__dirname, "public")));

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
    res.sendFile(path.join(__dirname + "/Check.html"));
});

app.post("/Check", function(req, res) {
    var name = req.body.name;
    var year = req.body.year;
    var V_NV = req.body.V_NV;

    con.query("SELECT Year=?, V_NV=? FROM Mark", [year, V_NV], function(
        err,
        res
    ) {
        if (err) throw err;
        else {
            app.get("/Check", function(req, res) {
                res.render("views/Check", {
                    title: "List",
                    data: rows
                });
            });
        }
        //console.log("1 record inserted");
        //res.write(year, V_NV);
        //console.log(rows[0]);
        //return callback(rows);
        //res.end();
    });

    res.end();
});

app.listen(1338);
