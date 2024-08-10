var Column = require('./column');
var [bigBall,lstBigBall] = require('./bigBall');
var columns = require('./level');

function coppyColumns(columns3){
	let output = [];
	let theCol = [];
	
	for(col in columns3){
		theCol = columns3[col];
		output.push(new Column(theCol));
	}
	return output
}

function cpArray(array){
	let output = [];
	
	let element = [];
	for(i in array){
		if(typeof(array[i]) != "object"){
			output.push(array[i]);
		}else{
			element = array[i].slice();
			output.push(element);
		}
	
	}
	return output
}


var coppy = function(state){
	let [columns2, lstBigBall2, lstOfMove2] = [[],[],[]];
	let [columns1, lstBigBall1, lstOfMove1] = state;
	
	
	columns2 = coppyColumns(columns1);
	lstBigBall2 = cpArray(lstBigBall1);
	lstOfMove2 = lstOfMove1.slice();
	
	
	let output = [columns2, lstBigBall2, lstOfMove2];
	
	console.log("output",output);
	return output
}
lstBigBall.push(0);
let a = coppy([columns,lstBigBall,[]]);
lstBigBall[0].push("ananas");
console.log(a);


module.exports = coppy;
