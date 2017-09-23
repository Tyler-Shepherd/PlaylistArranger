/* Load the HTTP library */
var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var child_process = require('child_process');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(express.static(path.join(__dirname, 'public')));

require('./main.js')(app);
app.set('views','public/pages');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

var server = app.listen(8888, function(){
	var port = server.address().port;

	console.log("App listening at port %s", port);
})