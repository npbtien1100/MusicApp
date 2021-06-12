var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/logout', function(req,res){
  req.logout();
  res.send("logout");
});

module.exports = router;
