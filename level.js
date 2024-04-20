var Column = require('./column');
let lstColor = [ "DEPTH" ,"WHITE" ,"blue" ,"lightblue" ,"lightgreen" ,"yellow" ,"brightpink" ,"red" ,"green","grey" ,"purple" ,"pink" ,"cyan" ,"orange" ];

const DEPTH = false;
const WHITE = 1;
const BLUE = 2;
const LIGHTBLUE = 3;
const LIGHTGREEN = 4;
const YELLOW = 5;
const BRIGHTPINK = 6;
const RED = 7;
const GREEN = 8;
const GREY = 9;
const PURPLE = 10;
const PINK = 11
const CYAN = 12;
const ORANGE = 13;

var level = 1.2;
var columns;

var numLst = [];

function addInNumLst(color){
	let target = numLst.find(
		tgt => tgt[0] == color 
	)
	if( target == undefined){
		numLst.push([color,1,lstColor[color]])
	}else{
		target[1] ++;
	}
}


function verify(){
	let errList =[];
	let nbList = [];
	
	
	for (i in columns){
		for (j in columns[i].contents){
			addInNumLst(columns[i].contents[j]);
		}
	}
	nbList = numLst.filter(
		err => err[1] != 4
	);
	
	if (errList.length != 0 || nbList.length !=0){
		console.log("error in ",level)
		console.log(errList);
		console.log(nbList);
		throw "error";
	}
}

switch (level){

case "tst1":
default:
var columns = [
	new Column([RED, RED, RED, BLUE]),
	new Column([BLUE, BLUE, BLUE, YELLOW]),
	new Column([YELLOW, YELLOW, YELLOW, RED]),
	new Column([]),
	new Column([]),
];
break;

case "tstcc2":
var columns = [
	new Column([RED, RED, BLUE, BLUE]),
	new Column([BLUE, BLUE, YELLOW, YELLOW]),
	new Column([YELLOW, YELLOW, RED, RED]),
	new Column([]),
	new Column([]),
];
break;

case 1.1:
var columns = [
	new Column([RED, YELLOW, BLUE, YELLOW]),
	new Column([RED, RED, BLUE, BLUE]),
	new Column([BLUE, RED, YELLOW, YELLOW]),
	new Column([]),
	new Column([]),
];
break;

case 1.2:
var columns = [
	new Column([BLUE, YELLOW, BLUE, YELLOW]),
	new Column([YELLOW, RED, RED, BLUE]),
	new Column([BLUE, RED, YELLOW, RED]),
	new Column([]),
	new Column([]),
];
break;

case 2.1:
var columns = [
	new Column([GREEN, RED, RED, BLUE]),
	new Column([RED, YELLOW, BRIGHTPINK, BRIGHTPINK]),
	new Column([BLUE, GREEN, BLUE, YELLOW]),
	new Column([YELLOW, RED, YELLOW, GREEN]),
	new Column([BRIGHTPINK, BRIGHTPINK, GREEN, BLUE]),
	new Column([]),
	new Column([]),
];
break;

case 2.2:
var columns = [
	new Column([RED, RED, YELLOW, BLUE]),
	new Column([BLUE, BRIGHTPINK, RED, YELLOW]),
	new Column([RED, YELLOW, BRIGHTPINK, GREEN]),
	new Column([BLUE, BRIGHTPINK, GREEN, BLUE]),
	new Column([YELLOW, GREEN, GREEN, BRIGHTPINK]),
	new Column([]),
	new Column([]),
];
break;

case 2.3:
var columns = [
	new Column([YELLOW, RED, BRIGHTPINK, BRIGHTPINK]),
	new Column([BRIGHTPINK, BLUE, RED, GREEN]),
	new Column([GREEN, RED, BLUE, GREEN]),
	new Column([BRIGHTPINK, GREEN, BLUE, YELLOW]),
	new Column([YELLOW, RED, BLUE, YELLOW]),
	new Column([]),
	new Column([]),
];
break;
	
case 4.58:

var columns = [
	new Column([LIGHTGREEN, LIGHTBLUE, BLUE, WHITE]),
	new Column([YELLOW, RED, BRIGHTPINK, YELLOW]),
	new Column([LIGHTBLUE, WHITE, GREY, GREEN]),
	new Column([GREY, LIGHTGREEN, PURPLE, PURPLE]),
	new Column([GREY, BLUE, RED, LIGHTBLUE]),
	new Column([CYAN, LIGHTGREEN, PINK, BRIGHTPINK]),
	new Column([GREEN, PINK, WHITE, ORANGE]),
	new Column([GREEN, PINK, CYAN, PURPLE]),
	new Column([GREEN, YELLOW, ORANGE, CYAN]),
	new Column([WHITE, PINK, BRIGHTPINK, YELLOW]),
	new Column([GREY, BRIGHTPINK, ORANGE, BLUE]),
	new Column([RED, LIGHTGREEN, BLUE, LIGHTBLUE]),
	new Column([ORANGE, RED, PURPLE, CYAN]),
	new Column([]),
	new Column([]),
];
break;

case 4.326:
var columns = [
	new Column([RED, PURPLE, GREEN, PINK]),
	new Column([WHITE, GREEN, CYAN, ORANGE]),//1
	new Column([LIGHTGREEN, CYAN, GREY, BLUE]),
	new Column([GREY, BRIGHTPINK, BRIGHTPINK, GREEN]),//3
	new Column([BLUE, LIGHTBLUE, LIGHTBLUE, PURPLE]),
	new Column([GREY, ORANGE, YELLOW, LIGHTGREEN]),//5
	new Column([PINK, PINK, LIGHTBLUE, ORANGE]),
	new Column([LIGHTGREEN, WHITE, WHITE, PURPLE]),//7
	new Column([YELLOW, RED, CYAN, CYAN]),
	new Column([LIGHTBLUE, YELLOW, BLUE, PURPLE]),//9
	new Column([PINK, RED, ORANGE, LIGHTGREEN]),
	new Column([GREEN, RED, BRIGHTPINK, WHITE]),
	new Column([BLUE, YELLOW, GREY, BRIGHTPINK]),
	new Column([]),
	new Column([]),
];
break;

case 4.347:
var columns = [
	new Column([WHITE, BRIGHTPINK, BRIGHTPINK, LIGHTGREEN]),
	new Column([RED, PINK, LIGHTGREEN, PINK]),	//1
	new Column([BLUE, CYAN, GREEN, RED]),
	new Column([LIGHTBLUE, GREEN, BLUE, BLUE]),//3
	new Column([GREEN, LIGHTBLUE, WHITE, BRIGHTPINK]),
	new Column([GREY, LIGHTBLUE, PURPLE, ORANGE]),//5
	new Column([LIGHTBLUE, RED, GREY, CYAN]),
	new Column([ORANGE, CYAN, WHITE, YELLOW]),//7
	new Column([LIGHTGREEN, GREY, LIGHTGREEN, PURPLE]),
	new Column([WHITE, PURPLE, BRIGHTPINK, CYAN]),//9
	new Column([YELLOW, ORANGE, BLUE, GREY]),
	new Column([ORANGE, PINK, PINK, YELLOW]),//11
	new Column([GREEN, YELLOW, PURPLE, RED]),
	new Column([]),
	new Column([]),
];
break;

case 4.364:
var columns = [
	new Column([BRIGHTPINK, GREEN, BLUE, WHITE]),
	new Column([CYAN, PINK, ORANGE, LIGHTGREEN]),	//1
	new Column([PURPLE, LIGHTGREEN, ORANGE, WHITE]),
	new Column([PURPLE, YELLOW, CYAN, LIGHTBLUE]),//3
	new Column([GREEN, LIGHTGREEN, RED, PINK]),
	new Column([WHITE, GREY, RED, PINK]),//5
	new Column([RED, YELLOW, PURPLE, BLUE]),
	new Column([BLUE, BRIGHTPINK, GREY, GREY]),//7
	new Column([GREEN, GREY, ORANGE, YELLOW]),
	new Column([ORANGE, LIGHTBLUE, LIGHTBLUE, YELLOW]),//9
	new Column([LIGHTGREEN, BRIGHTPINK, LIGHTBLUE, WHITE]),
	new Column([PINK, BRIGHTPINK, BLUE, RED]),//11
	new Column([PURPLE, CYAN, CYAN, GREEN]),
	new Column([]),
	new Column([]),
];
break;

case 4.422:
var columns = [
	new Column([GREEN, WHITE, BRIGHTPINK, PINK]),
	new Column([LIGHTGREEN, LIGHTBLUE, CYAN, BLUE]),	//1
	new Column([GREY, ORANGE, PINK, PURPLE]),
	new Column([BLUE, CYAN, YELLOW, WHITE]),//3
	new Column([PURPLE, BRIGHTPINK, RED, RED]),
	new Column([ORANGE, GREY, CYAN, RED]),//5
	new Column([GREY, CYAN, ORANGE, LIGHTGREEN]),
	new Column([BLUE, WHITE, GREEN, LIGHTBLUE]),//7
	new Column([RED, YELLOW, LIGHTBLUE, BRIGHTPINK]),
	new Column([WHITE, LIGHTGREEN, YELLOW, BLUE]),//9
	new Column([GREEN, ORANGE, BRIGHTPINK, LIGHTBLUE]),
	new Column([GREEN, PURPLE, GREY, YELLOW]),//11
	new Column([PURPLE, PINK, PINK, LIGHTGREEN]),
	new Column([]),
	new Column([]),
];
break;

case 4.492:
var columns = [
	new Column([RED, ORANGE, CYAN, CYAN]),
	new Column([RED, PINK, BRIGHTPINK, BRIGHTPINK]),	//1
	new Column([PURPLE, WHITE, YELLOW, PURPLE]),
	new Column([LIGHTBLUE, PURPLE, ORANGE, GREEN]),//3
	new Column([LIGHTGREEN, GREY, BLUE, LIGHTGREEN]),
	new Column([YELLOW, RED, GREEN, GREY]),//5
	new Column([CYAN, LIGHTGREEN, PINK, BRIGHTPINK]),
	new Column([GREY, PINK, CYAN, BLUE]),//7
	new Column([LIGHTBLUE, YELLOW, GREEN, WHITE]),
	new Column([WHITE, YELLOW, LIGHTGREEN, WHITE]),//9
	new Column([GREEN, BLUE, LIGHTBLUE, PINK]),
	new Column([BRIGHTPINK, ORANGE, BLUE, RED]),//11
	new Column([LIGHTBLUE, ORANGE, PURPLE, GREY]),
	new Column([]),
	new Column([]),
];
break;

}

//verify();

console.log(level);


module.exports = columns;


