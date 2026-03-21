
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');
var getTheLevel = require('../level');


function emptyBotle(){
	return columns0.findIndex(x => x.isEmpty())
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];
let succes0 = false;
let nbMaxBall = 4;
let lstLinkFrom = [];	//what ball can go to this ball
let lstLinkTo = [];		//where this ball can go


//set up


function allBallWhoCanFit(col2,theBall,levelTo){
	/*console.log("    filterCoppy, col2",col2);
	console.log("theBall",theBall,"levelTo",levelTo);//*/
	
	let theCol = columns0[col2];
	let lstBall = [];
	let bigBll = 0;
	
	for(let bll=theCol.content.length-1; bll >=0; bll--){
		if(theCol.content[bll] == theBall){
			bigBll ++;
			continue
		}
		if(bigBll != 0){
			if(bigBll + levelTo < nbMaxBall){
				lstBall.push([bll+1,bigBll]);
			}	
			bigBll =0;		
		}
	}
	if(bigBll != 0){
		lstBall.push([0,bigBll]); 
	}
	
	return lstBall
}


function whoCanGoToBall(col2,level){
	//console.log("    whoCanGoToBall");
	
	let lstFrom = ["level",level];
	let theCol = columns0[col2];
	let theBall = theCol.content[level];
	//console.log("    col",col2,"level",level,"theBall",theBall);
	
	for(i in columns0){
		if(i == col2){continue}	//not the same column
		let col = columns0[i];
		if(col.isEmpty()){continue}
		
		
		let lstSource = allBallWhoCanFit(i,theBall,level);
		
		for(source of lstSource){
			let [bll,bigBll] = source;
			
			lstFrom.push([parseInt(i),bll]); 
		}
	
	}
	//if(lstFrom.length == 2){return}
	//console.log("    lstFrom",lstFrom);
	return lstFrom
}


function whoCanGoToCol(col2){
	//console.log("  whoCanGoToCol",col2);
	
	let theCol = columns0[col2];
	let lstFrom = [];
	
	for(let bll =0; bll < theCol.content.length; bll++){
		if(bll == nbMaxBall-1){continue}	//no Ball can go to
		if(theCol.content[bll] == theCol.content[bll+1]){continue}
		//the top of bigBall
		
		lstFrom.push(whoCanGoToBall(col2,bll));
	}
	return lstFrom
}

function whoCanGoEverywhere(){
	console.log("whoCanGoEverywhere");
	
	for(cll in columns0){
		lstLinkFrom.push(whoCanGoToCol(cll));
	}
	
	//console.log("lstLinkFrom",...lstLinkFrom);
}

//makeListTo
function putItInCol(col2,lstColFrom){
	//console.log("putItInCol, col2",col2,lstColFrom);
	
	
	for(let i=0; i <= lstColFrom.length -1;i++){
		let thisLevel = lstColFrom[i];
		let level2 = thisLevel[1];
		
		for(let j=2; j<= thisLevel.length-1; j++){
			let [col,level] = thisLevel[j];
			
			let that = [col2,level2];
			lstLinkTo[col][level].push(that);
		}	
	}
	//console.log("lstLinkTo",lstLinkTo);
}

function feedListTo(){
	//console.log("feedListTo");
	
	for(col of lstLinkFrom){
		let idCol = lstLinkFrom.indexOf(col);
		putItInCol(idCol,col);
		
	}
	//console.log("lstLinkTo",...lstLinkTo);
}

function makeListTo(){
	//console.log("makeListTo");

	for(col of columns0){
		let theBase = col.content.map((x,index) => ["level",index]);
		
		lstLinkTo.push(theBase);
	}	
	//console.log("lstLinkTo",lstLinkTo);
}

let ballToPlace = [];
//state with 2 empty column
function getStableState(col2,level2){
	console.log("getStaBleStaTe, col2",col2,"level2",level2);
	
	let theCol = columns0[col2];
	for(let lvl = level2+1; lvl < theCol.content.length; lvl++){
		let theBall = theCol.content[lvl];
		ballToPlace.push(theBall);
	}
	console.log("ballToPlace",ballToPlace);
	
	
}

function reset(nbMaxBall2){
	nbMaxBall = nbMaxBall2;
}

function main(state2){
	console.log("\nprice");
	[columns0,lstOfMove] = state2;
	
	
	whoCanGoEverywhere();
	
	makeListTo();
	feedListTo();
	
	getStableState(0,2);
	
	//throw Error("debug");
}

function test(){
	console.log("test");
	state[0] = columns0 = getTheLevel(1.2);
	abstract(columns0);
	
	main(state);
	
	
	
}	

test();
	
module.exports = [main,reset]


