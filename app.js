require('dotenv').config();

var express = require('express');
var mysql = require("mysql");
var app = express();

var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user     : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_NAME
});

connection.connect(function(error){
	if (!!error){
		console.log('Error');
		console.error(error);
	} else{
		console.log('Connected');
	}
})


app.get('/', function(req,resp){
	//about mysql
	
	connection.query("SELECT * FROM order_buy", function(error, rows, field){
		//callback
		if(!!error){
			console.log ('error in the query');
			console.log(error.code)
		}else{
			//parse with your rows/fields
			console.log('Successful Query');
			var results = JSON.stringify(rows[0]);
			var jsonData = JSON.parse(results);
			resp.send(jsonData);

		}
	});
})

app.listen(15150);