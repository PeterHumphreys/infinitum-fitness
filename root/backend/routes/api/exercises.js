const express = require("express");
const router = express.Router();
//const getJsonPlaceholder = require("../../utilities/getJsonPlaceholder");

const exerciseController = require("../../controllers/ExerciseController")

// ---  Read  ----------------------------------------
//Temporarily returning JSON test data
/*router.route("/").get(async (req, res)=> {
  const data = await getJsonPlaceholder("exercises.json");
  if (data)
  {
    res.status(200).json(data)
  }
  else
  {
    res.status(500).json({message: "Something went wrong"})
  }
});*/

router.route("/").get(exerciseController.getAllExercises);


module.exports = router;
