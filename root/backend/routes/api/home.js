const express = require("express");
const router = express.Router();
const getJsonPlaceholder = require("../../utilities/getJsonPlaceholder");

// --- Discover New Workouts Read  ----------------------------------------
//Temporarily returning JSON test data
router.route("/").get(async (req, res)=> {
  const data = await getJsonPlaceholder("home/home-data.json");
  if (data)
  {
    res.status(200).json(data)
  }
  else
  {
    res.status(500).json({message: "Something went wrong"})
  }
});


module.exports = router;
