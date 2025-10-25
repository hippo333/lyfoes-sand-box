var column = require('../tools/column');
var columns = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');

let level0 = [];
let level1 = [];
let level2 = [];
let level3 = [];
let levels = [level0, level1, level2, level3];

let lstOfMove = [];
let state = [columns,lstOfMove];

for(i in columns){
	let theCol = columns[i].content;
	for(j in levels){
		levels[j].push(theCol[j]);
	}
	
}

abstract(columns);

levels = levels.map(lvl => {return lvl.slice(0,-2).sort();});

console.log(levels[3]);
console.log(levels[2]);
console.log(levels[1]);
console.log(levels[0]);


const permute = (lv) =>levels[lv].filter((bll,id) => bll == levels[lv][id+1]);

let lstPermut = levels.map((x,lv) => {return permute(lv)});
console.log("\npermut0",lstPermut);

function SecondCol(ball2,col2){
	let secondCol = columns.findIndex(
		col => columns.indexOf(col) != col2
		&& col.top() == ball2
	);
	return secondCol
}

function showLoop(level){
	let lstLoop = [];
	let lastCol = 0;
	let thisLoop = [];
	
	for(i in columns){//weird recursive function
		let theBall = columns[lastCol].content[level-1];
		let secondCol = SecondCol(theBall,lastCol);
		
		if(secondCol == thisLoop[0]){
			lstLoop.push(thisLoop);
			thisLoop = [];
			lstLoop2 = lstLoop.concat().sort();
			let lastCol = lstLoop2.findIndex(
				col => !lstLoop2.includes(col+1)
			);
			if(columns[lastCol].isEmpty()){break}
			else{lastCol++}
		}else{
			thisLoop.push(secondCol);
			lastCol = secondCol;			
		}		
	}
	return lstLoop	
}

console.log("show loop2",showLoop(3));



function solvLevel(level){
	console.log("solvLevel",level);
	let theLoops = showLoop(level);
	let emptyBtl = columns.findIndex(col => col.isEmpty());
	if(emptyBtl ==-1){
		throw Error("no empty botle");
	}
	for(loop of theLoops){
		for(mv in loop){
			let from = loop[mv];
			let to;
			if(mv ==0){to = emptyBtl}
			else{to = loop[mv-1]}
			move(state,from,to);
		}
		move(state,emptyBtl,loop[loop.length-1]);//close the loop
	}
}

solvLevel(3);
solvLevel(2);
solvLevel(1);
abstract(columns);





