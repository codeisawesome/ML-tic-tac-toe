$(function(){

  // All the cool things that happens when a player makes a move
  $('td').click( function(e){
    playerMove(this)
    // createXnO(this)
  });

  // Resets the board
  $('#reset').click( function(){ resetgame() });

  $('#start').click( function(){ buildLibrary() });

  // when a person click I want to be able to store that move
  var allMovesTracking = []
  // xocounter is used to keep track of whether to put x or o on the board
  xocounter = 1

  //reset the game
  function resetgame(){
    $('.play').remove()
    allMovesTracking = []
  };

  // this checks if the square has been clicked on before nothing happens
  // else, playerMove calls logMove to log the move
  function playerMove(squareClicked){
    var squareId = parseInt(squareClicked.id)
    // console.log(squareId)

    // check to see if the squareID is already in allMovesTracking (ie. have
    // been played before)
    if(allMovesTracking.indexOf(squareId) < 0){
      logMove(squareClicked)
      createXnO(squareClicked)
    }
    else
    {
      console.log("can't play there")
    }
  };

  //log player's move
  function logMove(squareClicked){

    // parse eg. td#9 into int 9, parseInt(squareClicked.id)
    // pushes it into allMovesTracking for tracking
    allMovesTracking.push(parseInt(squareClicked.id))

    console.log(allMovesTracking)
  };


  // odd gives X, even gives O
  function createXnO(e) {
		xocounter++

		if (xocounter%2 == 0)
			$(e).append('<div class=play>x<div>');
		else
			$(e).append('<div class=play>o<div>');
	};


});
