let board = newBoard();
let turn = CROSS;
let playerTurn = turn;
let played = false;

let end = false;

let font;
function preload() {
	font = loadFont('./font');
}

function setup(){
	let canvas = createCanvas(600,600);
}

function endGame(){
	let w = win(board);
	let str = "";
	
	if (w == playerTurn){
		fill(0,255,0);
		str = "Win"
	} else if (w == nextTurn(playerTurn)){
		fill(255,0,0);
		str = "Loose"
	} else {
		fill(100,100,100);
		str = "Tie"
	}
	
	let textH = 300;
	textSize(textH);
	textFont(font);
	noStroke();

	let textW = textWidth(str);

	text(str,width/2-textW/2,height/2+textH/3);
}

function reset(){
	board = newBoard();
	turn = CROSS;
	playerTurn = turn;
	played = false;

	end = false;
}

function mouseClicked(event){
	if (event.target.id == "defaultCanvas0" && turn == playerTurn && !played) {
		played = true;
		turn = nextTurn(turn);
		let index = Math.floor(mouseY/(height/3))*3+Math.floor(mouseX/(width/3));
		if (board[index] == 0 && win(board) == NONE){
			board[index] = playerTurn;
			console.log(window.location.href+"ai/"+board.join("")+"/"+turn);
			if (win(board) == NONE && getNone(board).length != 0){
				fetch(window.location.href+"ai/"+board.join("")+"/"+turn)
				.then((response) => {return response.json()})
					.then((data) => {
						console.log(data);
						board[data.choice] = data.turn;
						turn = nextTurn(turn);
						played = false;
					})
			}
		}
	}
	if (event.target.id == "defaultCanvas0" && end == true){
		reset();
	}
}

function keyPressed(){
	if (getNone(board).length == 9 && !played){
		played = true;
		playerTurn = nextTurn(playerTurn);
		fetch(window.location.href+"ai/"+board.join("")+"/"+turn)
				.then((response) => {return response.json()})
					.then((data) => {
						console.log(data);
						board[data.choice] = data.turn;
						turn = nextTurn(turn);
						played = false;
					})
	}
}

function draw(){
	for (let i=0; i<3; i++) {
		for (let j=0; j<3; j++) {
			stroke(0);
			strokeWeight(1);
			fill(255);
			rect(j*width/3, i*height/3, width/3, height/3);
			if (board[i*3+j] == 1){
				strokeWeight(10);
				line(j*width/3+width/15, i*height/3+height/15, j*width/3-width/15+width/3, i*height/3-height/15+height/3);
				line(j*width/3+width/15, i*height/3-height/15+height/3, j*width/3-width/15+width/3, i*height/3+height/15);
			} else if (board[i*3+j] == 2){
				noFill();
				strokeWeight(10);
				ellipse(j*width/3+width/6, i*height/3+height/6, width/3-width/10, height/3-height/10);
			}
			/*switch(board[i*3+j]){
				case 0:
					fill(255);
					break;
				case 1:
					fill(0,0,255);
					break;
				case 2:
					fill(255,0,0);
					break;
			}*/
		}
	}
	if (win(board) != 0 || getNone(board).length == 0){
		end = true;
		endGame();
	}
}