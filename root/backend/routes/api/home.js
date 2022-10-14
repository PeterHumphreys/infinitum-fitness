const express = require("express");
const router = express.Router();
const getJsonPlaceholder = require("../../utilities/getJsonPlaceholder");

// --- Discover New Workouts Read  ----------------------------------------
//Temporarily returning JSON test data
router.route("/discover-new-workouts").get(async (req, res)=> {
  const data = await getJsonPlaceholder("home/discover-new-workouts.json");
  if (data)
  {
    res.status(200).json(data)
  }
  else
  {
    res.status(500).json({message: "Something went wrong"})
  }
});

// --- Store Items Read  ----------------------------------------
//Temporarily returning JSON test data
router.route("/store-items").get(async (req, res)=> {
  const data = await getJsonPlaceholder("home/store-items.json");
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
