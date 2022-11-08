const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// --- This file handles user profile photo uploads ----------------------------------------
//Set storage engine
const storage = multer.diskStorage(
    {
        //Store files in this location
        destination : "public/images/uploads/user-profile/",

        //Names the file in the following format: 
        //img_upload_LastName_FirstName_DateToday.fileExtension
        filename : function(req, file, cb)
        {
            cb(null, file.fieldname + '_' + `${req.session.user.user_last_name}_${req.session.user.user_first_name}_${Date.now()}` + path.extname(file.originalname)) ;
        }
    });

//Initialize upload
const upload = multer(
    {
        storage : storage,
        limits:
        {
            fileSize : 1000000
        },
        fileFilter: function(req, file, cb)
        {
            checkFileType(file, cb);
        }
    }).single("img_upload");

//Check the file type
function checkFileType(file, cb)
{
    //Allowed extentions
    const fileTypes = /jpeg|jpg|png|gif/;

    //check extension
    const extensionName = fileTypes.test(path.extname(file.originalname).toLowerCase());

    //check mimetype
    const mimetype = fileTypes.test(file.mimetype);

    //Valid image
    if (mimetype && extensionName)
    {
        return cb(null, true);
    }

    //Invalid image
    else
    {
        cb("Invalid image format.")
    }
}

//actual route
router.post("/image-upload", (req, res) =>
{
    upload(req, res, (err) =>
    {
        //An error occurred, could not upload image
        if (err)
        {
            console.log(err)
            res.status(400).send({msg : err})
        }
        //Succesfully uploaded image
        else
        {
            res.status(200).json({thePath : req.file.path})
        }
    });
});

module.exports = router;