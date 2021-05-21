var express = require('express');
var router = express.Router();
const testcontroller = require('../controllers/test');
const trackController = require('../controllers/trackController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/artistalbums',testcontroller.test);
router.get('/test', trackController.searchTracks);
router.get('/playlist-generator/', trackController.getAudioFeatures);
router.get('/getgenres', trackController.getGenres);

module.exports = router;
