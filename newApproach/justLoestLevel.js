var column = require('../tools/column');
var columns = require('../level');


let groundLevel = [];

for(col of columns){
	let groundOfCol = col.content.splice(1,1);
	groundLevel.push(groundOfCol);

}

console.log(groundLevel);

//set up




let columns0 = groundLevel;


function isMonochrome(column2){
	//column0 is an array
	if(column2.length <2){return false}
	
	for(let bll=1; bll< column2.length;bll){
		let thisBll = column2[bll];
		let previousBll = column2[bll-1];
		if (thisBll != previousBll){
			return false
		}		
	}
	return true
}

function getColor(idColFrom,columns2){
	let colFrom = columns2[idColFrom];
	let theBall = colFrom.slice(-1)[0];	//top ball
	let resquieSolution = -1;
	
	for(let col=0;col<columns2.length; col++){
		let thisCol = columns2[col];
		
		if(thisCol.length ==0){continue};
		if(col == idColFrom){continue}
		
		if(thisCol.slice(-1)[0] != theBall){continue}
		
		if(isMonochrome(thisCol)){return col}
		
		if(thisCol.length ==1){
			if(colFrom.length ==1){
				if(col < idColFrom){
					return col	
				}	
			}
		}
		
	}
	return -1 //no move possible
}

for (let col=0 ; col<columns0.length; col++){
	if(columns0[col].length == 0){continue}
	
	let theColor = getColor(col,columns0);
	
	if(theColor ==-1){
		console.log("the col",col,"can't move");
	}else{
		console.log("the ball from",col,"can go to ",theColor);
	}
}








