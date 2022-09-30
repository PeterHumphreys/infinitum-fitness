const UserHistoryEntry = require("../models/user_history_entry");

/**
 * Create a new UserHistory entry
 */
exports.saveEntry = async(req, res, next) =>
{
    try
    {
        console.log(req.body)
        //Get the historical date, user weight and body fat percentage from the request body
        let {historical_date, user_weight, user_bfp} = req.body;

        //Obtain the user_id from the session
        let user_id = req.session.user.user_id;

        //Create a new user history entry object 
        let newEntry = new UserHistoryEntry(historical_date, user_id, user_weight, user_bfp)

        //Save entry to DB
        await newEntry.saveEntry();
        next();
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get all entries
 * @return array of UserHistoryEntry objects
 */
exports.getAllEntries = async(req, res, next) =>
{
    try
    {
        const entries = await UserHistoryEntry.getAllEntries();
        res.status(200).json(entries);
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get just daily weights
 * @return Array of objects containing historical_date and weight
 */
exports.getWeightsByDate = async(req, res, next) =>
{
    try
    {
        //Get start and end dates from params
        let startDate = req.params.start;
        let endDate = req.params.end;

        const datesAndWeights = await UserHistoryEntry.getWeightsByDate(startDate, endDate);
        res.status(200).json(datesAndWeights);
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get just moving average weights
 * @return Array of objects containing historical_date and movingAvg
 */
exports.getAvgWeightsByDate = async(req, res, next) =>
{
    try
    {
        //Get start and end dates from params
        let startDate = req.params.start;
        let endDate = req.params.end;

        const datesAndWeights = await UserHistoryEntry.getAvgWeightsByDate(startDate, endDate);
        res.status(200).json(datesAndWeights);
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get both daily weights and moving averages
 * @return Array of objects containing historical_date, weight and movingAvg
 */
exports.getWeightsAndMovingAveragesByDate = async(req, res, next) =>
{
    try
    {
        //Get start and end dates from params
        let startDate = req.params.start;
        let endDate = req.params.end;

        const datesAndWeights = await UserHistoryEntry.getWeightsAndMovingAveragesByDate(startDate, endDate);
        res.status(200).json(datesAndWeights);
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get just daily body fat percentages
 * @return Array of objects containing historical_date and body_fat_percentage
 */
exports.getBFPsByDate = async(req, res, next) =>
{
    try
    {
        //Get start and end dates from params
        let startDate = req.params.start;
        let endDate = req.params.end;

        const datesAndBfps = await UserHistoryEntry.getBFPsByDate(startDate, endDate);
        res.status(200).json(datesAndBfps);
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}
 
/**
 * Get just moving average body fat percentages
 * @return Array of objects containing historical_date and movingAvg
 */
exports.getAvgBFPsByDate = async(req, res, next) =>
{
    try
    {
        //Get start and end dates from params
        let startDate = req.params.start;
        let endDate = req.params.end;

        const datesAndBfps = await UserHistoryEntry.getAvgBFPsByDate(startDate, endDate);
        res.status(200).json(datesAndBfps);
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get both daily bfps and moving averages
 * @return Array of objects containing historical_date body_fat_percentage and movingAvg
 */
 exports.getBFPsAndMovingAveragesByDate = async(req, res, next) =>
 {
     try
     {
         //Get start and end dates from params
         let startDate = req.params.start;
         let endDate = req.params.end;
 
         const datesAndBfps = await UserHistoryEntry.getBFPsAndMovingAveragesByDate(startDate, endDate);
         res.status(200).json(datesAndBfps);
     }
     catch(ex)
     {
         console.log(ex);
         next(ex);
     }
 }