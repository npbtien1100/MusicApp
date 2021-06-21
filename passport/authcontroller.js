const { passport } = require("../app");

module.exports.spotifyauth = passport.authenticate("spotify", {
  scope: [
    "user-read-private",
    "user-top-read",
    "playlist-modify-public",
    "playlist-modify-private",
  ],
  showDialog: true,
});

module.exports.authcallback = passport.authenticate("spotify", {
  failureRedirect: process.env.DOMAIN + "/login/callback/failure",
});

exports.checkAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // res.redirect('/login');
  res.send("please login");
};

exports.response_loggedin = (req, res, next) => {
  res.send({ "status": "logged in", "user_image": req.user.user_img });
}

exports.response_popup_success = (req, res, next) => {
  // const response = { message: "", access_token: "", expires_in: "" };
  // response.message = "access_accepted";
  // response.access_token = req.query.code;
  // response.expires_in = req.user.expires_in;
  res.render("callback", { message: "logged in" });
};

exports.response_popup_failure = (req, res, next) => {
  // const response = { message: "", access_token: "", expires_in: "" };
  // response.message = "access_denied";
  // response.access_token = null;
  // response.expires_in = null;
  res.render("callback", { message: "rejected" });
};
