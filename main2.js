var startTime = new Date().getTime();
var Column = require('./column');
var columns = require('./level');
var move = require('./move');
var doTheMove = require('./doTheMove');
var coppy = require('./coppy');
var abstract = require('./abstract');
var isFinish = require('./isFinish');
var [newVcolumn,Vupdate,Vfinish] = require('./Vcolumn');


abstract(columns);

function emptyBotle(columns2){
	for(col in  columns2){
		if(columns2[col].isEmpty()){return parseInt(col)}
	}
	return null
}

function WhoCanGoTo(Vcolumn2,col2){
	//console.log("who can go to ",col2);
	let output = [];
	
	for(let i=0;i<Vcolumn2.length;i++){
		if(i == col2){continue};
		if(Vcolumn[i][2] ==0){continue}	//no emptyBotle
		//if the ball are the same
		if(Vcolumn2[i][0]!=Vcolumn2[col2][0]){continue}
		
		//dont over feed
		if(Vcolumn2[i][1] + Vcolumn2[col2][2] >4){continue}
		
		output.push(i);		
	}
	return output
}

let lstOfSolution =[];	//output of the function
let lstOfMove = [];
let Vcolumn = newVcolumn(columns);
console.log(Vcolumn);

let btl0 = emptyBotle(columns);

if(btl0 == null){return}


let From0 = 0;
let To0 = btl0;
let Vlist = [[Vcolumn,lstOfMove]];

if (Vcolumn[From0][1] ==4 ){return}


Vupdate(columns,Vcolumn,[From0,To0])
lstOfMove.push([From0,To0]);
console.log(Vcolumn);
		
		
for(let i=0;i<4;i++){
	console.log("\ncycle",i);
	let Vlist2 =[];
	
	for(let j=0;j<Vlist.length;j++){
		console.log("j",j);
		let [Vcolumn3,lstOfMove3] = Vlist[j];
		
		if(Vfinish(Vcolumn3)){
			lstOfSolution.push(lstOfMove3);
			continue;	//add to the output
		}

		colTo =lstOfMove3[lstOfMove3.length-1][0];
		console.log("last move",lstOfMove3[lstOfMove3.length-1]);
		console.log("colTo",colTo);
		let lst = WhoCanGoTo(Vcolumn3,colTo);
		console.log("lst",lst);
		
		//add to the list for the next Cycle
		for(k in lst){
			let Vcolumn4 = [...Vcolumn3];
			let lstOfMove4 = [...lstOfMove3];
			colFrom = lst[k];
		
			Vupdate(columns,Vcolumn4,[colFrom,colTo])
			lstOfMove4.push([colFrom,colTo]);
			console.log("move from",colFrom,"to",colTo);
			console.log(Vcolumn4);
			console.log(lstOfMove4);
			
			
			Vlist2.push([Vcolumn4,lstOfMove4]);
		}
		
	}

	Vlist = Vlist2;	//for the next cycle
	console.log("Vlist",Vlist.length);
}

console.log("\n\n\nthe solution");
console.log(lstOfSolution);












