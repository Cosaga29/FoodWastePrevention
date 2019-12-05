var express = require("express");
var router = express.Router();

router.use(function(req, res) {
  res.status(404);
  res.render("404");
});

router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

module.exports = router;
