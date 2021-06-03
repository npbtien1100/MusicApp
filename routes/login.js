var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');
const passport = require('passport');
/* GET users listing. */


//router.get('/createplaylist', loginController.createplaylist);    //'/tracks/search?name=abcd'
router.get('/getanalysis', ensureAuthenticated, (req,res,next)=>{res.json({"test":"test thoi ma"})});

router.get(
    '/createplaylist',
    passport.authenticate('spotify', {
        scope: ['user-read-email', 'user-read-private'],
        showDialog: true,
    })
);

router.get(
    '/callback',
    passport.authenticate('spotify', {failureRedirect: '/login'}),
    function (req, res) {
      res.redirect('/');
    }
  );

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = router;
