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

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.engine("handlebars", handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/static", express.static("public"));
app.set("view engine", "handlebars");
app.set("port", process.argv[2]);
app.set("mysql", mysql);

/**
 * Routes
 */
app.use("/create-account", require("./routes/create_account"));
app.use("/auth", require("./routes/auth"));
app.use("/user-edit", require("./routes/user_edit"));
app.use("/", require("./routes/login"));
app.use("/home", require("./routes/home"));
app.use("/logout", require("./routes/logout"));
app.use("/enter-lot", require("./routes/enter_lot"));
app.use(require("./routes/errors"));

app.listen(app.get("port"), function() {
  console.log(
    "Express started on http://localhost:" +
      app.get("port") +
      "; press Ctrl-C to terminate."
  );
});
