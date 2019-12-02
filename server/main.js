/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();
var handlebars = require('express-handlebars').create({
        defaultLayout:'main',
        });

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));





app.get('/', function(request, response){
	response.sendFile(path.join(__dirname + '/login.html'));

});

app.post('/auth', function(request, response){
	var username = request.body.username;
	var password = request.body.password;

	var context = {};

	if(username && password){
		mysql.pool.query('SELECT * FROM UserTable WHERE username = ? AND password = ?'		 , [username, password], function(error,results,fields){
			if(results.length > 0){
				request.session.loggedin = true;
				context.user = results[0];
				request.session.u_id = context.user.u_id;
				request.session.username = username;
				response.render('home', results);
			}
			else {
				response.send('No user found with that combination!');
				response.end();
			}
			});
	}
	else{
		response.send('Enter username and password.');
		response.end();
	}

});


app.get('/user-edit', function(req, res){

	var context = {};

	//get the users data to populate the template
	mysql.pool.query('SELECT * FROM UserTable WHERE username = ?',
	req.session.username, function(error, results, fields){
		if(results.length > 0){
			context.user = results[0];
			res.render('user-edit', context);
		}
		else {
			res.send('DB error');
		}	 
	});		

});


app.post('/user-edit', function(req, res){

	var context = {};
	console.log(req.session.id);


	var sql = "UPDATE UserTable SET fname=?, lname=?, email=? WHERE u_id=?";
	var data = [req.body.fname, req.body.lname, req.body.email, req.session.u_id];

	sql = mysql.pool.query(sql, data, function(error, results, fields){
		
		if(error) {
			console.log("Error occured");
			console.log(error);
		}
		
	
	});

	res.render('home', context);
		

});


app.get('/logout', function(req, res) {
        req.session.destroy(function(err){
                  if(err){
                          console.log(err);
                          res.errorResponse(err.message,res);
                  }
                  else
                  {
                  res.sendFile(path.join(__dirname + '/login.html'));
		}
          });
  });





app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
