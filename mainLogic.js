// query string from database populates board.
var query = window.location.search.slice(7).split("");
// used later to check if player clicked the start game button.
var hasGameStarted = window.location.href.split(''); 
// access modal to popup when user clicks bomb.
var gameOver = document.getElementById('gameOverModal');

$(document).ready(function() {
	// check if player started game, the url will have query string.
	// if so hide the start game button and show the score button.
	if(hasGameStarted[21] === '/' && hasGameStarted[22] === '?') {
		$('#play-game').css('display', 'none');
		$('.the-score').css('display', 'inline');
	}
	
	// populate buttons with query string elements.
	for(let row=0; row< 16; row++){
		for(let column=0; column < 16; column++) {
			let id = "#row" + row + "_col" + column;
			let currQueryItem = query.splice(0,1);

			if($(id).val() === ".") {
				$(id).val(currQueryItem);
			}
		}
	}	
});

/*
	+ when clicked if button value is "x" it's a bomb.
	+ when clicked if button value is "-" check how many
		bombs around(up to 8) and assign that number.
	+ if no bombs around assign an empty space.
*/
$("button").on("click", function() {
	if($(this).val() === "x") {
		$(this).addClass('mine font-change').text("X");
		gameOver.style.display = "block";
	}else if($(this).val() === "-") {
		var count = 0;
		var id = this.id;
		var i = id.indexOf("_")
		var j = id.indexOf("l");
		var row = id.slice(3, i);
		var col = id.slice(j+1);
		
		var current = "#row" + row + "_col" + col;
		var top = "#row" + (parseInt(row)-1) + "_col" + col;
		var topLeft = "#row" + (parseInt(row)-1) + "_col" + (parseInt(col)-1);
		var topRight = "#row" + (parseInt(row)-1) + "_col" + (parseInt(col)+1);
		var currentLeft = "#row" + row + "_col" + (parseInt(col)-1);
		var currentRight = "#row" + row + "_col" + (parseInt(col)+1);
		var bottom = "#row" + (parseInt(row)+1) + "_col" + col;
		var bottomLeft = "#row" + (parseInt(row)+1) + "_col" + (parseInt(col)-1);
		var bottomRight = "#row" + (parseInt(row)+1) + "_col" + (parseInt(col)+1);
		
		// check how many bombs surround current button.
		if($(top).val() === "x"){count++};
		if($(topLeft).val() === "x") {count++};
		if($(topRight).val() === "x") {count++};
		if($(currentLeft).val() === "x") {count++};
		if($(currentRight).val() === "x") {count++};
		if($(bottom).val() === "x") {count++};
		if($(bottomLeft).val() === "x") {count++};
		if($(bottomRight).val() === "x") {count++};
		
		$(this).addClass('font-change');
		
		if(count > 0) {
			switch(count) {
				case 1:
						$(this).addClass('light-blue').text(count);
						break;
				case 2:
						$(this).addClass('yellow').text(count);
						break;
				case 3:
						$(this).addClass('orange').text(count);
						break;
				case 4:
						$(this).addClass('pinkred').text(count);
						break;
				case 5:
						$(this).addClass('pinkred').text(count);
						break;
				case 6:
						$(this).addClass('pinkred').text(count);
						break;
				case 7:
						$(this).addClass('pinkred').text(count);
						break;
				case 8:
						$(this).addClass('pinkred').text(count);
						break;
			}
			
			// increase score for every button clicked that's not a bomb.
			$(score).text(function(i, val) { return +val+1 });
			
		}else {
			$(this).addClass('none').text("0");
		}
	}
});