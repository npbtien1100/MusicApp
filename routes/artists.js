var express = require('express');
var router = express.Router();
const artistController = require('../controllers/artistController');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/search', artistController.searchArtists);    //'/artists/search?name=abcd'
router.get('/generate/:id', artistController.getSimilarSongs);    

module.exports = router;
