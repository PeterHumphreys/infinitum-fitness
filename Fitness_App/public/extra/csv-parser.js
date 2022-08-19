const csv = require("csv-parser");
const fs = require("fs");
const db = require("../database-manager");
const self = this;

let results = [];

//.on registers an event handler
/*fs.createReadStream('uploads/Weight.csv')
.pipe(csv({}))
.on('data', (data) => results.push(data))
.on('end', () =>
{
    console.log(results);
    for (let i = 0; i < results.length; i++)
    {
        db.query(
            'INSERT INTO user_history(historical_date, user_id, weight, body_fat_percent) VALUES(?, ?, ?, ?);',
            [results[i].Date, 1, results[i].Weight, results[i].BodyFat],
            (err, results) =>
            {
              if (err) 
                throw err;
              console.log(results); // results contains rows returned by server
            }
          )
    }
    // simple query

});*/



module.exports = fs;
