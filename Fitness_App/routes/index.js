const express = require("express");
const router = express.Router();

//TODO: Add in error and info
router.use("/", require("./home"));
router.use("/auth", require("./auth"))
router.use("/api", require("./api"))
router.use("/upload", require("./upload"))

module.exports = router;