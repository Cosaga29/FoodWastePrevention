var express = require("express");

/**
 *
 *
 * Function that authenticates a user.
 * First use case: only session given: ensures that a valid user is logged into the system.
 * Second use case: if passed an access_level, ensures that the user account has the required access level
 *
 * access_level 1 = Producer/Distributor
 * access_level 2 = Third-Party Org
 * access_level 3 = User
 *
 *
 * @param {session object} session
 * @param {int} access_level
 */
function authenticate(session, access_level) {
  if (!access_level) {
    if (session.username && session.u_id) {
      return true;
    }
    return false;
  } else {
    if (session.account_type != access_level) {
      return false;
    }
    return true;
  }
}

module.exports = authenticate;
