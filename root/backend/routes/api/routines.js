const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");



// --- Routine Read  ----------------------------------------
//Temporarily returning JSON test data
router.route("/").get((req, res)=> {
  let routines;
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
      routines = JSON.parse(jsonString);
      res.json(routines)
      console.log(routines)
    }
    catch(err)
    {
      console.log(err)
      return;
    }
  });
});


module.exports = router;
