const express = require("express");
const router = express.Router();
const userController = require("../controllers/user_controller");
const multer = require("multer");
const path = require("path");

// --- Image Uploads ----------------------------------------
//Set storage engine
const storage = multer.diskStorage(
    {
        destination : "public/images/uploads/user-profile/",
        filename : function(req, file, cb)
        {
            cb(null, file.fieldname + '_' + `${req.session.user.user_last_name}_${req.session.user.user_first_name}_${Date.now()}` + path.extname(file.originalname)) ;
        }
    });

//Init upload
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

    if (mimetype && extensionName)
    {
        return cb(null, true);
    }
    else{
        cb("Invalid image format.")
    }
}

//actual route
router.post("/image-upload", (req, res) =>
{
    upload(req, res, (err) =>
    {
        if (err)
        {
            console.log(err)
            res.status(400).send({msg : err})
        }
        else
        {
            res.status(200).json({thePath : req.file.path})
        }

    });
});

module.exports = router;