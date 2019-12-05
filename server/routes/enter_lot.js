var express = require("express");
var mysql = require("../dbcon.js");
var router = express.Router();

router
  .route("/")
  .get(function(req, res) {
    //TODO: autheticate user
    /**
     *
     * if(authenticate(req.session, 1))
     * {
     *  //ensure that account type is producer/distributor
     * }
     * else{
     *  //send back to home page
     * }
     *
     */
    var context = {};

    //populate context with available organizations in the database:
    var sql = "SELECT * FROM OrgTable";
    sql = mysql.pool.query(sql, function(error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        context.results = results;
        //TODO: ADD population of select html element
        res.render("create-lot-entry", context);
      }
    });
  })
  .post(function(req, res) {
    var context = {};
    //authenticate

    var sql =
      "INSERT INTO UserTable (lot_number, description, start_weight, start_location, zip, food_type, o_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    var data = [
      req.body.lot_number,
      req.body.description,
      req.body.start_weight,
      req.body.start_location,
      req.body.zip,
      req.body.food_type,
      req.body.o_id
    ];
    sql = mysql.pool.query(sql, data, function(error, results, fields) {
      if (error) {
        console.log("Error while inserting in DB:");
        console.log(error);
      } else {
        console.log("Lot entry manually created");
      }
    });
    res.render("create-lot-entry");
  });

module.exports = router;
