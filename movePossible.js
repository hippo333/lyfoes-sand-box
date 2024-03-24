var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var [bigBall,lstBigBall] = require('./bigBall');

console.log(columns);
console.log(lstBigBall);
move(0,3);
console.log(columns);

//return all ball who can go to
function placeFrom(to){
	let theColumn = columns[to];
	let theBall = theColumn[theColumn.length -1 ]
	//console.log("the ball", theBall);
	//console.log("for the column",columns[to],"the big ball is ",lstBigBall[to][0]);
	//list index of ball who can go to
	let colFrom = [];
	columns.filter(function (col, index) {
		//condition for go to the list
    	if (col[col.length -1 ] == theBall 
    	&& columns.indexOf(col) != to 
    	&& lstBigBall[columns.indexOf(col)][0] + columns[to].length <= 4) {
    	    colFrom.push(index);
    	    return true;
	    }
	});

	console.log("for ", theColumn,"whe can go from :",colFrom,);
}


let indexTargets =[]
columns.filter(function (cll, index) {
	//condition for go to the list
   	if (cll.length != 0 
   	&& cll.length <4){
   	    indexTargets.push(index);
   	    placeFrom(index);
   	    return true;
    }
});


/*

//take all columns not full
let lstTarget = columns.filter(
		cll => cll.length != 0
		&& cll.length <4
	);	
	
for (col in lstTarget){
	let theIndex = columns.indexOf(lstTarget[col]);
	indexTargets.push(theIndex);
	placeFrom(theIndex);
}*/

if (indexTargets.length == 0){
	console.log("we can't go nowere");
}	




	
	
//console.log(lstTarget);
//console.log(indexTargets);
