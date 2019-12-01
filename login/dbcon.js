var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs361_edmundsm',
  password        : '8530',
  database        : 'cs361_edmundsm'
});
module.exports.pool = pool;
