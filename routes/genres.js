const express=require('express');
const router=express.Router();

const genreController = require('../controllers/genreController');
/* GET users listing. */

router.get('/getseeds', genreController.getseeds);    //'/artists/search?name=abcd'
router.get('/generate/:id', genreController.getSimilarSongs);    

module.exports = router;