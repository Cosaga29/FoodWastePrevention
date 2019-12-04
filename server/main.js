/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require("express");
var mysql = require("./dbcon.js");
var bodyParser = require("body-parser");
var session = require("express-session");
var path = require("path");
var app = express();
var handlebars = require("express-handlebars").create({
  defaultLayout: "main"
});

app.engine("handlebars", handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.set("view engine", "handlebars");
app.set("port", process.argv[2]);
app.set("mysql", mysql);

/**
 *
 * Function that ensures that a user is logged in before rendering of the webpage
 *
 * @param {sesion object} session Current user session
 */
function authenticate(session) {
  if (session.username && session.u_id) {
    return true;
  }
  return false;
}

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.get("/", function(request, response) {
  response.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/auth", function(request, response) {
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

app.get("/user-edit", function(req, res) {
  var context = {};

  //get the users data to populate the template
  mysql.pool.query(
    "SELECT * FROM UserTable WHERE username = ?",
    req.session.username,
    function(error, results, fields) {
      if (results.length > 0) {
        context.user = results[0];
        res.render("user-edit", context);
      } else {
        res.send("DB error");
      }
    }
  );
});

app.get("/create-account", function(req, res) {
  //TODO: add timeouts for successive account creations
  var context = {};
  res.render("create-account", context);
});

app.post("/create-account", function(req, res) {
  var context = {};
  //TODO: add timeouts for successive account creations

  //check that user entered same password (password=passwordv)
  if (req.body.password != req.body.passwordv) {
    context.message = "Passwords must match, please try again";
    //TODO: re-populate form with good data
    res.render("create-account", context);
    return;
  }

  var sql =
    "INSERT INTO UserTable (username, password, fname, lname, account_type, email) VALUES (?, ?, ?, ?, ?, ?)";
  var data = [
    req.body.username,
    req.body.password,
    req.body.fname,
    req.body.lname,
    req.body.account_type,
    req.body.email
  ];
  sql = mysql.pool.query(sql, data, function(error, results, fields) {
    if (error) {
      console.log("Error while inserting in DB:");
      console.log(error);
    } else {
      console.log("Account has been created.");
    }
  });
  res.sendFile(path.join(__dirname + "/login.html"));
});

app.post("/user-edit", function(req, res) {
  if (!authenticate(req.session)) {
    res.send("Must be logged in to access this resource.");
    return;
  }

  var context = {};
  console.log(req.session.id);

  var sql = "UPDATE UserTable SET fname=?, lname=?, email=? WHERE u_id=?";
  var data = [req.body.fname, req.body.lname, req.body.email, req.session.u_id];

  sql = mysql.pool.query(sql, data, function(error, results, fields) {
    if (error) {
      console.log("Error occured");
      console.log(error);
    }
  });

  res.render("home", context);
});

app.get("/logout", function(req, res) {
  if (!authenticate(req.session)) {
    res.send("Must be logged in to access this resource.");
    return;
  }

  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
      res.errorResponse(err.message, res);
    } else {
      res.sendFile(path.join(__dirname + "/login.html"));
    }
  });
});

app.get("/home", function(req, res) {
  if (!authenticate(req.session)) {
    res.send("Must be logged in to access this resource.");
    return;
  }
  var context = {};
  context.user = req.session.username;
  res.render("home", context);
});

app.use(function(req, res) {
  res.status(404);
  res.render("404");
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500);
  res.render("500");
});

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
