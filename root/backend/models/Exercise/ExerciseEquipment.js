const db = require("../../config/db")
class ExerciseEquipment
{
  constructor(exercise_id, equipment_id)
  {
    this.id = null;
    this.exercise_id = exercise_id;
    this.equipment_id = equipment_id;
  }
  
  async saveEntry()
  {
    let sql = `INSERT INTO bridge_exercise_equipment(exercise_id, equipment_id) VALUES(${this.exercise_id}, ${this.equipment_id});`
    console.log(sql)
    const result = await db.execute(sql);
    return result;
  }

  static async getEntryByExerciseID(id)
  {
    let sql = 
    `
    SELECT equipment.equipment_id, equipment_name 
    FROM bridge_exercise_equipment 
    INNER JOIN equipment
    ON bridge_exercise_equipment.equipment_id = equipment.equipment_id
    WHERE exercise_id = ${id};
    `
    const [list] = await db.execute(sql);
    return list;
  }
}

module.exports = ExerciseEquipment