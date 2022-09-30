const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// --- Exercise Read  ----------------------------------------
//Temporarily returning JSON test data
router.route("/").get((req, res)=> {
  let exercises;
  console.log("In Exercises")
  //Get JSON test data
  fs.readFile((path.resolve(__dirname, '../../data/routines.json')), (err, jsonString)=>
  {
    if (err)
    {
      console.log(err)
      return; 
    }
    try
    {
      exercises = JSON.parse(jsonString);
      res.json(exercises)
      console.log(exercise)
    }
    catch(err)
    {
      console.log(err)
      return;
    }
  });
});


module.exports = router;
