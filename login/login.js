
var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('port', process.argv[2]);
app.set('mysql', mysql);


app.get('/', function(request, response){
	response.sendFile(path.join(__dirname + '/login.html'));
});


app.post('/auth', function(request, response){
	var username = request.body.username;
	var password = request.body.password;

	if(username && password){
		mysql.pool.query('SELECT * FROM UserTable WHERE username = ? AND password = ?'		 , [username, password], function(error,results,fields){
			if(results.length > 0){
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			}
			else {
				response.send('No user found with that combination!');
			}
			response.end();
			});
	}
	else{
		response.send('Enter username and password.');
		response.end();
	}

});

//i've posted two options because I wasn't sure which we should use

var logout=function(request, response, next){
	request.session.loggedIn=false;
	response.redirect('/login.html');
};

//OR
//http://www.coding4developers.com/node-js/login-and-register-in-node-js-mongo-db-session-in-node-js/

app.get('/logout', function(req, res) {
	req.session.destroy(function(err){  
		  if(err){  
			  console.log(err); 
			  Response.errorResponse(err.message,res); 
		  }  
		  else  
		  {  
			  Response.successResponse('User logged out successfully!',res,{}); 
		  }  
	  });
  });



app.listen(app.get('port'), function(){
	console.log('Express started on http://localhost:' + app.get('port') +
	'; press Ctrl-C to terminate.');
});
