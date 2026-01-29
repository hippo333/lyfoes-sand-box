
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');



function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}

function otherColumn(col2){
	let theBigBll = columns0[col2].bigBall;
	let theBll = columns0[col2].top();
	
	let otherCol = columns0.findIndex(
		cll => cll.top() == theBll
		&& columns0.indexOf(cll) != col2
		&& cll.content.length + theBigBll <= 4
	);
	
	if(otherCol == -1){
		otherCol = emptyBotle()
	}
	return otherCol
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];


//set up



function nextCol(lstOfCol){
	//console.log("  nextCol");
	
	let lastCol = lstOfCol[lstOfCol.length -1];
	let thisCol = columns0[lastCol];
	let secondBll = thisCol.secondBall();
	//console.log("lastCol",lastCol,"secondBll",secondBll);
	
	let placeToFeed = 4-thisCol.content.length+thisCol.bigBall;
	
	let lstNextCol = columns0.filter(
		nxt => nxt.top() == secondBll
		&& nxt.bigBall + (thisCol.content.length- thisCol.bigBall) <=4		
	).map(x => columns0.indexOf(x));	
	
	if(lstNextCol.length !=0){
		return lstNextCol
	}
		
	
	let theColor = columns0.findIndex(
		clr => clr.color == secondBll
	);
	if(theColor ==-1){
		//console.log("  no color");
		
		theColor = columns0.findIndex(
			clr => clr.top() == secondBll
			&& clr.content.length + thisCol.secondBigBall() <=4
			
		);		
		
		if(theColor == -1){
			let firstEmpty = lstOfCol[0];
			let firstCol = lstOfCol[1];  
			let firstColumn = columns0[firstCol];
			if(firstColumn.top() == secondBll){
				//console.log("  you can go to firstEmpty");
				theColor = firstEmpty;
			}else{
				return []
			}
		}
	}
	//console.log("  the color",theColor);
	
	let thisMove = [lastCol,theColor];
	let thirdLevel =thisCol.content.length- thisCol.bigBall- thisCol.secondBigBall()-1 ;
	let thirdBll = thisCol.content[thirdLevel];
	
	if(thirdBll == undefined){return [thisMove]}
	placeToFeed--; //if second BigBall =1
	
	let nextStep = columns0.filter(
		nxt => nxt.top() == thirdBll
		&& nxt.bigBall + thirdLevel <4
	).map(x => columns0.indexOf(x));
	
	if(nextStep.length ==0){ return []}
	lstNextCol.push(thisMove,...nextStep);
	return lstNextCol
	
}

let lstOfCrissCross = [];
function crissCross(columns2,lstOfCol2){
	console.log("crissCross",lstOfCol2);
	
	if(lstOfCol2.length >= columns2.length){
		return
		throw Error("to many move");	//nececary?
	}
	
	let lstNextCol = nextCol(lstOfCol2);
	let itsArray = false;
	
	for(col of lstNextCol){
		let thisList = [...lstOfCol2];
		colAlreadyTry.push(col);
		
		if(typeof(col) == "object"){
			lstOfCol2.push(col)
			itsArray = true
			//throw Error("maybe remove this part");
			continue
		}
		if(thisList[1] ==col){
			console.log("we loop",thisList);
			
			let firstCol = columns0[thisList[0]];
			if(!firstCol.isEmpty()){continue}
			
			lstOfCrissCross.push(thisList);
			
		}else if(thisList.includes(col)){
			continue;
			
		}else if(columns2[col].isMonochrome()){//we free a botle
			console.log("col is monochrome");
			console.log("  col",col,columns0[col].content);
			thisList.push(col);
			console.log("thisList",thisList);
			lstOfCrissCross.push(thisList);
			
		}else{
			console.log("thisList",thisList);
			thisList.push(col);
			crissCross(columns2,thisList);
		}
	}
}


function doCrissCross(lstOfCol2){
	console.log("doCrissCross",lstOfCol2);
	
	let firstTarget = lstOfCol2.shift();
	let target = firstTarget;
	
	for(i in lstOfCol2){
		let col = lstOfCol2[i];
		if(i>0){
			target = lstOfCol2[i-1];
			if(typeof(target) == "object"){
				console.log("target",target);
				target = target[0];
			}
		}if(typeof(col) == "object"){
			[col,target] = col;
		}
		console.log("move",col,target);
		move(state,col,target);
	}
	let lastColFrom = lstOfCol2[lstOfCol2.length -1];
	if(typeof(lastColFrom) == "object"){lastColFrom = lastColFrom[0]}
	
	let lastFrom = columns0[lastColFrom];
	if(!lastFrom.isEmpty()){
		move(state,firstTarget,lastColFrom);
	}
	abstract(columns0);
}


let colAlreadyTry = [];
function main(state2){
	console.log("\ncrissCross");
	[columns0,lstOfMove] = state2;
	state = state2;
	lstOfCrissCross = []
	
	//if(emptyBotle() == -1){return false}
	let firstEmpty = emptyBotle();
	
	
	for(let i=0; i<columns0.length; i++){
		let target = firstEmpty
		if(target ==-1){
			target = otherColumn(i)
			if(target ==-1){continue}
		}
		
		crissCross(columns0,[target,i]);
	}
	
	let firstCrissCross = lstOfCrissCross[0];
	
	if(firstCrissCross == undefined){
		console.log("no crissCross");
		return false
	}else{
		doCrissCross(lstOfCrissCross[0]);
		return true
	}
}

module.exports = main


