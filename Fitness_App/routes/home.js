const express = require("express");
const router = express.Router();
const userHistoryController = require("../controllers/user-history_entry_controller")
const userController = require("../controllers/user_controller")

/**
 * This file contains routes for pages on the web application
 */

  
// --- Nav Link Pages ---------------------------------------------------------------
//Home page
router.get("/", userController.verifySession, function(req, res)
{
    let timeNow = new Date().getHours(), greetingString;
    if (timeNow >= 0 && timeNow < 12)
        greetingString = "Morning";
    else if (timeNow >= 12 && timeNow <= 18)
        greetingString = "Afternoon";
    else    
        greetingString = "Evening";
    res.render("home/", {user: req.session.user, heading: `Good ${greetingString}, ${req.session.user.user_first_name}!`});

});

//Dashboard
router.get("/dashboard", userController.verifySession, function(req, res)
{
    res.render("home/dashboard", {user: req.session.user, heading: "Dashboard"}); 
});

//Schedule
router.get("/schedule", userController.verifySession, function(req, res)
{
    res.render("home/schedule", {user: req.session.user, heading: "Schedule"}); 
});

//Workout Routines Overview
router.get("/workout-routines", userController.verifySession, function(req, res)
{
    res.render("home/workout-routines", {user: req.session.user, heading: "Your Routines"});
});

//Add Workout Routines
router.get("/add-workout-routine", userController.verifySession, function(req, res)
{
    res.render("home/add-workout-routine", {user: req.session.user, heading: "New Workout"});
});

//Nutrition
router.get("/nutrition", userController.verifySession, function(req, res)
{
    res.render("home/nutrition", {user: req.session.user, heading: "Nutrition"});
});

//Store
router.get("/store", userController.verifySession, function(req, res)
{
    res.render("home/store", {user: req.session.user, heading: "The Infinitum Store"});
});

//Help
router.get("/help", userController.verifySession, function(req, res)
{
    res.render("home/help", {user: req.session.user, heading: "Help"});
});

//Settings
router.get("/settings", userController.verifySession, function(req, res)
{
    res.render("home/settings", {user: req.session.user, heading: "Settings"});
});

// --- Other ---------------------------------------------------------------
//Log Information
router.get("/log-info", userController.verifySession, function(req, res)
{
    res.render("home/log-info", {user: req.session.user, heading: "Log Information"}); 
});

//User profile page
router.get("/user-profile", userController.verifySession, function(req, res)
{
    res.render("home/user-profile", {user: req.session.user, heading: `${req.session.user.user_first_name} ${req.session.user.user_last_name}`}); 
});

// --- Registration/Login ---------------------------------------------------------------
//Login page
router.get("/login", function(req, res)
{
    res.render("home/log-in-registration/login"); 
});

//Sign up page
router.get("/signup", function(req, res)
{
    res.render("home/log-in-registration/signup"); 
});

//Error page
router.use((err, req, res, next) =>
{
    console.error(err.stack);
    res.status(500).send("something broke!")
})

// --- Testing ---------------------------------------------------------------
//Test page
router.get("/test-index", function(req, res)
{
    res.render("home/test-index", {heading: "Test Page"});
});

//testing db
router.post("/test", userController.getLastInsertID, (req, res, next) => 
{
    res.redirect("/");
});

module.exports = router;