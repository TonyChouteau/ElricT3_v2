let express = require('express');
let path = require('path');

let eng = require("./engine/engine");
let mm = require("./minmax/algo");

var fs = require('fs');
var http = require('http');
var https = require('https');

var privateKey  = fs.readFileSync('/etc/letsencrypt/live/vps.thomaslepercq.fr/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/vps.thomaslepercq.fr/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();

//=========================
// Static files

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/web/index.html'));
});

app.get('/index.css', function (req, res) {
	res.sendFile(path.join(__dirname + '/web/index.css'));
});

app.get('/index.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/web/index.js'));
});
app.get('/engine.js', function (req, res) {
	res.sendFile(path.join(__dirname + '/web/engine.js'));
});
app.get('/font', function (req, res) {
	res.sendFile(path.join(__dirname + '/web/font/font.ttf'));
});

//=========================
// MinMax API

app.get('/ai/:board/:turn', function (req, res) {
	
	let nb = req.params.board;
	let turn = req.params.turn;

	let board = eng.boardFromUrl(nb);
	
	let results = mm.minMax(board, turn);
	let choice =  mm.bestMove(results, turn);
	eng.display(board);
	console.log("- AI ->", results, " - Choice -> ", choice);

	res.json({
		result: results,
		choice: choice,
		turn: turn,
	})
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(3333);

// let {test} = require("./engine/test");
// test();
