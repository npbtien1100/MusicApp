var express = require("express");
var router = express.Router();
const trackController = require("../controllers/trackController");
const authController = require("../passport/authcontroller");
const userController = require("../controllers/userController");
/* GET users listing. */

router.get("/getanalysis", userController.getanalysis);
router.post("/generate-basedon-analysis", userController.generateBaOnAnalysis);
router.post("/createplaylist", userController.createplaylist);

module.exports = router;
