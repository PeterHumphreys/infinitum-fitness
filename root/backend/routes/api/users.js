const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user_controller");
const userHistoryController = require("../../controllers/user-history_entry_controller");

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



module.exports = router;