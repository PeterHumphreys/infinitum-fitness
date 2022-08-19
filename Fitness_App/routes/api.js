const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const userHistoryController = require("../controllers/user-history_entry_controller");

/**
 * This file contains routes for CRUD data operations.  I wasn't really sure what to name it,
 * so henceforth it is dubbed "api".
 */

// --- User Create ----------------------------------------
//Register a user
router.post("/register", userController.saveEntry, userController.getLastInsertID, userHistoryController.saveEntry, (req, res, next) => 
{
    console.log("Created user")
    //registration succeeded
    res.sendStatus(200);

    //registration failed
});


// --- User Read ----------------------------------------
//Get all users
router.route("/all-users").get(userController.getAllUsers);

//Get 1 user by their id
router.route("/users-by-id/:id").get(userController.getUserByID);

//Get 1 user by their email
router.route("/users-by-email/:email").get(userController.getUserByEmail);



// --- User Update ----------------------------------------
router.route("/update-user-profile-picture").post(userController.updateUserProfilePhoto,  (req, res, next) =>
{
    let protocol = req.protocol;
    let host = req.headers.host;
    let path = req.headers.referer;
    path = path.replace(protocol, "")
    path = path.replace(host, "")
    path = path.replace("://", "")
    console.log(path);
    if (path === "/signup")
        res.redirect("/");
    else   
        res.redirect(path)
});

// --- User Delete ----------------------------------------



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