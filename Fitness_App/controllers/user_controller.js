const User = require("../models/user");
//Escape "\" once while using the mysql2 package, escape a second time 
//to actually insert in database.
const BS = '\\\\';                          

/**
 * Save a new user object in the database
 */
exports.saveEntry = async(req, res, next) =>
{
    try
    {
        //Destructure the request body and get values
        let {user_first_name, user_last_name, user_email, user_password, user_dob, user_sex, user_height, 
            user_activity_level, user_fitness_goal, historical_date} = req.body;
        
        //Initialize user photo to null- this value will be set after the user is created
        let user_profile_photo_URL = null;

        //Create a new user
        let newUser = new User.UserBuilder()
            .setUserProfilePhotoURL(user_profile_photo_URL)
            .setUserFirstName(user_first_name)
            .setUserLastName(user_last_name)
            .setUserEmail(user_email)
            .setUserPassword(user_password)
            .setUserDOB(user_dob)
            .setUserSex(user_sex)
            .setUserHeight(user_height)
            .setUserActivityLevel(user_activity_level)
            .setUserFitnessGoal(user_fitness_goal)
            .setUserDateJoined(historical_date)
            .build();

        //Enter the new User into the database
        await newUser.saveUser();

        //Retrieve the user object with all DB column entries
        const user = await User.getUserByEmail(user_email);

        //Create a session for the user
        setUserSession(user, req)
        next();
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}


/**
 * Save a new user object in the database
 */
 exports.updateUserProfilePhoto = async(req, res, next) =>
 {
    //append escape slashes to path
    let path = req.body.path;
    
    // "//path" becomes "\\" + "path";
    path = path.replace(/\\/g, `\\\\`);

    try
    {
        let user_id = await User.getUserIDByEmail(req.session.user.user_email);
        User.updateUserProfilePhoto(user_id, path);
        //path = path.replace(/\\\\/g, `\\`);
        //console.log(req.session.user.user_profile_photo_URL)
        req.session.user.user_profile_photo_URL = path;
        next();
    }
    catch(ex)
    {
        console.log(ex);
        next();
    }
 }

/**
 * Stores the the ID of the last user inserted in res.locals
 */
exports.getLastInsertID = async(req, res, next) =>
{
    try
    {
        const id = await User.getLastInsertID();
        //Destructure queryResults to obtain ID
        /*let obj = queryResult[0][0];
        let {'LAST_INSERT_ID()': id} = obj;*/
        //Store ID in res.locals
        res.locals.id = id;
        next();

    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get all users
 */
exports.getAllUsers = async(req, res, next) =>
{
    console.log("in User Controller")
    try
    {
        const users = await User.getAllUsers();
        res.status(200).json(users);
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Get 1 user by ID
 */
 exports.getUserByID = async(req, res, next) =>
 {
     try
     {
         let id = req.params.id;
         const user = await User.getUserByID(id);
         res.status(200).json(user);
     }
     catch(ex)
     {
         console.log(ex);
         next(ex);
     }
 }

 /**
  * Get 1 user by email
  */
 exports.getUserByEmail = async(req, res, next) =>
 {
     try
     {
        let email = req.params.email;
        const user = await User.getUserByEmail(email);
        res.status(200).json(user);
     }
     catch(ex)
     {
         console.log(ex);
         next(ex);
     }
 }

/**
 * Check that a user exists and has valid credentials.
 */
exports.authenticateUser = async(req, res, next) =>
{
    //Destructure request body to obtain email and password
    let {user_email, user_password} = req.body;
    try
    {
        const result = await User.getUserByEmail(user_email);
        //Email wasn't found
        if (result === null)
        {
            res.statusMessage = "That account does not exist."
            res.status(401).send();
        }
        //User exists
        else
        {
            //Get password from result
            const hashedPassword = result.user_password;

            //Correct password
            if (hashedPassword === user_password)
            {
                setUserSession(result, req);
                res.redirect("/");
            }

            //Incorrect password
            else
            {
                res.statusMessage = "Incorrect Password";
                res.status(401).send();
            }
        }
        next();
    }
    catch(ex)
    {
        console.log(ex);
        next(ex);
    }
}

/**
 * Verify that the user's session is authorized.  If not, redirects to the login page.
 */
exports.verifySession = async(req, res, next) =>
{
    //If the session is authorized, run the next middleware function
    if (req.session.isAuth)
    {
        next();
    }
    //If session is not authorized, redirect to login
    else
    {
        res.redirect("/login");
    }
}

/**
 * Creates a session for the user
 * @param {*} user The user for whom the session is being set
 * @param {*} req The request object
 */
function setUserSession(user, req)
{
    req.session.user = user;
    req.session.isAuth = true;
    console.log( `${user.user_first_name} ${user.user_last_name} logged in and was assigned session ID: ${req.session.id}`);
}

