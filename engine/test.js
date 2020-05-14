let engine = require("./engine");
let {minMax, bestMove} = require("../minmax/algo");

module.exports.test = () => {
	
	let board = [2,1,0,
				 0,1,0,
				 0,2,2];
	/*console.log(board);
	let board2 = engine.copyBoard(board);
	console.log(board);
	console.log(board2);
	console.log(engine.win(board));
	console.log(engine.NONE);
	console.log(engine.CROSS);
	console.log(engine.CIRCLE);*/

	let res = minMax(board, 1);
	console.log(res, " ", bestMove(res, 1));

	/*res = minMax(board, 2);
	console.log(res, " ", bestMove(res, 2));*/
	
}