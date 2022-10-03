const express = require("express");
const router = express.Router();

//TODO: Add in error and info
router.use("/auth", require("./auth/auth"));
router.use("/users", require("./api/users"));
router.use("/user-history", require("./api/user-history"));
router.use("/routines", require("./api/routines"));
router.use("/exercises", require("./api/exercises"));
router.use("/home", require("./api/home"));
//router.use("/upload", require("./upload"))

module.exports = router;