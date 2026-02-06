
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var [newVcolumn, Vupdate, Vcoppy] = require('../tools/Vcolumn');



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
let Vcolumn0 = [];
let state = [columns0,lstOfMove];


//set up


//nextCol
function removeLastTop(lstOfCol2,Vcolumn2){
	console.log("  -removeTop");
	
	let lastCol = lstOfCol2[lstOfCol2.length -1];
	if(typeof(lastCol) == "object"){lastCol = lastCol[0]};
	console.log("  -lastCol",lastCol,"ball",Vcolumn2[lastCol][0]);
	
	let lstTarget = Vcolumn2.filter(
		tgt => tgt[0] == Vcolumn2[lastCol][0]
		&& Vcolumn2.indexOf(tgt) != lastCol
		&& tgt[2] + Vcolumn2[lastCol][1] <= 4
	);
	console.log("  -lstTarget",lstTarget)
	
	if(lstTarget.length ==0){return []}
	
	let target = Vcolumn2.indexOf(lstTarget.find(//color
		clr => clr[1] == clr[2] //monochrome
	));
	if(target ==-1){
		console.log("  -no Color");
		target = Vcolumn2.indexOf(lstTarget[0]); 
	}
	if(target == -1){return []}
	
	console.log("  -target",target);
	let thisMove = [lastCol,target];
	return [thisMove]
}


function nextCol(lstOfCol,Vcolumn2){
	console.log("  nextCol");
	
	let lastCol = lstOfCol[lstOfCol.length -1];
	if(typeof(lastCol) == "object"){lastCol = lastCol[0]}
	
	let thisCol = columns0[lastCol];
	let secondBll = Vcolumn2[lastCol][0];
	console.log("  lastCol",lastCol,"secondBll",secondBll);
	
	//try to finish thisCol
	if(Vcolumn2[lastCol][1] == Vcolumn2[lastCol][2]){
		console.log("  lastCol isMono");
		//throw Error("debug");
		
		let toFinish = Vcolumn2.findIndex(
			cll => cll[0] == secondBll
			&& cll[2] + Vcolumn2[lastCol][1] <=4
			&& Vcolumn2.indexOf(cll) != lastCol
		);
		
		if(toFinish != -1){
			let thisMove = [lastCol,toFinish];
			console.log("for finish",thisMove,"\n");
			return [thisMove]
		}
	}
	
	
	let placeToFeed = 4-Vcolumn2[lastCol][2];
	
	let lstNextCol = Vcolumn2.filter(
		nxt => nxt[0] == secondBll
		&& nxt[1] + Vcolumn2[lastCol][2] <=4
		&& Vcolumn2.indexOf(nxt) != lastCol		
	).map(x => Vcolumn2.indexOf(x));	
	
	return lstNextCol
}

let lstOfCrissCross = [];
function crissCross(columns2,lstOfCol2,Vcolumn2){
	console.log("crissCross",lstOfCol2);
	
	
	let lstNextCol = nextCol(lstOfCol2,Vcolumn2);
	if(lstNextCol.length ==0){
		lstNextCol = removeLastTop(lstOfCol2,Vcolumn2);
	}
	
	for(col of lstNextCol){
		let thisList = [...lstOfCol2];
		console.log("col",col);
		let from = col;
		let to = thisList[thisList.length-1];
		console.log("from0",from,"to",to);
		
		if(typeof(from) == "object"){ [from,to] = from}
		if(typeof(to) == "object"){ to = to[0]}
		console.log("from1",from,"to",to);
		
		thisList.push(col);
		
		if(Vcolumn2[from][1] == Vcolumn2[from][2]){//we free a botle
			console.log("from is monochrome");
			console.log("  from",from,columns0[from].content);
			//thisList.push(from);
			console.log("thisList",thisList);
			lstOfCrissCross.push(thisList);
			
		}else{
			console.log("thisList",thisList);
			//thisList.push(from);
			
			let Vcolumn3 = Vcoppy(Vcolumn2);
			/*
			abstract(columns0)
			console.log("thisList",thisList);/*
			console.log("Vcolumn3",Vcolumn3);
			console.log("from2",from,"to",to);*/
			//throw Error("debug");
			Vupdate(columns0,Vcolumn3,[from,to]);
			
			crissCross(columns2,thisList,Vcolumn3);
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


function main(state2){
	console.log("\ncrissCross");
	[columns0,lstOfMove] = state2;
	state = state2;
	lstOfCrissCross = []
	Vcolumn0 = newVcolumn(columns0);
	
	//if(emptyBotle() == -1){return false}
	let firstEmpty = emptyBotle();
	
	
	for(let i=0; i<columns0.length; i++){
		if(columns0[i].isEmpty()){continue}
		if(columns0[i].isFinish()){continue}
		let target = firstEmpty
		if(target ==-1){
			target = otherColumn(i)
			if(target ==-1){continue}
		}
		let Vcolumn2 = Vcoppy(Vcolumn0);
		Vupdate(columns0,Vcolumn2,[i,target])
		crissCross(columns0,[target,i],Vcolumn2);
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


