var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var raining = require('./raining');
var nextMove = require('./nextMove2');
var [bigBall,lstBigBall] = require('./bigBall');
var lstOfMove = [];

console.log(columns);

var end = new Date().getTime();
var time = end - startTime;
console.log("start",time/1000);


for(let mvtMax = 4*(columns.length -2);mvtMax>0;mvtMax--){
	let theMove =nextMove();
	if(theMove == "finito"){
		console.log("\nits over",columns);
		console.log("the solution",lstOfMove);
		return
	}else{
		console.log(columns);
		console.log("lst of move posible",theMove);
		
		
		move(theMove[0]);
		
		//clock
		var end = new Date().getTime();
		var time = end - startTime;
		console.log("in",time/1000,"\n");
		//lst of move
		lstOfMove.push(theMove[0]);
	}
}
