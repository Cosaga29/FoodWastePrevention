var express = require("express");

/**
 *
 *
 * Function that authenticates a user.
 * First use case: only session given: ensures that a valid user is logged into the system.
 * Second use case: if passed an access_level, ensures that the user account has the required access level
 * 
 * Usage:
 * 
 * var authenticate = require("../authenticator");
 * 
 * if (!authenticate(req.session, null, res)) {
    return;
   }
 * 
 *
 * access_level 1 = Producer/Distributor
 * access_level 2 = Third-Party Org
 * access_level 3 = User
 *
 * 
 * @returns true/false
 *  true = user was autheticated successfully
 *  false = otherwise
 * 
 * @param {session object} session
 * @param {int} access_level
 */
function authenticate(session, access_level, res) {
  if (!access_level) {
    if (session.username && session.u_id) {
      return true;
    } else {
      var context = {};
      context.message = "Must be logged in to access this resource.";
      res.render("auth", context);
      return false;
    }
  } else {
    if (session.account_type != access_level) {
      var context = {};
      context.message =
        "You do not have account privileges to access this feature.";
      res.render("auth", context);
      return false;
    }
    return true;
  }
}

module.exports = authenticate;
