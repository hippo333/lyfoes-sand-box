var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');

console.log(columns);
console.log(lstBigBall);


//show all col who contain 5
function locateBlue(){
	let lst =[]
	columns.filter(function (cll, index) {
		//condition for go to the list
   		if (cll.indexOf(5) != -1){
   		    lst.push(index);
   		    return true;
  		}
	});
	return lst
}

let lstColBlue= locateBlue();

console.log(lstColBlue);
