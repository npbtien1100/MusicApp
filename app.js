require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");
var app = express();

//passport
const session = require("express-session");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("./passport/passport")(passport);

module.exports.passport = passport;

app.set('trust proxy', 1)
app.use(
    cookieSession({
      name: "__session",
      keys: ["key1"],
        maxAge: 60 * 60 * 100,
        secure: true,
        sameSite: 'none'
    })
);

Object.defineProperty(session.Cookie.prototype, 'sameSite', {
  // sameSite cannot be set to `None` if cookie is not marked secure
  get() {
    return this._sameSite === 'none' && !this.secure ? 'lax' : this._sameSite;
  },
  set(value) {
    this._sameSite = value;
  }
});
// Express session
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true})
);
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: "https://elegant-mccarthy-8cb819.netlify.app", // allow to server to accept request from different origin
    credentials: true, // allow session cookie from browser to pass through
  })
);

//routers
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const tracksRouter = require("./routes/tracks");
const artistsRouter = require("./routes/artists");
const genresRouter = require("./routes/genres");
const loginRouter = require("./routes/login");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/tracks", tracksRouter);
app.use("/artists", artistsRouter);
app.use("/genres", genresRouter);
app.use("/login", loginRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server is running on port: ${port}`);
// });
console.log(`Server is running on port: ${port}`);

module.exports.app = app;
