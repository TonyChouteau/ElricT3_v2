let newBoard = () => {
	return [0,0,0,0,0,0,0,0,0];
}

let copyBoard = (board) => {
	return board.slice();
}

let win = (board) =>{
	if (board[0] == board[1] && board[1] == board[2] && board[0] !=0){
		return board[0];
	} 
	if (board[3] == board[4] && board[4] == board[5] && board[3] !=0){
		return board[3];
	} 
	if (board[6] == board[7] && board[7] == board[8] && board[6] !=0){
		return board[6];
	}

	if (board[0] == board[3] && board[3] == board[6] && board[0] !=0){
		return board[0];
	} 
	if (board[1] == board[4] && board[4] == board[7] && board[1] !=0){
		return board[1];
	} 
	if (board[2] == board[5] && board[5] == board[8] && board[2] !=0){
		return board[2];
	} 

	if (board[0] == board[4] && board[4] == board[8] && board[0] !=0){
		return board[0];
	} 
	if (board[2] == board[4] && board[4] == board[6] && board[2] !=0){
		return board[2];
	}

	return 0;
}

let nextTurn = (turn) => {
	if (turn == 1){
		return 2;
	} else if (turn == 2){
		return 1;
	}
	return 0;
}

let getNone = (board) => {
	let vals = [];
	for (let i in board){
		if (board[i] == 0){
			vals.push(i);
		}
	}
	return vals;
}

let display = (board) => {
	let d = "";
	for (let i in board){
		d += getChar(board[i])+' ';
		if (i%3 == 2){
			d += '\n';
		}
	}
	console.log(d);
}

let NONE = 0;
let CROSS = 1;
let CIRCLE = 2;

function getChar(code) {
	if (code == 1){
		return 'X';
	} else if (code == 2){
		return 'O';
	} else {
		return ' ';
	}
}