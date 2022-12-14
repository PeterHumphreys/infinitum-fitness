const express = require("express");
const router = express.Router();
const getJsonPlaceholder = require("../../utilities/getJsonPlaceholder");

// ---  Read  ----------------------------------------
//Temporarily returning JSON test data
router.route("/").get(async (req, res)=> {
  const data = await getJsonPlaceholder("routines.json");
  if (data)
  {
    res.status(200).json(data)
  }
  else
  {
    res.status(500).json({message: "Something went wrong"})
  }
});

router.route("/").post(async (req, res, next)=> {
  console.log(req.body)
  if (req.body)
  {
    res.status(200).json();
  }
  else
  {
    res.status(500).json({message: "OH MY!!!!"})
  }
});

module.exports = router;
