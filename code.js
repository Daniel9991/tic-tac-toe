let cells = [];
let current_token = 'X';
const current_player = document.querySelector("#current-player-heading");

let players = {X: '', O: ''};

const pop_up = document.querySelector("#pop-up-message");
function write_pop_up(message){
	pop_up.textContent = message;
	pop_up.style.display = 'block';
	pop_up.style.opacity = '1';
	setTimeout(() => {
		pop_up.style.opacity = '0';
	}, 2000);
	setTimeout(() => {
		pop_up.style.display = 'none';
	}, 2600);
}


document.querySelector("#play-button").addEventListener('click', () => {
	let name1 = document.querySelector("#player1-input").value.trim();
	if(name1 === ''){
		document.querySelector("#wrong-player1-input").style.visibility = "visible";
	}
	else{
		document.querySelector("#wrong-player1-input").style.visibility = "hidden";
	}

	let name2 = document.querySelector("#player2-input").value.trim();
	if(name2 === ''){
		document.querySelector("#wrong-player2-input").style.visibility = "visible";
	}
	else{
		document.querySelector("#wrong-player2-input").style.visibility = "hidden";
	}

	if(name1 !== '' && name2 !== ''){
		document.querySelector("#registration-form").style.display = "none";
		players.X = name1;
		players.O = name2;
		create_game();
	}
});






document.querySelector("#restart-button").addEventListener('click', create_game);

const combinations = {
	0 : [[0, 1, 2], [0, 4, 8], [0, 3, 6]],
	1 : [[0, 1, 2], [1, 4, 7]],
	2 : [[0, 1, 2], [2, 4, 6], [2, 5, 8]],
	3 : [[0, 3, 6], [3, 4, 5]],
	4 : [[3, 4, 5], [1, 4, 7], [0, 4, 8], [6, 4, 2]],
	5 : [[2, 5, 8], [3, 4, 5]],
	6 : [[0, 3, 6], [6, 4, 2], [6, 7, 8]],
	7 : [[6, 7, 8], [1, 4, 7]],
	8 : [[2, 5, 8], [0, 4, 8], [6, 7, 8]],
}

function cell(index, token){
	this.index = index;
	this.token = token;
}


function check_for_victory(index){
	for(let comb of combinations[index]){
		let trio = cells.filter(c => comb.includes(c.index));
		if(trio.every(c => c.token === current_token)) return trio.map(c => c.index);
	}
	return false;
}


function finish_on_victory(trio){
	for(let element of document.querySelectorAll('.cell')){
		if(trio.includes(Number(element.id[element.id.length-1]))) element.className = 'winner cell';
		else element.className = `blocked ${element.className}`;
	}
	write_pop_up(`${players[current_token]} has won!`);
}


function finish_turn(){
	if(!cells.some(c => c.token === 'none')) write_pop_up("Empate!")
	else if(current_token === 'X'){
		current_token = 'O';
		current_player.textContent = `It is ${players[current_token]}'s turn`;
	}
	else{
		current_token = 'X';
		current_player.textContent = `It is ${players[current_token]}'s turn`;
	}
}


function react_to_pressing(element){
	let index = element.id[element.id.length - 1];

	if(cells[index].token === 'none' && !element.className.includes('blocked')){
		element.className = 'pressed cell';
		element.textContent = current_token;

		cells[index].token = current_token;

		let victory = check_for_victory(index);

		if(typeof victory === 'object') finish_on_victory(victory);
		else finish_turn();
	}
}


function create_game(){
	cells = [];
	current_token = 'X';
	current_player.textContent = `It is ${players[current_token]}'s turn`;

	let cell_elements = document.querySelectorAll('.cell');
	for(let el of cell_elements){
		el.className = "unpressed cell";
		el.addEventListener('click', (ev) => {
			react_to_pressing(ev.target);
		});
	}
	for(let i = 0; i < 9; i++){
		cells.push(new cell(i, 'none'));
	}
}

create_game();