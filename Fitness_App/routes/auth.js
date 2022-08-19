const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const userHistoryController = require("../controllers/user-history_entry_controller");

/**
 * This file contains routes for authenticating users
 */

//Authenticate User
router.post("/signin", userController.authenticateUser);

//Logout
router.post("/logout", function(req, res)
{
    res.clearCookie("connect.sid");
    console.log( `${req.session.user.user_first_name} ${req.session.user.user_last_name} logged out.`);
    req.session.destroy();
    res.redirect("/login")
});

module.exports = router;