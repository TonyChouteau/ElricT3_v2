let express = require('express');
let path = require('path');

let eng = require("./engine/engine");
let mm = require("./minmax/algo");

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

app.listen(8085);

// let {test} = require("./engine/test");
// test();
