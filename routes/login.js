var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');
const authController = require('../passport/authcontroller');
/* GET users listing. */



router.get('/', authController.spotifyauth);

router.get('/callback', authController.authcallback,
    (req, res) => { res.redirect('/'); }
);
router.get('/getanalysis', authController.checkAuthenticated, (req, res, next) => { res.json({ "test": "test thoi ma" }) });




module.exports = router;
