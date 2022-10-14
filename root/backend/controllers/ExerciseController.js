const Exercise = require("../models/Exercise/Exercise");
const ExerciseEquipment = require("../models/Exercise/ExerciseEquipment");
const ExercisePrimaryMuscle = require("../models/Exercise/ExercisePrimaryMuscle");
const ExerciseSecondaryMuscle = require("../models/Exercise/ExerciseSecondaryMuscle");
const ExerciseImageBridge = require("../models/Image/ExerciseImageBridge");

const DEFAULT_IMAGE_ID = 1;
const TABLE_NAME = "exercise";

//Need to change to fit express
exports.saveNewExercise = async (exercise) =>
{
  //Save exercise 
  await exercise.saveEntry();
  
  //Get its id to use as a foreign key for other entries
  const id = await Exercise.getLastInsertID();
  
  //Create entry in bridge_image_exercise to associate an image with the exercise
  const imageBridge = new ExerciseImageBridge(id, DEFAULT_IMAGE_ID, TABLE_NAME);
  await imageBridge.saveEntry();

  //Create entry in exercise_equipment table for each equipment id
  for (let i = 0; i < exercise.equipment.length; i++)
  {
    const exerciseEquipment = new ExerciseEquipment(id, exercise.equipment[i])
    await exerciseEquipment.saveEntry();
  }

  //Create entry in exercise_primary_muscle table for each primary_muscle id
  for (let i = 0; i < exercise.musclesPrimary.length; i++)
  {
    const musclesPrimary = new ExercisePrimaryMuscle(id, exercise.musclesPrimary[i])
    await musclesPrimary.saveEntry();
  }

  //Create entry in exercise_secondary_muscle table for each secondary_muscle id
  for (let i = 0; i < exercise.musclesSecondary.length; i++)
  {
    const musclesSecondary = new ExerciseSecondaryMuscle(id, exercise.musclesSecondary[i])
    await musclesSecondary.saveEntry();
  }
}

exports.getAllExercises = async(req, res, next) =>
{
  console.log("in exercise controller")
  try 
  {
    //Get list of exercises
    const exerciseList = await Exercise.getAllEntries();

    //Loop through all entries and build Exercise objects

    for (let i = 0; i < exerciseList.length; i ++)
    {
      //Grab image object
      exerciseList[i].image = await ExerciseImageBridge.getImageByExerciseID(exerciseList[i].id);
      
      //Grab lists of equipment as well as primary and secondary muscles and append them to object
      exerciseList[i].equipmentList = await ExerciseEquipment.getEntryByExerciseID(exerciseList[i].id);
      exerciseList[i].primaryMuscleList = await ExercisePrimaryMuscle.getEntryByExerciseID(exerciseList[i].id);
      exerciseList[i].secondaryMuscleList = await ExerciseSecondaryMuscle.getEntryByExerciseID(exerciseList[i].id);
    }
    
    res.status(200).json(exerciseList);
  }
  catch(err)
  {
    console.log(err)
  }
}

