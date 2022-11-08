const { layouts } = require("chart.js");
const db = require("../config/db");

class User
{
   constructor(user_profile_photo_URL, user_first_name, user_last_name, user_email, user_password, user_dob, user_sex, 
      user_height, user_activity_level, user_fitness_goal, user_date_joined)
   {
      this.user_id = null;
      this.user_profile_photo_URL = user_profile_photo_URL;
      this.user_first_name = user_first_name;
      this.user_last_name = user_last_name;
      this.user_email = user_email;
      this.user_password = user_password;
      this.user_dob = user_dob;
      this.user_sex = user_sex;
      this.user_height = user_height;
      this.user_activity_level = user_activity_level;
      this.user_fitness_goal = user_fitness_goal;
      this.user_date_joined = user_date_joined;
   }

   //Implementation of Builder pattern
   static UserBuilder = class
   {
      setUserProfilePhotoURL(user_profile_photo_URL)
      {
         this.user_profile_photo_URL = user_profile_photo_URL;
         return this;
      }

      setUserFirstName(user_first_name)
      {
         this.user_first_name = user_first_name;
         return this;
      }
      
      setUserLastName(user_last_name)
      {
         this.user_last_name = user_last_name;
         return this;
      }
      
      setUserEmail(user_email)
      {
         this.user_email = user_email;
         return this;
      }
      
      setUserPassword(user_password)
      {
         this.user_password = user_password;
         return this;
      }
      
      setUserDOB(user_dob)
      {
         this.user_dob = user_dob;
         return this;
      }
      
      setUserSex(user_sex)
      {
         this.user_sex = user_sex;
         return this;
      }
      
      setUserHeight(user_height)
      {
         this.user_height = user_height;
         return this;
      }
      
      setUserActivityLevel(user_activity_level)
      {
         this.user_activity_level = user_activity_level;
         return this;
      }
      
      setUserFitnessGoal(user_fitness_goal)
      {
         this.user_fitness_goal = user_fitness_goal;
         return this;
      }

      setUserDateJoined(user_date_joined)
      {
         this.user_date_joined = user_date_joined;
         return this;
      }

      build()
      {
         const user = new User(this.user_profile_photo_URL, this.user_first_name, this.user_last_name, this.user_email, this.user_password, this.user_dob, this.user_sex, this.user_height, this.user_activity_level, this.user_fitness_goal, this.user_date_joined);
         return user;
      }
   }
    
   /**
    * Writes a new entry to the table
    */
   async saveUser()
   {
      let sql = 
      `
      INSERT INTO user(user_profile_photo_URL, user_first_name, user_last_name, user_email, user_password, user_dob, user_sex, user_height, user_activity_level, user_fitness_goal, user_date_joined)      
      VALUES("${this.user_profile_photo_URL}", "${this.user_first_name}", "${this.user_last_name}", "${this.user_email}", "${this.user_password}", "${this.user_dob}", "${this.user_sex}", ${this.user_height}, "${this.user_activity_level}", "${this.user_fitness_goal}", "${this.user_date_joined}");
      `;
      console.log(sql)
      let newUser = db.execute(sql);
      return newUser;
   }

   /**
    * Updates a user's profile picture
    */
   static async updateUserProfilePhoto(user_id, user_profile_photo_URL)
   {
      let sql = 
      `
      UPDATE user 
      SET user_profile_photo_URL = "${user_profile_photo_URL}"
      WHERE user_id = ${user_id};
      `;
      console.log(sql)
      let newEntry = db.execute(sql);
      return newEntry;
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
    * Gets all users
    * @return array of User objects
    */
   static async getAllUsers()
   {
      let sql = `SELECT * FROM USER`;
      const result = await db.execute(sql);
      return result [0];
   }

   /**
    * Gets a user by their id
    * @return User
    */
   static async getUserByID(id)
   {
      let sql = `SELECT * FROM USER WHERE user_id = ${id}`;
      const result = await db.execute(sql);
      return result [0][0];
   }

   /**
    * Writes a new entry to the table
    * @return User
    */
   static async getUserByEmail(user_email)
   {
      console.log("In getUserByEmail")
      let sql = 
      `
            SELECT * from user WHERE user_email = '${user_email}';
      `;
      console.log("SQL: " + sql)
      const result = await db.execute(sql);
      console.log("result: " + result[0])
      if (result[0][0] === undefined)
         return null;
      return result [0][0];
   }

   /**
    * Gets a user_id corresponding to a user_email
    * @return id
    */
    static async getUserIDByEmail(user_email)
    {
       let sql = `SELECT user_id FROM USER WHERE user_email = "${user_email}"`;
       const result = await db.execute(sql);
       if (result[0][0] === undefined)
          return null;
       return result [0][0].user_id;
    }
}


module.exports = User;