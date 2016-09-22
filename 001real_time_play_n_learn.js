$(function(){

// All the cool things that happens when a player makes a move
  $('td').click( function(e){
    playerMoveLog(this) });

  $('button').click( function(){ createLibrary() });

// when a person click I want to be able to store that move
  var allMovesTracking = []

  function playerMoveLog(squareClicked){
    var squareId = squareClicked.id
// parse eg. td#9 into int 9
    allMovesTracking.push(parseInt(squareId))
    console.log(allMovesTracking)
  };
// when a person click I want an x to appear where he clicked



});
