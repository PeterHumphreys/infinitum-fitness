const db = require("../config/db");
class Workout
{
  constructor(id, name, scheduledExercises)
  {
    this.id = id;
    this.name = name;
    this.scheduledExercises = scheduledExercises;
  }
}
module.exports = Workout;