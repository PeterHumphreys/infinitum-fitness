const db = require("../config/db");

class UserHistoryEntry
{
    constructor(historical_date, user_id, weight, body_fat_percentage)
    {
        this.historical_date = historical_date;
        this.user_id = user_id;
        this.weight = weight;
        this.body_fat_percentage = body_fat_percentage;
    }

    /**
     * Create a new UserHistory entry
     */
    async saveEntry()
    {
        let sql = 
        `
        INSERT INTO user_history(historical_date, user_id, weight, body_fat_percent) 
        VALUES("${this.historical_date}", "${this.user_id}", ${this.weight}, ${this.body_fat_percentage});
        `;
        console.log(sql)
        let newEntry = db.execute(sql);
        return newEntry;
    }

    /**
     * Reads all entries in table
     */
    static async getAllEntries()
    {
        let sql = 'SELECT * FROM user_history';
        const result = await db.execute(sql);
        return result [0];
    }

    /**
     * Returns all dates and weight entries between specified dates
     * @param {*} startDate 
     * @param {*} endDate 
     */
    static async getWeightsByDate(startDate, endDate)
    {
        let sql = `SELECT historical_date, weight FROM user_history WHERE historical_date >= "${startDate}" AND historical_date <="${endDate}";`
        const result = await db.execute(sql);
        return result [0];
    }   
        
    /**
     * Returns all dates and bfp entries between specified dates
     * @param {*} startDate 
     * @param {*} endDate 
     */
     static async getAvgWeightsByDate(startDate, endDate)
     {
         let sql = 
         `SELECT historical_date,
         Round((SELECT SUM(b.weight) / COUNT(b.weight)
         FROM user_history AS b 
         WHERE DATEDIFF(a.historical_date, b.historical_date) BETWEEN 0 AND 7), 2) AS 'movingAvg'
         FROM user_history AS a
         WHERE a.historical_date >= '${startDate}'
         AND a.historical_date <= '${endDate}'
         ORDER BY a.historical_date;`;
         const result = await db.execute(sql);
         return result [0];
     }
    
    /**
     * Returns all dates and bfp entries between specified dates
     * @param {*} startDate 
     * @param {*} endDate 
     */

    static async getWeightsAndMovingAveragesByDate(startDate, endDate)
    {
        let sql = 
        `SELECT historical_date, weight,
        Round((SELECT SUM(b.weight) / COUNT(b.weight)
        FROM user_history AS b 
        WHERE DATEDIFF(a.historical_date, b.historical_date) BETWEEN 0 AND 7), 2) AS 'movingAvg'
        FROM user_history AS a
        WHERE a.historical_date >= "${startDate}"
        AND a.historical_date <= "${endDate}"
        ORDER BY a.historical_date;`
        const result = await db.execute(sql);
        return result [0];
    }

    /**
    * Returns all dates and bfp entries between specified dates
    * @param {*} startDate 
    * @param {*} endDate 
    */
    static async getBFPsByDate(startDate, endDate)
    {
        let sql = `SELECT historical_date, body_fat_percent FROM user_history WHERE historical_date >= "${startDate}" AND historical_date <="${endDate}";`
        const result = await db.execute(sql);
        return result [0];
    }

    /**
     * Returns all dates and bfp entries between specified dates
     * @param {*} startDate 
     * @param {*} endDate 
     */
    static async getAvgBFPsByDate(startDate, endDate)
    {
        let sql = 
        `SELECT historical_date,
        Round((SELECT SUM(b.body_fat_percent) / COUNT(b.body_fat_percent)
        FROM user_history AS b 
        WHERE DATEDIFF(a.historical_date, b.historical_date) BETWEEN 0 AND 7), 2) AS 'movingAvg'
        FROM user_history AS a
        WHERE a.historical_date >= '${startDate}'
        AND a.historical_date <= '${endDate}'
        ORDER BY a.historical_date;`;
        const result = await db.execute(sql);
        return result [0];
    }

    /**
     * Returns all dates and bfp entries between specified dates
     * @param {*} startDate 
     * @param {*} endDate 
     */
    static async getBFPsAndMovingAveragesByDate(startDate, endDate)
    {
        let sql = 
        `SELECT historical_date, body_fat_percent,
        Round((SELECT SUM(b.body_fat_percent) / COUNT(b.body_fat_percent)
        FROM user_history AS b 
        WHERE DATEDIFF(a.historical_date, b.historical_date) BETWEEN 0 AND 7), 2) AS 'movingAvg'
        FROM user_history AS a
        WHERE a.historical_date >= '${startDate}'
        AND a.historical_date <= '${endDate}'
        ORDER BY a.historical_date;`;
        const result = await db.execute(sql);
        return result [0];
    }

}
module.exports = UserHistoryEntry;