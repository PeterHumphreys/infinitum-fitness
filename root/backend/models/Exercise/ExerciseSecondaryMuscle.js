const db = require("../../config/db")
class ExerciseSecondaryMuscle
{
  constructor(exercise_id, muscle_id)
  {
    this.id = null;
    this.exercise_id = exercise_id;
    this.muscle_id = muscle_id;
  }
  
  async saveEntry()
  {
    let sql = `INSERT INTO bridge_exercise_secondary_muscle(exercise_id, muscle_id) VALUES(${this.exercise_id}, ${this.muscle_id});`
    console.log(sql)
    const result = await db.execute(sql);
    return result;
  }
  
  static async getEntryByExerciseID(id)
  {
    let sql = 
    `
    SELECT muscle.muscle_id, muscle_name 
    FROM bridge_exercise_secondary_muscle
    INNER JOIN muscle
    ON bridge_exercise_secondary_muscle.muscle_id = muscle.muscle_id
    WHERE exercise_id = ${id};
    `
    const [list] = await db.execute(sql);
    return list;
  }
}

module.exports = ExerciseSecondaryMuscle