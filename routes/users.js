var express = require('express');
var router = express.Router();
const trackController=require('../controllers/trackController');
const authController = require('../passport/authcontroller');
/* GET users listing. */

router.get('/getanalysis',authController.checkAuthenticated);
router.get('/generate', trackController.searchTracks);
router.get('/playlist-generator/', trackController.getAudioFeatures);

module.exports = router;
