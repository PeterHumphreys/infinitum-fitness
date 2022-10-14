const db = require("../../config/db")
class Exercise
{
  constructor(name, description, categoryID, equipment, musclesPrimary, musclesSecondary, old_id)
  {
    this.name = name;
    this.description = description;
    this.categoryID = categoryID;

    //Associative (Bridge) tables in DB
    this.equipment = equipment;
    this.musclesPrimary = musclesPrimary;
    this.musclesSecondary = musclesSecondary;

    this.old_id = old_id;
  }

  /**
  * Writes a new entry to the table
  */
  async saveEntry()
  {
    console.log(this.description)
    let sql = 
    `
    INSERT INTO exercise(exercise_name, exercise_description, category_id, old_id)
    VALUES("${this.name}", ${this.description ? `"${this.description}"` : "\"\""}, ${this.categoryID}, ${this.old_id});
    `;

    console.log(sql)
    const result = await db.execute(sql);
    return result;
  }

  
  /**
  * Gets ID of last user entry inserted into table
  * @return id of last insert
  */
  static async getLastInsertID()
  {
      let sql = 'SELECT LAST_INSERT_ID();';
      const queryResult = await db.execute(sql);
      
      //Destructure queryResults to obtain ID
      let obj = queryResult[0][0];
      let {'LAST_INSERT_ID()': id} = obj;
      return id;
  }

  /**
   * Gets all exercises
   * @returns 
   */
  static async getAllEntries()
  {
    let sql = 
    `SELECT exercise_id AS id, exercise_name AS name, exercise_description AS description, category_name FROM exercise ex
    INNER JOIN category cat
    ON cat.category_id = ex.category_id;`
    console.log(sql)
    const result = await db.execute(sql);
    return result[0];
  }

  static async getEntryByID(id)
  {
    
    let sql = 
    `SELECT exercise_id AS id, exercise_name AS name, exercise_description AS description, category_name FROM exercise ex
    INNER JOIN category cat
    ON cat.category_id = ex.category_id
    WHERE ex.exercise_id = ${id};`
    const result = await db.execute(sql);
    return result[0];
  }

}

module.exports = Exercise;