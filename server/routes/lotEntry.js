var express = require("express");
var mysql = require("../dbcon.js");
var router = express.Router();

router
  .route("/")
  .get(function(req, res) {
    //TODO: add timeouts for successive account creations
    var context = {};
    res.render("create-lot-entry", context);
  })
  .post(function(req, res) {
    var context = {};
    //TODO: add timeouts for successive account creations

    //check that user entered same password (password=passwordv)
    //if (req.body.password != req.body.passwordv) {
    //  context.message = "Passwords must match, please try again";
    //TODO: re-populate form with good data
    //  res.render("create-lotEntry", context);
    //  return;
    // }

    var sql =
      "INSERT INTO UserTable (l_id, lot_number, description, start_weight, start_location, zip, food_type, o_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    var data = [
      req.body.l_id,
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
