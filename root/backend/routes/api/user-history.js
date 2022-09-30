const express = require("express");
const router = express.Router();
const userHistoryController = require("../../controllers/user-history_entry_controller");

// --- User History Create ----------------------------------------
//Add user history entry
router.route("/entries").post(userHistoryController.saveEntry)


// --- User History Read  ----------------------------------------
//Get all entries
router.route("/user-history-entry").get(userHistoryController.getAllEntries);

//Get just daily weights
router.route("/weights-daily-by-dates-entry/:start/:end").get(userHistoryController.getWeightsByDate);

//Get just moving average weights
router.route("/weights-avg-by-dates-entry/:start/:end").get(userHistoryController.getAvgWeightsByDate);

//Get both daily weights and moving averages
router.route("/weights-both-by-dates-entry/:start/:end").get(userHistoryController.getWeightsAndMovingAveragesByDate);

//Get just daily body fat percentages
router.route("/bfps-daily-by-dates-entry/:start/:end").get(userHistoryController.getBFPsByDate);

//Get just moving average body fat percentages
router.route("/bfps-avg-by-dates-entry/:start/:end").get(userHistoryController.getAvgBFPsByDate);

//Get both daily bfps and moving averages
router.route("/bfps-both-by-dates-entry/:start/:end").get(userHistoryController.getBFPsAndMovingAveragesByDate);

module.exports = router;
