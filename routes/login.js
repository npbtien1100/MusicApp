var express = require('express');
var router = express.Router();
const loginController = require('../controllers/userController');
const authController = require('../passport/authcontroller');
/* GET users listing. */



router.get('/', authController.spotifyauth);
router.get('/callback', authController.authcallback, authController.response_popup_success);
router.get('/callback/failure', authController.response_popup_failure);
router.get('/getanalysis', authController.checkAuthenticated, (req, res, next) => { res.json({ "test": "test thoi ma" }) });




module.exports = router;
