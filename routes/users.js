var express = require('express');
var router = express.Router();
const trackController = require('../controllers/trackController');
const authController = require('../passport/authcontroller');
const userController = require('../controllers/userController');
/* GET users listing. */

router.get('/getanalysis', authController.checkAuthenticated, userController.getanalysis);
router.get('/generate', trackController.searchTracks);
router.get('/playlist-generator/', trackController.getAudioFeatures);

module.exports = router;
