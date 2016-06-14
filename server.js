const express = require('express');
const app = express();
var Puzzle = require('./models/puzzle.js');

app.get('/', function(req, res) {
	res.set(200);
	res.setHeader('Content-Type', 'text/html');
	res.sendFile(__dirname + '/client/index.html');
});

app.get('/style.css', function(req, res){
	res.setHeader('Content-Type', 'text/css');
  res.sendFile(__dirname + '/client/style.css');
});

app.get('/mainLogic.js', function(req, res){
	res.setHeader('Content-Type', 'application/javascript');
  res.sendFile(__dirname + '/client/mainLogic.js');
});

app.get('/puzzle/:index', function(req, res) {
	Puzzle.find({index: req.params.index},
		function(err, data) {
				res.redirect("/" + "?board=" + data[0].board);
	})
})

app.get('/random', function(req, res) {
	var randomGame = Math.floor((Math.random() * 3) + 1);
	res.redirect("/" + "puzzle/" + randomGame);
})

app.listen(3000, function() {
	console.log("Listening on port 3000");
});