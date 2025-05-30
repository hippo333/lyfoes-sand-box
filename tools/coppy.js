var Column = require('./column');
var columns = require('../level');

function coppyColumns(columns3){
	let output = [];
	let theCol = [];
	
	for(col in columns3){
		theCol = columns3[col].content;
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
	let [columns2, lstOfMove2] = [[],[],[]];
	let [columns1, lstOfMove1] = state;
	
	
	columns2 = coppyColumns(columns1);
	lstOfMove2 = cpArray(lstOfMove1);
	
	
	let output = [columns2, lstOfMove2];
	
	//console.log("output",output);
	return output
}




module.exports = coppy;
