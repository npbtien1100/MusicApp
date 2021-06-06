const { passport } = require('../app');

module.exports.spotifyauth = passport.authenticate('spotify', {
    scope: ['user-read-email', 'user-read-private'],
    showDialog: true,
})

module.exports.authcallback = passport.authenticate('spotify', { failureRedirect: '/login' })

exports.checkAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}