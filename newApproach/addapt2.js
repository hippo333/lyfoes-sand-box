

var abstract = require('../tools/abstract');
var move = require('../tools/move');

let columns = [];
let lstOfMove = [];
let state =[];

let lastMove = [];
let newLst =[];

let lstTimeRedcon = [];



function emptyBotle(){
	
	return columns.findIndex(x => x.isEmpty());
	
}

function otherBotle(col2,ball2,bigBll){
	console.log("otherBotle col",col2,"ball",ball2,"bigBll",bigBll)
	
	if(bigBll == undefined){bigBll=1}
	otherCol = columns.findIndex(
		x => x.top() == ball2
		&& columns.indexOf(x) != col2
		&& x.content.length + bigBll <=4
	);
	
	if(otherCol ==-1){otherCol = emptyBotle()}
	if(otherCol ==-1){
		abstract(columns);
		console.log("lstOfMove",lstOfMove);
		//throw Error("i can't find other Botle ");
	}
	return otherCol
}

let lstOfMovement = [];
let lastLstOfMovement = [];
class Movement {
	mv = []
	theBall = -1
	bigBall = 0
	ballWeFree = -1
	spaceFree = 0
	spaceWeUse = -1
	level = 0
	nature = "basic"
	
	constructor(from,to,level){
		this.theBall = columns[from].top()
		this.bigBall = columns[from].bigBall
		this.mv = [from,to,this.bigBall]
		this.ballWeFree = columns[from].secondBall()
		this.spaceFree = 4-columns[from].content.length+ this.bigBall
		this.spaceWeUse = 4-columns[to].content.length
		this.levelFrom = columns[from].content.length	//length
		this.levelTo = columns[to].content.length	//length
	}
	
}

let lstColAffectedByRain =[];
function noteTheRain(level2){
	console.log("noteTheRain, level",level2);
	lstOfMovement = [];
	let lstWarning = [];
	lstColAffectedByRain= [];
	
	for(thisMove of lstOfMove){
		let [from,to,bigBll] = thisMove;
		let thisMovement = new Movement(from,to,level2);
		
		thisMovement.theBall = columns[to].top()
		thisMovement.bigBall = bigBll;
		thisMovement.mv[2] = bigBll;
		thisMovement.ballWeFree = columns[from].top();
		thisMovement.spaceFree = 4-columns[from].content.length;
		thisMovement.spaceWeUse = 4-columns[to].content.length +bigBll;
		thisMovement.nature = "rain";
		thisMovement.levelFrom += bigBll;
		thisMovement.levelTo -= bigBll;
		
		//if the same col ave been move multiple time
		let previousMovement = lstOfMovement.find(
			prvMv => prvMv.mv[0] ==from
		);
		if(previousMovement != undefined){
			previousMovement.spaceFree -= bigBll;
			previousMovement.ballWeFree = columns[to].top();
			previousMovement.nature = "rain2";
			previousMovement.levelFrom += bigBll;
			previousMovement.levelTo -= bigBll;
			
		}//*/
		lstOfMovement.push(thisMovement);
		if(lstWarning.includes(from) || bigBll >1 ){
			lstColAffectedByRain.push(from);
			let idMove = lastLevel.findIndex(mv => mv[0] == from);
			if(idMove ==-1){continue}
			console.log("lastMove",lastLevel[idMove],"to",to);
			
			
			if(lastLevel[idMove][1] ==to){
				console.log("lastLevel",lastLevel);
				lastLevel.splice(idMove,1);
				console.log(from,to);
				console.log("lastLevel",lastLevel);
				
				let idMovement = lastLstOfMovement.findIndex(
					x => x.mv[0] ==from
					&& x.mv[1] == to
				);
				console.log("idMovement",idMovement);
				console.log("thisMvt",lastLstOfMovement[idMovement]);
				lastLstOfMovement.splice(idMovement,1);
				
				//throw Error("debug");
			}
		}
		lstWarning.push(from);
	}
}


function isNotFinish(){
	let colMix = columns.findIndex(
		x => !x.isMonochrome()
		&& !x.isEmpty()		
	);
	if(colMix != -1){return true}
	
	let lstColor = columns.map(x=> x.color).sort();
	lstColor = lstColor.filter(x => x!=0);
	let lstUnduplicate = new Set(lstColor)
	console.log("lstColor",lstColor)
	console.log("lstnduplicated",lstUnduplicate);
	if(lstColor.length > lstUnduplicate){return true}
	
		
}


//develope
function whoCanGoBefor(idMovement2){
	console.log("whoCanGoBefor",idMovement2);
	
	let thisMovemnet = lastLstOfMovement[idMovement2];
	let thisBall = thisMovement.theBall;
	console.log("thisBall",thisBall);
}


//addaptAll
let lastLevel = [];
function develop(level2){
	console.log("develop");
	
	for(thisMovement of lastLstOfMovement){
		
		let [from,to] = thisMovement.mv;
		let bigBll = thisMovement.bigBall
		let thisMv = [from,to,bigBll]
		
		//console.log(lastLstOfMovement);
		//console.log(from,to);
		//console.log("\nthisMovement",thisMovement);
		
		if(columns[from].top() != thisMovement.theBall){
			console.log("\nerror from top is not the good color");
			//abstract(columns);
			//console.log("thisMovement",thisMovement);
			
			if(thisMovement.levelFrom < columns[from].content.length){
				let thisBall = columns[from].top();
				let thisBigBll = columns[from].bigBall
				let secondCol = otherBotle(from,thisBall,thisBigBll);
				//console.log("secondCol",secondCol);
				
				lstOfMovement.push(new Movement(from,secondCol,level2));
				move(state,from,secondCol);
				//throw Error("not the good ball");
			}
		}
		
		if(columns[to].top() !=thisMovement.theBall &&!columns[to].isEmpty()){
			console.log("\nerror to top is not the good color");
			abstract(columns);
			console.log("thisMovement",thisMovement);
			
			if(thisMovement.levelTo < columns[to].content.length){
				let thisBall = columns[to].top();
				let thisBigBll = columns[to].bigBall
				let secondCol = otherBotle(to,thisBall,thisBigBll);
				console.log("secondCol",secondCol);
				
				lstOfMovement.push(new Movement(to,secondCol,level2));
				move(state,to,secondCol);
			}
		}
		
		lstOfMovement.push(new Movement(...thisMv,level2));
		move(state,...thisMv);
	}
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
			lstOfMovement.push(new Movement(firstCol,secondCol,level2));
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


function addaptAll(lastLevel2,level,state2){
	console.log("\n\naddaptAll level",level);
	console.log("lastLevel",lastLevel);
	[columns,lstOfMove] = state2;
	state = [columns,lstOfMove];
	lastLevel = lastLevel2;
	
	console.log("lstOfMove",lstOfMove);
	abstract(columns);
	
	lastLstOfMovement = lstOfMovement;
	lstOfMovement = [];
	console.log("lastLstOfMovement",lastLstOfMovement);
	noteTheRain(level);
	
	
	newEmptyBtl = emptyBotle();
	develop(level);
	
	abstract(columns);
	finish(level);
	abstract(columns);
	if(isNotFinish()){
		throw Error("is not finish");
	}
}

module.exports = addaptAll
