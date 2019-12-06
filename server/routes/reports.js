var express = require("express");
var mysql = require("../dbcon.js");
var router = express.Router();
var authenticate = require("../authenticator");
var table_generator = require("../table_generator");

router
  .route("/")
  .get(function(req, res) {
    var context = {};
    if (!authenticate(req.session, null, res)) {
      return;
    }
    //ensure that the user has an account type of 1
    if (!authenticate(req.session, 1, res)) {
      return;
    }
    context.user = req.session.username;
    res.render("reports", context);
  })
  .post(function(req, res) {
    var context = {};
    if (!authenticate(req.session, null, res)) {
      return;
    }

    if (req.body.hasOwnProperty("fetchLossEventsButton")) {
      //fetch loss table
      var sql = "SELECT * FROM LossEventTable";
      sql = mysql.pool.query(sql, function(error, results, fields) {
        if (error) {
          context.message = "Unable to access database.";
          console.log(error);
          context.user = req.session.username;
          res.render("home", context);
        }
        context = table_generator(context, results, fields);
        context.message =
          "DB results generated successfully. Showing Loss Event Data.";
        context.user = req.session.username;
        res.render("reports", context);
      });
    }
    //fetch user table
    else if (req.body.hasOwnProperty("fetchUsersButton")) {
      var sql = "SELECT * FROM UserTable";
      sql = mysql.pool.query(sql, function(error, results, fields) {
        if (error) {
          context.message = "Unable to access database.";
          console.log(error);
          context.user = req.session.username;
          res.render("home", context);
        }
        context = table_generator(context, results, fields);
        context.message =
          "DB results generated successfully. Showing User Table Data.";
        context.user = req.session.username;
        res.render("reports", context);
      });
    }
    //fetch org table
    else if (req.body.hasOwnProperty("fetchOrgsButton")) {
      var sql = "SELECT * FROM OrgTable";
      sql = mysql.pool.query(sql, function(error, results, fields) {
        if (error) {
          context.message = "Unable to access database.";
          console.log(error);
          context.user = req.session.username;
          res.render("home", context);
        }
        context = table_generator(context, results, fields);
        context.message =
          "DB results generated successfully. Showing Org Table Data.";
        context.user = req.session.username;
        res.render("reports", context);
      });
    }
  });

module.exports = router;
