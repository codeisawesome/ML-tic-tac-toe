/**
 * K-combinations
 *
 * Get k-sized combinations of elements in a set.
 *
 * Usage:
 *   k_combinations(set, k)
 *
 * Parameters:
 *   set: Array of objects of any type. They are treated as unique.
 *   k: size of combinations to search for.
 *
 * Return:
 *   Array of found combinations, size of a combination is k.
 *
 * Examples:
 *
 *   k_combinations([1, 2, 3], 1)
 *   -> [[1], [2], [3]]
 *
 *   k_combinations([1, 2, 3], 2)
 *   -> [[1,2], [1,3], [2, 3]
 *
 *   k_combinations([1, 2, 3], 3)
 *   -> [[1, 2, 3]]
 *
 *   k_combinations([1, 2, 3], 4)
 *   -> []
 *
 *   k_combinations([1, 2, 3], 0)
 *   -> []
 *
 *   k_combinations([1, 2, 3], -1)
 *   -> []
 *
 *   k_combinations([], 0)
 *   -> []
 */
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

	// Assert {1 < k < set.length}

	// Algorithm description:
	// To get k-combinations of a set, we want to join each element
	// with all (k-1)-combinations of the other elements. The set of
	// these k-sized sets would be the desired result. However, as we
	// represent sets with lists, we need to take duplicates into
	// account. To avoid producing duplicates and also unnecessary
	// computing, we use the following approach: each element i
	// divides the list into three: the preceding elements, the
	// current element i, and the subsequent elements. For the first
	// element, the list of preceding elements is empty. For element i,
	// we compute the (k-1)-computations of the subsequent elements,
	// join each with the element i, and store the joined to the set of
	// computed k-combinations. We do not need to take the preceding
	// elements into account, because they have already been the i:th
	// element so they are already computed and stored. When the length
	// of the subsequent list drops below (k-1), we cannot find any
	// (k-1)-combs, hence the upper limit for the iteration:
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


function generateData() {
	var trainData = []
	var num = [1,2,3,4,5,6,7,8,9]
	for (i = 0; i<100; i++){
		array = shuffle(num)
		trainData.push(array)
	};
	return trainData;
};

function shuffle(a) {
	var j, x, i;
	for (i = a.length; i; i--) {
			j = Math.floor(Math.random() * i);
			x = a[i - 1];
			a[i - 1] = a[j];
			a[j] = x;
	}
	return a;
};

function buildLibrary (){
	var dataRows = []
	// this loops through each senario of the trainData
	for (i = 0; i < trainData.length; i++){
		// this loops through element of trainData[i] array and assign them
		// to array x and array o, while checking is anyone won
		for (j = 0; j < trainData[i].length; j++){
			// check if x and o did not win
			if ( check_15_x() && check_15_o() ){
				// push element into x and dataRows
				x.push.trainData[i][j]
				dataRows.push.trainData[i][j]
			};
			else {
				return dataRows.push(0);
			};
			// check if x and o did not win
			if ( check_15_x() && check_15_o() ){
				// push element into o and dataRows
				o.push.trainData[i][j+1]
				dataRows.push.trainData[i][j+1]
			};
		};else {
			return dataRows.push(1);
		}
	};
};

// Check if x has a winning combo of 3
function check_15_x (){
	return $.inArray(15, k_combinations(x, 3)) < 0
};

// Check if o has a winning combo of 3
function check_15_o (){
	return $.inArray(15, k_combinations(x, 3)) < 0
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
