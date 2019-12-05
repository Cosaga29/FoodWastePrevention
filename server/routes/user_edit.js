var express = require("express");
var mysql = require("../dbcon.js");
var router = express.Router();
var authenticate = require("../authenticator");

router
  .route("/")
  .get(function(req, res) {
    if (!authenticate(req.session)) {
      res.send("Must be logged in to access this resource.");
      return;
    }
    var context = {};

    //get the users data to populate the template
    mysql.pool.query(
      "SELECT * FROM UserTable WHERE u_id = ?",
      req.session.u_id,
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
    if (!req.body.password) {
      //if user didn't supply a password, fill with old password
      var sql = "SELECT * FROM UserTable WHERE u_id=?";
      var data = req.session.u_id;
      sql = mysql.pool.query(sql, data, function(error, results, fields) {
        if (error || results.length < 0) {
          console.log(error);
          console.log(results);
        } else {
          req.body.password = results[0].password;
          var sql =
            "UPDATE UserTable SET username=?, password=?, fname=?, lname=?, email=? WHERE u_id=?";
          var data = [
            req.body.username,
            req.body.password,
            req.body.fname,
            req.body.lname,
            req.body.email,
            req.session.u_id
          ];

          sql = mysql.pool.query(sql, data, function(error, results, fields) {
            if (error) {
              //console.log("Error occured while updating account");
              console.log(error);
              if (error.code == "ER_DUP_ENTRY") {
                context.message = "Username taken, please try again.";
              }
            } else {
              //update session data
              req.session.username = req.body.username;
              context.message = "Updated Account";
            }
            context.user = req.session.username;
            res.render("home", context);
          });
        }
      });
    } else {
      var sql =
        "UPDATE UserTable SET username=?, password=?, fname=?, lname=?, email=? WHERE u_id=?";
      var data = [
        req.body.username,
        req.body.password,
        req.body.fname,
        req.body.lname,
        req.body.email,
        req.session.u_id
      ];

      sql = mysql.pool.query(sql, data, function(error, results, fields) {
        if (error) {
          console.log("Error occured while updating account");
          console.log(error);
        } else {
          //update session data
          req.session.username = req.body.username;
        }
        context.user = req.session.username;
        res.render("home", context);
      });
    }
  });

module.exports = router;
