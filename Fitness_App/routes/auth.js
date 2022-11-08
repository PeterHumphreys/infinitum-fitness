const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");

/**
 * This file contains routes for authenticating users
 */

//Authenticate User
router.post("/signin", userController.authenticateUser);

//Logout
router.post("/logout", function(req, res)
{
    //clear the user cookie
    res.clearCookie("connect.sid");
    console.log( `${req.session.user.user_first_name} ${req.session.user.user_last_name} logged out.`);
    //destroy the user session
    req.session.destroy();
    //redirect the user to the login page
    res.redirect("/login")
});

module.exports = router;