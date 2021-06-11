var express = require('express');
var router = express.Router();
const trackController = require('../controllers/trackController');
const authController = require('../passport/authcontroller');
const userController = require('../controllers/userController');
/* GET users listing. */

router.get('/getanalysis', authController.checkAuthenticated, userController.getanalysis);
router.get('/generate-basedon-analysis', userController.generateBaOnAnalysis);
router.get('/createplaylist', userController.createplaylist);

module.exports = router;
