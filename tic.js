function k_combinations(set, k) {
	var i, j, combs, head, tailcombs;

	// There is no way to take e.g. sets of 5 elements from
	// a set of 4.
	if (k > set.length || k <= 0) {
		return [];
	}

	// K-sized set has only one K-sized subset.
	if (k == set.length) {
		var sum = set.reduce(function (a,b){return a + b; }, 0);
		return [sum];
	}

	// There is N 1-sized subsets in a N-sized set.
	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		// head is a list that includes only our current element.
		head = set.slice(i, i + 1);
		// We take smaller combinations from the subsequent elements
		tailcombs = k_combinations(set.slice(i + 1), k - 1);
		// For each (k-1)-combination we join it with the current
		// and store it to the set of k-combinations.
		for (j = 0; j < tailcombs.length; j++) {
			var sum = head.concat(tailcombs[j]).reduce(function (a,b){return a + b; }, 0);
			combs.push(sum);
		}
	}
	return combs;
};

// Generating the learning data
function generateData() {
	var trainData = []

	for (i = 0; i<500000; i++){
		var num = [1,2,3,4,5,6,7,8,9]
		trainData.push(shuffle(num))
	};
	return trainData;
};

// Fisher–Yates Shuffle
function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

// Check if x has a winning combo of 3
function check_15_x (x){
	// This checks is 15 is in the combo. .inArray returns -1 if not true
	return $.inArray(15, k_combinations(x, 3)) < 0
};

// Check if o has a winning combo of 3
function check_15_o (o){
	// This checks is 15 is in the combo. .inArray returns -1 if not true
	return $.inArray(15, k_combinations(o, 3)) < 0
};

// this loops through element of trainData[i] array and assign them
// to array x and array o, while checking if anyone won
function buildingRow (trainData){
	var x = []
	var o =[]
	var dataRow = []
	var abort = false

	// console.log(trainData)
	for (var j = 0; j <= trainData.length; j+=2){
		// check if x and o did not win
		if ( check_15_x(x) && check_15_o(o) ){
			// push element into x and dataRows
			x.push(trainData[j])
			// console.log(x)
			dataRow.push(trainData[j])
		}
		else {
			// Adding 1 at the end for winning
			dataRow.push(1)
			// console.log(dataRow)
			return dataRow;
		};
		// check if x and o did not win
		if ( check_15_x(x) && check_15_o(o) ){
			// push element into o and dataRows
			o.push(trainData[j+1])
			dataRow.push(trainData[j+1])
		}
		else {
			// Adding 0 at the end for losing
			dataRow.push(0)
			// console.log(dataRow)
			return dataRow;
		};
	};
	return dataRow;
};

// This builds the library of training data by looking through randomly
// generated array, check to see at which point x won
// if x won, 1 is attached to the end of the array
// if o won, 0 is attached to the end of the array
// the training if the end of the array is reached(Draw with array.length = 10)
// or if someone won
function buildLibrary (){
	var allTrainData = generateData();
	var allDataRows = []

	// this loops through each senario of the trainData
	for ( var i = 0; i < allTrainData.length; i+=1){
		allDataRows.push(buildingRow(allTrainData[i]))
	};

	return allDataRows;
};


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
