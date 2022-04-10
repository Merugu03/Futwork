const express = require("express");
const router = express.Router();
const { getData, postData } = require("../Tasks/data");

router.route("/").get(getData);
router.route("/upload").post(postData);

module.exports = router;
