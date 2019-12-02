/*
    Code from sample project in CS270 class
    https://github.com/knightsamar/cs340_sample_nodejs_app
    code from https://codeshack.io/basic-login-system-nodejs-express-mysql/
*/

var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_edmundsm',
  password        : '8530',
  database        : 'cs361_edmundsm'
});
module.exports.pool = pool;
