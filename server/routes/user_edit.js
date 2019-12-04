var express = require("express");
var mysql = require("../dbcon.js");
var router = express.Router();
var authenticate = require("../authenticator");

router
  .route("/")
  .get(function(req, res) {
    var context = {};

    //get the users data to populate the template
    mysql.pool.query(
      "SELECT * FROM UserTable WHERE username = ?",
      req.session.username,
      function(error, results, fields) {
        if (results.length > 0) {
          context.user = results[0];
          res.render("user-edit", context);
        } else {
          res.send("DB error");
        }
      }
    );
  })
  .post(function(req, res) {
    if (!authenticate(req.session)) {
      res.send("Must be logged in to access this resource.");
      return;
    }

    var context = {};
    console.log(req.session.id);

    var sql = "UPDATE UserTable SET fname=?, lname=?, email=? WHERE u_id=?";
    var data = [
      req.body.fname,
      req.body.lname,
      req.body.email,
      req.session.u_id
    ];

    sql = mysql.pool.query(sql, data, function(error, results, fields) {
      if (error) {
        console.log("Error occured");
        console.log(error);
      }
    });

    res.render("home", context);
  });

module.exports = router;
