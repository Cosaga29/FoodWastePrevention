var express = require("express");

function authenticate(session) {
  if (session.username && session.u_id) {
    return true;
  }
  return false;
}

module.exports = authenticate;
