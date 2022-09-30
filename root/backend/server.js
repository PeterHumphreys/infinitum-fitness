require("dotenv").config();
const session = require("express-session");
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(cors());

//Session
app.use(session(
    {
        secret : "random string here",
        resave : false,
        saveUninitialized : false
    }
));

// parse json bodies in the request object
app.use(express.json()); 

app.set("port", process.env.PORT || 4000);
app.get("/test", (req, res)=>
{
  console.log("Test path");
  res.send("Test")
})
// app.set("views", path.join(__dirname, "views"));
// app.set('view engine', 'ejs');

//Handle routing
app.use("/", require("./routes"));


//No idea what this does, but it seemed to solve the MIMETYPE bs error
//app.use(express.static(__dirname));


app.listen(app.get("port"), function() 
{
    console.log("\n\n\n*\n*\n*\nServer started on port " + app.get("port"));
});