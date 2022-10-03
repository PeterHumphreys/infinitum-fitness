require("dotenv").config();

const session = require("express-session");
const cors = require("cors");
/*
const mysql = require('mysql2');
const MySQlStore = require("express-mysql-session")(session);


const options = 
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        multipleStatements: true
    };

let sessionConnection = mysql
const sessionStore = new MySQlStore(options);*/

const express = require("express");
const path = require("path");

const app = express();

app.use(cors());

// Middleware Below

//Session
app.use(session(
    {
        secret : "random string here",
        resave : false,
        saveUninitialized : false
    }
));
app.use(express.json()); // parse json bodies in the request object


app.set("port", process.env.PORT || 5000);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

//Goes to the web homepage
app.use("/", require("./routes"));


//No idea what this does, but it seemed to solve the MIMETYPE bs error
app.use(express.static(__dirname));


app.listen(app.get("port"), function() 
{
    console.log("\n\n\n*\n*\n*\nServer started on port " + app.get("port"));
});