var express = require("express");
var router = express.Router();
var authenticate = require("../authenticator");

router.get("/", function(req, res) {
  if (!authenticate(req.session)) {
    res.send("Must be logged in to access this resource.");
    return;
  }
  var context = {};
  context.user = req.session.username;
  res.render("home", context);
});

module.exports = router;
