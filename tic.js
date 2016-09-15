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
			// combs.reduce((a, b) => a + b, 0);
		}
	}
	return combs;
};

// Generating the learning data
function generateData() {
	var trainData = []

	for (i = 0; i<100; i++){
		var num = [1,2,3,4,5,6,7,8,9]
		trainData.push(shuffle(num))
	};
	return trainData;
};

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

	console.log(trainData)
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

function buildLibrary (){
	var allTrainData = generateData();
	var allDataRows = []

	// this loops through each senario of the trainData
	for ( var i = 0; i < allTrainData.length; i+=1){
		allDataRows.push(buildingRow(allTrainData[i]))
	};

	return allDataRows;
};








// $(function(){
//
// 	var x = []
// 	var o = []
// 	var dataSet = []
// 	var num = [1,2,3,4,5,6,7,8,9]
//
// 	function check_15_x (){
// 		return $.inArray(15, k_combinations(x, 3)) < 0
// 	};
//
// 	function check_15_o (){
// 		return $.inArray(15, k_combinations(x, 3)) < 0
// 	};
//
// 	function shuffle(num) {
//     var j, x, i;
//     for (i = a.length; i; i--) {
//         j = Math.floor(Math.random() * i);
//         x = a[i - 1];
//         a[i - 1] = a[j];
//         a[j] = x;
//     }
// 		dataSet = dataSet.push(num)
// 	};
//
// 	while ( check_15_x() && check_15_o() ) {
// 		x = x.push(Math.random())
// 	};
//
// });
