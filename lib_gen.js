// Generate data set of 10000 per move (maybe allow for options later)
//


// Generating the learning data
function generateData() {
	var trainData = []

	for (i = 0; i<3; i++){
		var num = [1,2,3,4,5,6,7,8,9]
		trainData.push(shuffle(num))
	};
	return trainData;
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
