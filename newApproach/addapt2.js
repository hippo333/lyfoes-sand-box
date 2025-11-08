

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

let lstOfMovement = [];
let lastLstOfMovement = [];
class Movement {
	mv = []
	bigBall = 0
	ballWeFree = -1
	spaceFree = 0
	spaceWeUse = -1
	level = 0
	
	constructor(from,to,level){
		this.bigBall = columns[from].bigBall
		this.mv = [from,to,this.bigBall]
		this.ballWeFree = columns[from].secondBall()
		this.spaceFree = 4-columns[from].content.length+ this.bigBall
		this.spaceWeUse = 4-columns[to].content.length
		this.level = level
	}
	
}

function noteTheRain(level2){
	console.log("noteTheRain, level",level2);
	console.log("lstOfMove",lstOfMove);
	lastLstOfMovement = lstOfMovement;
	lstOfMovement = [];
	
	for(thisMove of lstOfMove){
		let [from,to,bigBll] = thisMove;
		let thisMovement = new Movement(from,to,level2);
		
		thisMovement.bigBall = bigBll;
		thisMovement.ballWeFree = columns[from].top();
		thisMovement.spaceWeFree = bigBll;
		thisMovement.spaceWeUse = bigBll;
		
		//if the same col ave been move multiple time
		let previousMovement = lstOfMovement.find(
			prvMv => prvMv.mv[0]
		);
		if(previousMovement != undefined){
			previousMovement.spaceWeFree -= bigBll;
			previousMovement.ballWeFree = columns[to].top()
			
		}
		
		lstOfMovement.push(thisMovement);
	}
	
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
let newEmptyBotle = -1;
function showWhatWeNeed(mv2,level2){
	console.log("showWhatWeNeed",mv2);
	let [from,to] = mv2;
	
	let lastEmptyBtl = lstOfMove[0][1];
	if(from == lastEmptyBtl){from = newEmptyBtl; mv2[0] = from}
	if(to == lastEmptyBtl){to = newEmptyBtl; mv2[1] = to}
	
	let colFrom = columns[from];
	let colTo = columns[to];
	
	if(colFrom.isEmpty()){
		console.log("the colFrom is empty");
		return false
	}if(colFrom.content.length < level2-1){
		console.log("the Move is corupt");
		return false
	}if(colTo.isFinish()){
		console.log("colTo is finish");
		return false
	}
	
	let thisMove = [mv];
	let bllAboveFrom = colFrom.content[level2-2];
	if(bllAboveFrom != undefined && bllAboveFrom !=colFrom.content[level2-2]){
		thisMove.push(["colFrom",from,bllAboveFrom])
	}	
	let bllAboveTo = colTo.content[level2-2];
	if(bllAboveTo != undefined && bllAboveTo != colTo.content[level2-2]){
		thisMove.push(["colTo",to,bllAboveTo])
	}
	ballToMove.push(thisMove);
	
	return true

}

//addaptAll
function develop(level2){
	console.log("develop");
	
	if(ballToMove.length >1){
		console.log("lstOfMovement",lstOfMovement);
		throw Error("to many ball to move",ballToMove);
	}
	thisMv = ballToMove[0];
	if(thisMv == undefined){return};
	
	for(let i=1;i< thisMv.length; i++){
		let [col,bll] = thisMv[i].slice(1);
		console.log("col and bll",col,bll);
		let secondCol = otherBotle(col,bll);
		console.log("col",col,"secondCol",secondCol);
		lstOfMovement.push(new Movement(col,secondCol));
		move(state,col,secondCol,level2);
	}
	console.log("thisMv",...thisMv[0]);
	lstOfMovement.push(new Movement(...thisMv[0],level2));
	move(state,...thisMv[0]);
	
}

//addaptAll
function inventoryOfBall(ball2){
	//console.log("inventoryOfBall");
	let inventory = columns.map(x => x.content);
	inventory = [].concat(...inventory);
	let count = inventory.filter(
		x => x==ball2
	);
	return count.length
}

//addaptAll
function finish(level2){
	console.log("finish");
	
	
	let firstCol = -1;
	let secondCol = -1;
	let lstColOver = [];
	for(i in columns){
		firstCol = columns.findIndex(
			x => !x.isEmpty()
			//&& x.content.length < level2-1 //here
			&& x.content.length < inventoryOfBall(x.content[0])
			&& !lstColOver.includes(columns.indexOf(x))
		);
		if(firstCol ==-1){
			firstCol = columns.findIndex(
				x => !x.isMonochrome()
				&& !x.isEmpty()
			)
			if(firstCol ==-1){return}
			secondCol = emptyBotle()
			console.log("we free place",firstCol,secondCol);
			lstOfMovement.push(new movement(firstCol,secondCol,level2));
			move(state,firstCol,secondCol);
		}
		let theBall = columns[firstCol].top();
		secondCol = columns.findIndex(
			x=> columns.indexOf(x) != firstCol
			&& x.top() == theBall
		);
		if(secondCol == -1){
			lstColOver.push(firstCol);
			console.log("no one can go to",firstCol);
			continue;
		}
		console.log("feed hole",secondCol,firstCol);
		lstOfMovement.push(new Movement(secondCol,firstCol,level2));
		move(state,secondCol,firstCol)
		firstCol = -1
		
	}
}


function addaptAll(lastLevel,level,state2){
	console.log("\n\naddaptAll level",level);
	console.log("lastLevel",lastLevel);
	[columns,lstOfMove] = state2;
	state = [columns,lstOfMove];
	
	console.log("lstOfMove",lstOfMove);
	abstract(columns);
	
	noteTheRain(level);
	
	let lastLevel2 = [];
	newEmptyBtl = emptyBotle();
	for(mv of lastLevel){
		let thisMoveIsPosible = showWhatWeNeed(mv,level);
		if(thisMoveIsPosible){lastLevel2.push(mv);}
	}
	console.log("lastLevel2",lastLevel2);
	console.log("ball to move",ballToMove);
	
	develop(level);
	
	abstract(columns);
	finish(level);
	abstract(columns);
	if(isNotFinish()){
		throw Error("is not finish");
	}
}

module.exports = addaptAll
