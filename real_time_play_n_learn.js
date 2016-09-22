$(function(){

	$('td').click( function(e){ trackingPlays(this) });
	$('button').click( function(){ createLibrary() });

	// $('td').click( function(e){ createXnO(this) });


	// Creating an array to track the plays
	var playsTracking = []

	// Counter to count which move it is
	var counter = 0

	// Counter for createXnO to avoid race condition
	var xocounter = 1
	// when start is pressed, library gets generated
	var library = []

	function createXnO(e) {
		xocounter++

		if (xocounter%2 == 0)
			$(e).append('x');
		else
			$(e).append('o');
	};

	// creates the machine library
	function createLibrary(){
		library = buildLibrary()
		// console.log(library)
		return library;
	};

	// to check if two arrays are equal
	function arraysEqual(arr1, arr2) {
    if(arr1.length !== arr2.length)
        return false;
    for(var i = arr1.length; i--;) {
        if(arr1[i] !== arr2[i])
            return false;
    }
    return true;
	};

// set up gunction to generat moves
// wehn calling the function
// can either pass in the moves
// if not moves pass in, it would generate


	function trackingPlays(squareToTrack){

		createXnO(squareToTrack)
		// Counts which move we are on
		counter++

		// Returns binded number to the clicked square
		var text = squareToTrack.id
		playsTracking.push(parseInt(text))
		// console.log(counter)
		console.log(playsTracking + " " + "playsTracking")

		// Used to store all potential paths according to database
		var tempDataSet = []

		// List of next move with highest probability
		var nextMovesProb = []

		console.log(library)

		// this looks through the library and select those that are equal to
		// the play so far
		for (var i = 0; i < library.length; i++){
			// console.log(library[i] + "library-i")
			var checkEqualString = arraysEqual(library[i].slice(0,counter), playsTracking)
			var checkEqualElement = arraysEqual(library[i].slice(-1), [1])

		// This checks through the library
		// Check to see if row starts the same as playsTracking
		// Check to see row does not end in "1"
			if ( checkEqualString && checkEqualElement){
				tempDataSet.push(library[i])
			};
		};
		console.log(tempDataSet)

		for (i = 1; i < 10; i++){
			var positionProb = tempDataSet.map(function(ary){ return ary[counter] })
																		.filter(function(num){ return num == i}).length
			nextMovesProb.push(positionProb/tempDataSet.length)
		};
		// Compute number of appearances of each number within tempDataSet
		// console.log(nextMovesProb)
		var nextMove = indexOfMax(nextMovesProb) + 1
		console.log(nextMove)

		playsTracking.push(nextMove)
		// console.log(playsTracking)

		// this makes computer indicate where to play
		$("td[id*=" + nextMove + "]").append('o')

		xocounter++


	// console.log(tempDataSet.length / library.length)
	};


	// Returning the highest value
	function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
	};

});


// unfinished features
// - a nice background
// - a nice color
// - nice animation when won
// - animation whne seecting difficulting levels
// - restart button
// - can set difficulty level
// - can select whether to play aginst human or computer
