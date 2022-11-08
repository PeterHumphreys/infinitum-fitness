require("dotenv").config();
const session = require("express-session");
const cors = require("cors");
const express = require("express");
const path = require("path");
const app = express();

//All Middleware Below
//CORS
app.use(cors());

//Session
app.use(session(
    {
        secret : "random string here",
        resave : false,
        saveUninitialized : false
    }
));

//Allows us to parse json bodies in the request object
app.use(express.json()); 

//Set the port we wish our server to run on
app.set("port", process.env.PORT || 5000);

//Templating Engine
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');

//Handle routing in separate file
app.use("/", require("./routes"));

//Fixes MIMETYPE error
app.use(express.static(__dirname));

//Run server
app.listen(app.get("port"), function() 
{
    console.log("\n\n\n*\n*\n*\nServer started on port " + app.get("port"));
});