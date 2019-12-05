var express = require("express");
var router = express.Router();
var authenticate = require("../authenticator");

router.get("/", function(req, res) {
  if (!authenticate(req.session, null, res)) {
    return;
  }

  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
      res.errorResponse(err.message, res);
    } else {
      res.render("login");
    }
  });
});

module.exports = router;
