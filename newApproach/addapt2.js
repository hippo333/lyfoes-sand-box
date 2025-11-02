

var abstract = require('../tools/abstract');
var move = require('../tools/move');

let columns = [];
let lstOfMove = [];
let state =[];

let lastMove = [];
let newLst =[];

let lstTimeRedcon = [];



function emptyBotle(){
	
	for(let col=0 ; col<columns.length; col++){
		if(columns[col].isEmpty()){return col}
	}	
	return -1//no emptybotle
}

function otherBotle(col2,ball2){
	console.log("otherBotle col",col2,"ball",ball2)
	
	otherCol = columns.findIndex(
		x => x.top() == ball2
		&& columns.indexOf(x) != col2
		&& x.content.length <4
	);
	
	if(otherCol ==-1){otherCol = emptyBotle()}
	if(otherCol ==-1){
		throw Error("i can't find other Botle ");
	}
	return otherCol
}

function isNotFinish(){
	let colMix = columns.findIndex(
		x => !x.isMonochrome()
		&& !x.isEmpty()		
	);
	if(colMix != -1){return true}
	
	let emptyCols = columns.filter(
		x => x.isEmpty()
	);
	if(emptyCols.length <2){return true}
	
	return false	
}

//addapt all
let ballToMove = [];
function showWhatWeNeed(mv2,level2){
	//console.log("showWhatWeNeed",mv2);
	let [from,to] = mv2;
	let colFrom = columns[from];
	let colTo = columns[to];
	
	if(colFrom.isEmpty()){
		console.log("the colFrom is empty");
		return false
	}if(colTo.isFinish()){
		console.log("colTo is finish");
		return false
	}
	
	let thisMove = [mv];
	let bllAboveFrom = colFrom.content[level2-1];
	if(bllAboveFrom != undefined){thisMove.push(["colFrom",from,bllAboveFrom])}
	
	let bllAboveTo = colTo.content[level2-1];
	if(bllAboveTo != undefined){thisMove.push(["colTo",to,bllAboveTo])}
	
	ballToMove.push(thisMove);
	
	return true

}

//addaptAll
function develop(){
	console.log("develop");
	
	if(ballToMove.length >1){
		throw Error("to many ball to move",ballToMove);
	}
	thisMv = ballToMove[0];
	if(thisMv == undefined){return};
	
	for(let i=1;i< thisMv.length; i++){
		let [col,bll] = thisMv[i].slice(1);
		console.log("col and bll",col,bll);
		let secondCol = otherBotle(col,bll);
		console.log("col",col,"secondCol",secondCol);
		move(state,col,secondCol);
	}
	console.log("thisMv",...thisMv[0]);
	move(state,...thisMv[0]);
	
}

//addaptAll
function finish(level2){
	console.log("finish");
	
	let firstCol = -1;
	let secondCol = -1;
	for(i in columns){
		if(firstCol ==-1){
			firstCol = columns.findIndex(
				x => x.content.length == level2-1
			);
		}if(firstCol ==-1){
			firstCol = columns.findIndex(
				x => !x.isMonochrome()
				&& !x.isEmpty()
			)
			if(firstCol ==-1){return}
			secondCol = emptyBotle()
			move(state,firstCol,secondCol);
		}
		let theBall = columns[firstCol].top();
		secondCol = columns.findIndex(
			x=> columns.indexOf(x) != firstCol
			&& x.top() == theBall
		);
		move(state,secondCol,firstCol)
		firstCol = -1
		
	}
}


function addaptAll(lastLevel,level,state2){
	console.log("\naddaptAll level",level);
	console.log("lastLevel",lastLevel);
	[columns,lstOfMove] = state2;
	state = [columns,lstOfMove];
	
	console.log("lstOfMove",lstOfMove);
	abstract(columns);
	
	let lastLevel2 = [];
	for(mv of lastLevel){
		let thisMoveIsPosible = showWhatWeNeed(mv,level);
		if(thisMoveIsPosible){lastLevel2.push(mv);}
	}
	console.log("lastLevel2",lastLevel2);
	console.log("ball to move",ballToMove);
	
	develop();
	
	abstract(columns);
	finish(level);
	abstract(columns);
	if(isNotFinish()){
		throw Error("is not finish");
	}
}

module.exports = addaptAll
