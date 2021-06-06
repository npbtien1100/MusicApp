var express = require('express');
var router = express.Router();
const trackController = require('../controllers/trackController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/search', trackController.searchTracks);    //'/tracks/search?name=abcd'
router.get('/newreleases', trackController.getnewreleases);
router.get('/generate/:id', trackController.getSimilarSongs);
router.get('/getanalysis/:id', trackController.getAudioFeatures)


module.exports = router;
