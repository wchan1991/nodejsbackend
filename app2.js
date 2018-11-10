require('dotenv').config();


var express   =    require("express");
var mysql     =    require('mysql');
var app       =    express();

var connection = mysql.createConnection({
	host: process.env.DB_HOST,
	user     : process.env.DB_USER,
	password : process.env.DB_PASSWORD,
	database : process.env.DB_NAME
});

connection.connect(function(error){
	if (!!error){
		console.log('Error');
	} else{
		console.log('Connected');
	}
})


app.get('/', function(req,resp){
	//about mysql
	connection.query("SElECT * FROM order_buy LIMIT 1", function(error, rows, field){
		//callback
		if(!!error){
			console.log ('error in the query');

		}else{
			//parse with your rows/fields
            console.log('Successful Query');
            
			//console.log (typeof(rows));
			resp.send(JSON.stringify(rows, null, 4));

		}
	});
})

app.listen(4041);