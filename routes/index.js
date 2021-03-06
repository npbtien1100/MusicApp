var express = require("express");
var router = express.Router();
const authController = require("../passport/authcontroller");
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get(
  "/check-logged-in",
  authController.checkAuthenticated,
  authController.response_loggedin
);
router.get("/logout", function (req, res) {
  req.logout();
  res.send("logout");
});

module.exports = router;
