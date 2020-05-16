let board = newBoard();
let turn = CROSS;
let playerTurn = turn;

function setup(){
	let canvas = createCanvas(900,900);
}

function mouseClicked(event){
	if (event.target.id == "defaultCanvas0" && turn == playerTurn) {
		turn = nextTurn();
		let index = Math.floor(mouseY/(height/3))*3+Math.floor(mouseX/(width/3));
		if (board[index] == 0){
			board[index] = 1;
		}
		
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
}