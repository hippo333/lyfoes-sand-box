
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');



function emptyBotle(columns2){
	
	let level = columns2[0].content.length;
	
	if(level %2 ==0){
		return columns2.findIndex(x => x.isEmpty())
	}else{
		//return columns2.findLastIndexOf(x => x.isEmpty())
		if(columns2[columns2.length-1].isEmpty()){
			return columns2.length -1
		}else{
			return -1
		}
	}
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];
let succes0 = false;

//set up

function basic(){
	console.log("basic");
	
	let lstParticle = columns0.filter(
		ptc => ptc.isMonochrome()
		&& ptc.content.length <=2		
	).map(x => columns0.indexOf(x));
	
	console.log("lstParticle",lstParticle);
	if(lstParticle ==0){return}
	
	let col =lstParticle[0];
	let theCol = columns0[col];
	let secondCol = columns0.findIndex(
		cll => cll.top() == theCol.top()
		&& cll.content.length + theCol.bigBall <= 4
		&& columns0.indexOf(cll) != col
	);
	if(secondCol == -1){return}
	console.log("secondCol",secondCol);
	move(state,col,secondCol);
	succes0 = true;
}	

function main(state2){
	console.log("\ncapillarity");
	state = state2;
	[columns0,lstOfMove]= state
	succes0 = false;
	
	basic();
	
	console.log("capilarity",succes0);
	return succes0;
}

//main(state);






module.exports = main


