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
		if(columns2[col].isEmpty()){return col}
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
let Vlist = [[Vcolumn,lstOfMove,From0,To0]];

if (Vcolumn[From0][1] ==4 ){return}

for(let i=0;i<4;i++){
	console.log("\ni",i);
	let Vlist2 =[];
	
	for(let j=0;j<Vlist.length;j++){
		console.log("j",j);
		let [Vcolumn3,lstOfMove3,colFrom,colTo] = Vlist[j];
		
		
		Vupdate(columns,Vcolumn3,[colFrom,colTo])
		lstOfMove3.push([colFrom,colTo]);
		console.log(Vcolumn3);
		
		if(Vfinish(Vcolumn3)){
			lstOfSolution.push(lstOfMove3);
			continue;	//add to the output
		}

		let lst = WhoCanGoTo(Vcolumn3,colFrom)
		console.log("lst",lst);
		
		//add to the list for the next Cycle
		for(k in lst){
			Vlist2.push([[...Vcolumn3],[...lstOfMove3],lst[k],colFrom]);
		}
	}

	Vlist = Vlist2;	//for the next cycle
	console.log("Vlist",Vlist.length);
}

console.log("\n\n\nthe solution");
console.log(lstOfSolution);












