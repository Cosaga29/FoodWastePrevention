var express = require("express");
var mysql = require("../dbcon.js");
var router = express.Router();

router
  .route("/")
  .get(function(req, res) {
    //TODO: add timeouts for successive account creations
    var context = {};
    res.render("create-account", context);
  })
  .post(function(req, res) {
    var context = {};
    //TODO: add timeouts for successive account creations

    //check that user entered same password (password=passwordv)
    if (req.body.password != req.body.passwordv) {
      context.message = "Passwords must match, please try again";
      //TODO: re-populate form with good data
      res.render("create-account", context);
      return;
    }

    var sql =
      "INSERT INTO UserTable (username, password, fname, lname, account_type, email) VALUES (?, ?, ?, ?, ?, ?)";
    var data = [
      req.body.username,
      req.body.password,
      req.body.fname,
      req.body.lname,
      req.body.account_type,
      req.body.email
    ];
    sql = mysql.pool.query(sql, data, function(error, results, fields) {
      if (error) {
        console.log("Error while inserting in DB:");
        console.log(error);
      } else {
        console.log("Account has been created.");
      }
    });
    res.render("login");
  });

module.exports = router;
