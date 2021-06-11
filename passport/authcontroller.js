const { passport } = require('../app');

module.exports.spotifyauth = passport.authenticate('spotify', {
    scope: ['user-read-private', 'user-top-read', 'playlist-modify-public', 'playlist-modify-private'],
    showDialog: true,
})

module.exports.authcallback = passport.authenticate('spotify', { failureRedirect: '/login/callback/failure' });

exports.checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

exports.response_popup_success = (req, res, next) => {
    const response = { message: "", access_token: "", expires_in: "" };
    response.message = "access_accepted";
    response.access_token = req.query.code;
    response.expires_in = req.user.expires_in;
    console.log("object response day ne: ", response);
    res.render('callback', response);
}

exports.response_popup_failure = (req, res, next) => {
    const response = { message: "", access_token: "", expires_in: "" };
    console.log("Co chay vao day: ");
    response.message = "access_denied";
    response.access_token = null;
    response.expires_in = null;
    console.log("object response day ne: ", response);
    res.render('callback', response);
}