let engine = require("../engine/engine");

module.exports.minMax = (board, turn) => {

	let moves = engine.getNone(board);
	let prices = {};

	for (let i in moves) {
		let newBoard = engine.copyBoard(board);
		newBoard[moves[i]] = turn;
		//engine.display(newBoard);
		prices[moves[i]] = recursive(newBoard, engine.nextTurn(turn), 1);
	}
	//console.log(prices);
	return prices;
}

function recursive(board, turn, ad){
	let moves = engine.getNone(board);

	//console.log(moves);
	let win = engine.win(board);

	if (win == engine.CROSS) {
		return 100/ad;
	} else if (win == engine.CIRCLE) {
		return -100/ad;
	} else if (moves.length == 0){
		return 0;
	}

	let prices = {};
	for (let i in moves){
		let newBoard = engine.copyBoard(board);
		newBoard[moves[i]] = turn;
		//engine.display(newBoard);
		
		prices[moves[i]] = recursive(newBoard, engine.nextTurn(turn), ad+1);
	}

	/*if (ad==1){
		engine.display(board);
		console.log(prices);
	}*/
	//console.log(prices);
	
	//console.log(prices);

	/*let sum = 0;
	for (let i in prices){
		sum += prices[i];
	}*/
	//console.log("best : "+module.exports.bestOf(prices, turn));

	return module.exports.bestOf(prices, turn);
}

module.exports.bestOf = (prices, turn) => {
	let best;
	if (turn == engine.CROSS){
		best = -100000000000;
	} else {
		best = 100000000000;
	}
	for (let i in prices){
		//console.log(i);
		if (turn == engine.CROSS) {
			if (best < prices[i]){
				best = prices[i];
			}
		} else {
			if (best > prices[i]){
				best = prices[i];
			}
		}
	}

	return best;
}

module.exports.bestMove = (prices, turn) => {
	let best;
	if (turn == engine.CROSS){
		best = -100000000000;
	} else {
		best = 100000000000;
	}
	let index = 0;
	for (let i in prices){
		//console.log(i);
		if (turn == engine.CROSS) {
			if (best < prices[i]){
				index = i;
				best = prices[i];
			}
		} else {
			if (best > prices[i]){
				index = i;
				best = prices[i];
			}
		}
	}

	return index;
}