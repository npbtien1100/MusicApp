var express = require('express');
var router = express.Router();
const testcontroller=require('../controllers/test');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/artistalbums',testcontroller.test)

module.exports = router;
