const SpotifyStrategy = require('passport-spotify').Strategy;
const { use } = require('passport');
//Load User model 

const authCallbackPath = process.env.DOMAIN + '/login/callback';
const port = process.env.PORT || 5000;
module.exports = (passport) => {

    passport.use(
        new SpotifyStrategy(
            {
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                callbackURL: authCallbackPath,  //'http://localhost:' + port + 
            },
            function (accessToken, refreshToken, expires_in, profile, done) {
                // asynchronous verification, for effect...
                process.nextTick(function () {
                    // To keep the example simple, the user's spotify profile is returned to
                    // represent the logged-in user. In a typical application, you would want
                    // to associate the spotify account with a user record in your database,
                    // and return that user instead.
                    console.log("profile: ", profile);
                    return done(null, { "id": profile.id, "accToken": accessToken, "expires_in": expires_in, "user_img": profile.photos[0] ? profile.photos[0].value : "" });
                });
            }
        )
    );
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    // passport.deserializeUser(async (id, done) => {
    //     console.log('Ham deserialize ID user: ' + id);
    //     let user = await adminmodel.findOne({ _id: new ObjectId(id) });
    //     if (user) {
    //         user.type = "admin";
    //         return done(null, user);
    //     }
    //     user = await staffmodel.findOne({ _id: new ObjectId(id) });
    //     user.type = "staff";

    //     return done(null, user);
    // });
    passport.deserializeUser((obj, done) => {
        done(null, obj);
    });
}