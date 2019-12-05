var express = require("express");
var mysql = require("../dbcon.js");
var router = express.Router();

/**
 * On authentication, set session.u_id and session.username
 *
 *
 */

router.route("/").post(function(request, response) {
  var username = request.body.username;
  var password = request.body.password;

  var context = {};

  if (username && password) {
    mysql.pool.query(
      "SELECT * FROM UserTable WHERE username = ? AND password = ?",
      [username, password],
      function(error, results, fields) {
        if (results.length > 0) {
          request.session.loggedin = true;
          context.user = results[0];
          request.session.u_id = context.user.u_id;
          request.session.username = username;
          request.session.account_type = context.user.account_type;
          response.redirect("/home");
        } else {
          response.send("No user found with that combination!");
          response.end();
        }
      }
    );
  } else {
    response.send("Enter username and password.");
  }
});

module.exports = router;
