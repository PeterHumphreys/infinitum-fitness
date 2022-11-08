const express = require("express");
const router = express.Router();

/**
 * Central Hub for all routes in the app
 */

router.use("/", require("./home"));
router.use("/auth", require("./auth"))
router.use("/api", require("./api"))
router.use("/upload", require("./upload"))

module.exports = router;