const db = require("../../config/db")
class ExerciseImageBridge
{
  constructor(exercise_id, image_id)
  {
    this.exercise_id = exercise_id;
    this.image_id = image_id;
  }
  
  async saveEntry()
  {
    let sql = `INSERT INTO bridge_exercise_image (exercise_id, image_id) VALUES(${this.exercise_id}, ${this.image_id});`
    console.log(sql)
    const result = await db.execute(sql);
    return result;
  }

  static async getImageByExerciseID(id)
  {
    let sql = 
    `SELECT image_url, image_alt_text
    FROM bridge_exercise_image
    INNER JOIN image
    ON bridge_exercise_image.image_id = image.image_id
    WHERE exercise_id = ${id};
    `
    const [list] = await db.execute(sql);
    //Fix slash escape chars in image URL
    list[0].image_url = list[0].image_url.replace(/\\/g, '/');
    return list[0];
  }
}

module.exports = ExerciseImageBridge