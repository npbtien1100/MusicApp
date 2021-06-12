var express = require('express');
var router = express.Router();
const authController = require('../passport/authcontroller');
/* GET users listing. */



router.get('/', authController.spotifyauth);
router.get('/callback', authController.authcallback, authController.response_popup_success);
router.get('/callback/failure', authController.response_popup_failure);




module.exports = router;
