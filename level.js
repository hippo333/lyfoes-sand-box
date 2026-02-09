var Column = require('./tools/column');
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







//var level = 2.13;


//1.2, 2.3, 3.12, 4.1 4.58 4.326 4.3262 4.347, 4.364 4.422, 4.492

var columns;

function getTheLevel(level){
	console.log("getTheLevel",level);
	switch (level){

	case "permute0":
	var columns = [
		new Column([RED, BLUE, YELLOW, RED]),
		new Column([BLUE, YELLOW, RED, BLUE]),
		new Column([YELLOW, RED, BLUE, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case "permute1":
	var columns = [
		new Column([RED, BLUE, RED, YELLOW]),
		new Column([BLUE, YELLOW, RED, BLUE]),
		new Column([YELLOW, RED, BLUE, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case "permute2":
	var columns = [
		new Column([RED, BLUE, RED, YELLOW]),
		new Column([BLUE, YELLOW, RED, BLUE]),
		new Column([RED, YELLOW, BLUE, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case "aAW1":
	var columns = [
		new Column([RED, RED, RED, BLUE]),
		new Column([BLUE, BLUE, BLUE]),
		new Column([YELLOW, YELLOW, YELLOW, RED]),
		new Column([YELLOW]),
		new Column([]),
	];
	break;

	case "aAW2":
	var columns = [
		new Column([RED, RED, YELLOW, BLUE]),
		new Column([BLUE, BLUE, RED, YELLOW]),
		new Column([YELLOW, RED]),
		new Column([YELLOW]),
		new Column([]),
	];
	break;

	case "CC1":
	var columns = [
		new Column([RED, BLUE]),
		new Column([BLUE,YELLOW]),
		new Column([YELLOW, RED]),
		new Column([BLUE, RED]),
		new Column([YELLOW, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tst1":	//single criss cross
	default:		//main2
	var columns = [
		new Column([RED, RED, RED, BLUE]),
		new Column([BLUE, BLUE, BLUE, YELLOW]),
		new Column([YELLOW, YELLOW, YELLOW, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tst2":	//just free a botle
	console.log("broken , free a botle");
	var columns = [
		new Column([RED, BLUE, ORANGE, YELLOW]),
		new Column([PINK, RED, BLUE]),
		new Column([YELLOW, RED, YELLOW, BLUE]),
		new Column([RED]),
		new Column([]),
	];
	break;

	case "tst3":	//no solution one botle
	var columns = [
		new Column([RED, YELLOW, RED, RED]),
		new Column([YELLOW, YELLOW, BLUE, BLUE]),
		new Column([BLUE, YELLOW, RED, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tst4":	//two choice
	var columns = [	//main2
		new Column([BLUE, YELLOW, RED, BLUE]),
		new Column([RED, RED, BLUE, YELLOW]),
		new Column([YELLOW, YELLOW, RED, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tst5":	//tst3 with first move
	var columns = [	//and genius there are no empty botle
		new Column([BLUE, YELLOW, RED]),
		new Column([RED, RED, BLUE, YELLOW]),
		new Column([YELLOW, YELLOW, RED]),
		new Column([BLUE, BLUE]),
	];
	break;

	case "tst6":	//3 ball per color
	var columns = [	//mail 2
		new Column([ YELLOW, RED, BLUE]),
		new Column([RED, BLUE, YELLOW]),
		new Column([YELLOW, RED, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tst7":	//do a choice
	var columns = [	//main2
		new Column([ YELLOW, BLUE, BLUE, RED]),
		new Column([RED, RED, RED, BLUE]),
		new Column([YELLOW, YELLOW, YELLOW, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tst8":	//move from
	var columns = [	//main2
		new Column([ BLUE, BLUE, RED, YELLOW]),
		new Column([RED, RED, RED, YELLOW]),
		new Column([YELLOW, YELLOW, BLUE, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tstcc2":	//twin criss cross
	var columns = [	//main2
		new Column([RED, RED, BLUE, BLUE]),
		new Column([BLUE, BLUE, YELLOW, YELLOW]),
		new Column([YELLOW, YELLOW, RED, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tstcc3":	//folowing blue
	var columns = [	//main2
		new Column([RED, RED, BLUE, RED]),
		new Column([BLUE, RED, YELLOW, BLUE]),
		new Column([YELLOW, YELLOW, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tstcc4":	//permutation on the midle
	var columns = [	//main2
		new Column([RED, RED, BLUE, RED]),
		new Column([BLUE, BLUE, YELLOW, BLUE]),
		new Column([YELLOW, YELLOW, RED, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tstcc5":	//double twin premutation on the midle
	var columns = [
		new Column([ RED, RED, BLUE, RED]),
		new Column([ BLUE, BLUE, RED, BLUE]),
		new Column([ YELLOW, YELLOW, ORANGE, YELLOW]),
		new Column([ ORANGE, ORANGE, YELLOW, ORANGE]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tstcc6":	//3ball double permutation on the ground
	var columns = [
		new Column([ RED, BLUE, BLUE]),
		new Column([ BLUE, RED, RED]),
		new Column([ YELLOW, ORANGE, ORANGE]),
		new Column([ ORANGE, YELLOW, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tstcc7":	//double permutation on the midle
	var columns = [
		new Column([ RED, RED, BLUE, BLUE]),
		new Column([ BLUE, BLUE, RED, RED]),
		new Column([ YELLOW, YELLOW, ORANGE, ORANGE]),
		new Column([ ORANGE, ORANGE, YELLOW, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case "tstcc8":	//twin criss cross
	var columns = [
		new Column([RED, RED ]),
		new Column([BLUE, BLUE, BLUE, BLUE]),
		new Column([RED, RED]),
		new Column([]),
	];
	break;

	case "finish":
	var columns = [
		new Column([RED, RED, RED]),
		new Column([BLUE, BLUE, BLUE]),
		new Column([YELLOW, YELLOW, YELLOW]),
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

	case 1.2:	//main2
	var columns = [
		new Column([BLUE, YELLOW, BLUE, YELLOW]),
		new Column([YELLOW, RED, RED, BLUE]),
		new Column([BLUE, RED, YELLOW, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.01:	//main2
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

	case 2.02:
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

	case 2.03:
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

	case 2.04:
	var columns = [
		new Column([BLUE, YELLOW, YELLOW, BRIGHTPINK]),
		new Column([GREEN, BRIGHTPINK, GREEN, BLUE]),
		new Column([BLUE, BRIGHTPINK, BLUE, GREEN]),
		new Column([YELLOW, RED, RED, RED]),
		new Column([GREEN, YELLOW, BRIGHTPINK, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.05:
	var columns = [
		new Column([YELLOW, YELLOW, GREEN, BLUE]),
		new Column([RED, GREEN, GREEN, BRIGHTPINK]),
		new Column([YELLOW, BLUE, RED, GREEN]),
		new Column([BRIGHTPINK, RED, BLUE, RED]),
		new Column([BRIGHTPINK, YELLOW, BLUE, BRIGHTPINK]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.06:
	var columns = [
		new Column([BLUE, BLUE, RED, YELLOW]),
		new Column([YELLOW, RED, YELLOW, GREEN]),
		new Column([GREEN, BRIGHTPINK, BRIGHTPINK, BLUE]),
		new Column([BRIGHTPINK, GREEN, BRIGHTPINK, BLUE]),
		new Column([GREEN, RED, RED, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.07:
	var columns = [
		new Column([BRIGHTPINK, BRIGHTPINK, RED, GREEN]),
		new Column([BRIGHTPINK, GREEN, YELLOW, RED]),
		new Column([YELLOW, BLUE, BRIGHTPINK, GREEN]),
		new Column([BLUE, YELLOW, YELLOW, BLUE]),
		new Column([BLUE, RED, GREEN, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.08:
	var columns = [
		new Column([GREEN, BRIGHTPINK, GREEN, BRIGHTPINK]),
		new Column([RED, BRIGHTPINK, GREEN, RED]),
		new Column([YELLOW, BLUE, YELLOW, RED]),
		new Column([BLUE, BLUE, BLUE, YELLOW]),
		new Column([RED, BRIGHTPINK, YELLOW, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.09:
	var columns = [
		new Column([YELLOW, RED, RED, YELLOW]),
		new Column([GREEN, BRIGHTPINK, BLUE, BRIGHTPINK]),
		new Column([RED, YELLOW, BLUE, GREEN]),
		new Column([BRIGHTPINK, BRIGHTPINK, BLUE, BLUE]),
		new Column([RED, GREEN, YELLOW, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.10:
	var columns = [
		new Column([BLUE, RED, YELLOW, RED]),
		new Column([BLUE, GREEN, RED, RED]),
		new Column([YELLOW, BRIGHTPINK, BLUE, BRIGHTPINK]),
		new Column([GREEN, BRIGHTPINK, YELLOW, GREEN]),
		new Column([GREEN, BRIGHTPINK, YELLOW, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.11:
	var columns = [
		new Column([RED, WHITE, BLUE, BLUE]),
		new Column([YELLOW, YELLOW, GREEN, BLUE]),
		new Column([BLUE, RED, WHITE, BRIGHTPINK]),
		new Column([YELLOW, RED, BRIGHTPINK, WHITE]),
		new Column([WHITE, GREEN, BRIGHTPINK, GREEN]),
		new Column([RED, GREEN, BRIGHTPINK, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.12:
	var columns = [
		new Column([BRIGHTPINK, YELLOW, BLUE, RED]),
		new Column([BLUE, RED, GREEN, YELLOW]),
		new Column([BRIGHTPINK, BLUE, YELLOW, BRIGHTPINK]),
		new Column([RED, GREEN, BLUE, YELLOW]),
		new Column([BRIGHTPINK, GREEN, GREEN, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.13:
	var columns = [
		new Column([BLUE, RED, YELLOW, YELLOW]),
		new Column([GREEN, GREEN, YELLOW, RED]),
		new Column([RED, RED, BLUE, BLUE]),
		new Column([BLUE, GREEN, GREEN, YELLOW]),
		new Column([]),
	];
	break;

	case 2.14:
	var columns = [
		new Column([GREEN, BLUE, GREEN, GREEN]),
		new Column([RED, BRIGHTPINK, BLUE, YELLOW]),
		new Column([BRIGHTPINK, BRIGHTPINK, BLUE, RED]),
		new Column([YELLOW, BRIGHTPINK, YELLOW, BLUE]),
		new Column([YELLOW, GREEN, RED, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.15:
	var columns = [
		new Column([BRIGHTPINK, BRIGHTPINK, GREEN, BLUE]),
		new Column([RED, BLUE, BRIGHTPINK, YELLOW]),
		new Column([RED, RED, YELLOW, RED]),
		new Column([GREEN, YELLOW, BRIGHTPINK, GREEN]),
		new Column([BLUE, BLUE, GREEN, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.16:
	var columns = [
		new Column([GREEN, BRIGHTPINK, BRIGHTPINK, YELLOW]),
		new Column([BLUE, GREEN, RED, BRIGHTPINK]),
		new Column([GREEN, BRIGHTPINK, GREEN, RED]),
		new Column([YELLOW, BLUE, RED, BLUE]),
		new Column([YELLOW, YELLOW, BLUE, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.17:
	var columns = [
		new Column([RED, GREEN, BRIGHTPINK, YELLOW]),
		new Column([BLUE, BLUE, GREEN, RED]),
		new Column([BLUE, RED, BRIGHTPINK, BRIGHTPINK]),
		new Column([RED, BLUE, GREEN, YELLOW]),
		new Column([GREEN, YELLOW, YELLOW, BRIGHTPINK]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.18:
	var columns = [
		new Column([BLUE, GREEN, YELLOW, GREEN]),
		new Column([BLUE, WHITE, WHITE, RED]),
		new Column([BRIGHTPINK, YELLOW, WHITE, BLUE]),
		new Column([RED, GREEN, WHITE, YELLOW]),
		new Column([GREEN, BRIGHTPINK, BLUE, RED]),
		new Column([BRIGHTPINK, YELLOW, BRIGHTPINK, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.19:
	var columns = [
		new Column([YELLOW, RED, BRIGHTPINK, GREEN]),
		new Column([RED, BRIGHTPINK, GREEN, GREEN]),
		new Column([BLUE, GREEN, RED, YELLOW]),
		new Column([RED, BLUE, YELLOW, BRIGHTPINK]),
		new Column([BRIGHTPINK, BLUE, YELLOW, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.20:
	var columns = [
		new Column([BLUE, YELLOW, BLUE, RED]),
		new Column([RED, GREEN, RED, GREEN]),
		new Column([BLUE, YELLOW, YELLOW, GREEN]),
		new Column([BLUE, YELLOW, RED, GREEN]),
		new Column([]),
	];
	break;

	case 2.21:
	var columns = [
		new Column([RED, BRIGHTPINK, YELLOW, YELLOW]),
		new Column([YELLOW, BLUE, BRIGHTPINK, GREEN]),
		new Column([RED, BLUE, GREEN, YELLOW]),
		new Column([GREEN, BRIGHTPINK, BLUE, RED]),
		new Column([GREEN, BRIGHTPINK, BLUE, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.22:
	var columns = [
		new Column([RED, BRIGHTPINK, BLUE, YELLOW]),
		new Column([YELLOW, YELLOW, RED, GREEN]),
		new Column([RED, RED, YELLOW, BLUE]),
		new Column([GREEN, GREEN, BRIGHTPINK, GREEN]),
		new Column([BRIGHTPINK, BLUE, BRIGHTPINK, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.23:
	var columns = [
		new Column([BLUE, BRIGHTPINK, YELLOW, GREEN]),
		new Column([BRIGHTPINK, RED, BRIGHTPINK, GREEN]),
		new Column([BLUE, BRIGHTPINK, BLUE, GREEN]),
		new Column([YELLOW, YELLOW, RED, RED]),
		new Column([BLUE, RED, GREEN, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.24:
	var columns = [
		new Column([BRIGHTPINK, WHITE, YELLOW, WHITE]),
		new Column([BLUE, RED, RED, RED]),
		new Column([YELLOW, GREEN, BLUE, GREEN]),
		new Column([YELLOW, BLUE, BRIGHTPINK, BRIGHTPINK]),
		new Column([BRIGHTPINK, GREEN, BLUE, WHITE]),
		new Column([WHITE, YELLOW, GREEN, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.25:
	var columns = [
		new Column([BLUE, GREEN, RED, GREEN]),
		new Column([BRIGHTPINK, BRIGHTPINK, RED, RED]),
		new Column([YELLOW, BRIGHTPINK, YELLOW, BLUE]),
		new Column([RED, YELLOW, BLUE, GREEN]),
		new Column([YELLOW, BRIGHTPINK, BLUE, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.26:
	var columns = [
		new Column([BLUE, GREEN, BRIGHTPINK, BLUE]),
		new Column([YELLOW, RED, BRIGHTPINK, BLUE]),
		new Column([GREEN, RED, BLUE, BRIGHTPINK]),
		new Column([RED, GREEN, RED, GREEN]),
		new Column([BRIGHTPINK, YELLOW, YELLOW, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.27:
	var columns = [
		new Column([BLUE, RED, GREEN, YELLOW]),
		new Column([YELLOW, BRIGHTPINK, YELLOW, RED]),
		new Column([BRIGHTPINK, BRIGHTPINK, GREEN, YELLOW]),
		new Column([BLUE, GREEN, BRIGHTPINK, GREEN]),
		new Column([BLUE, RED, BLUE, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.28:
	var columns = [
		new Column([RED, WHITE, YELLOW, YELLOW]),
		new Column([BRIGHTPINK, WHITE, BLUE, GREEN]),
		new Column([GREEN, RED, BLUE, BRIGHTPINK]),
		new Column([RED, BRIGHTPINK, GREEN, BRIGHTPINK]),
		new Column([WHITE, YELLOW, WHITE, RED]),
		new Column([BLUE, YELLOW, GREEN, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.29:
	var columns = [
		new Column([GREEN, YELLOW, RED, RED]),
		new Column([BRIGHTPINK, YELLOW, BRIGHTPINK, RED]),
		new Column([BRIGHTPINK, BLUE, GREEN, BLUE]),
		new Column([GREEN, BRIGHTPINK, RED, YELLOW]),
		new Column([BLUE, GREEN, BLUE, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.30:
	var columns = [
		new Column([YELLOW, YELLOW, RED, BLUE]),
		new Column([GREEN, GREEN, GREEN, BLUE]),
		new Column([GREEN, RED, RED, BLUE]),
		new Column([RED, BLUE, YELLOW, YELLOW]),
		new Column([]),
	];
	break;

	case 2.31:
	var columns = [
		new Column([GREEN, YELLOW, RED, GREEN]),
		new Column([BRIGHTPINK, GREEN, YELLOW, BLUE]),
		new Column([RED, GREEN, BLUE, BLUE]),
		new Column([BRIGHTPINK, BRIGHTPINK, BLUE, YELLOW]),
		new Column([RED, BRIGHTPINK, RED, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.32:
	var columns = [
		new Column([GREEN, WHITE, WHITE, GREEN]),
		new Column([BLUE, YELLOW, YELLOW, WHITE]),
		new Column([RED, BRIGHTPINK, BLUE, BRIGHTPINK]),
		new Column([GREEN, YELLOW, BLUE, GREEN]),
		new Column([RED, YELLOW, RED, BRIGHTPINK]),
		new Column([BRIGHTPINK, RED, BLUE, WHITE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.33:
	var columns = [
		new Column([BLUE, YELLOW, BRIGHTPINK, RED]),
		new Column([RED, RED, BRIGHTPINK, BLUE]),
		new Column([YELLOW, YELLOW, BRIGHTPINK, GREEN]),
		new Column([YELLOW, BLUE, BRIGHTPINK, RED]),
		new Column([BLUE, GREEN, GREEN, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.34:
	var columns = [
		new Column([YELLOW, GREEN, BRIGHTPINK, GREEN]),
		new Column([YELLOW, RED, WHITE, GREEN]),
		new Column([YELLOW, RED, BLUE, BLUE]),
		new Column([BRIGHTPINK, BRIGHTPINK, WHITE, BRIGHTPINK]),
		new Column([RED, GREEN, RED, BLUE]),
		new Column([WHITE, BLUE, YELLOW, WHITE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.35:
	var columns = [
		new Column([BLUE, YELLOW, BRIGHTPINK, GREEN]),
		new Column([YELLOW, GREEN, BLUE, BRIGHTPINK]),
		new Column([YELLOW, RED, GREEN, BLUE]),
		new Column([YELLOW, BRIGHTPINK, BRIGHTPINK, RED]),
		new Column([RED, RED, BLUE, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.36:
	var columns = [
		new Column([WHITE, GREEN, YELLOW, RED]),
		new Column([WHITE, GREEN, YELLOW, RED]),
		new Column([BRIGHTPINK, WHITE, BLUE, BRIGHTPINK]),
		new Column([BLUE, BLUE, RED, BRIGHTPINK]),
		new Column([GREEN, RED, WHITE, YELLOW]),
		new Column([BLUE, BRIGHTPINK, YELLOW, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.37:
	var columns = [
		new Column([GREEN, RED, GREEN, YELLOW]),
		new Column([BRIGHTPINK, GREEN, WHITE, WHITE]),
		new Column([WHITE, GREEN, BLUE, WHITE]),
		new Column([BRIGHTPINK, YELLOW, BLUE, YELLOW]),
		new Column([BLUE, RED, BRIGHTPINK, YELLOW]),
		new Column([RED, RED, BLUE, BRIGHTPINK]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.38:
	var columns = [
		new Column([GREEN, BLUE, YELLOW, RED]),
		new Column([BRIGHTPINK, BRIGHTPINK, BLUE, GREEN]),
		new Column([YELLOW, BLUE, BRIGHTPINK, YELLOW]),
		new Column([GREEN, GREEN, RED, RED]),
		new Column([RED, BRIGHTPINK, BLUE, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.39:
	var columns = [
		new Column([BRIGHTPINK, RED, YELLOW, BRIGHTPINK]),
		new Column([WHITE, BRIGHTPINK, GREEN, YELLOW]),
		new Column([BLUE, RED, GREEN, RED]),
		new Column([WHITE, BLUE, BLUE, YELLOW]),
		new Column([YELLOW, RED, GREEN, BRIGHTPINK]),
		new Column([WHITE, WHITE, GREEN, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.40:
	var columns = [
		new Column([GREEN, BLUE, BRIGHTPINK, RED]),
		new Column([GREEN, YELLOW, GREEN, RED]),
		new Column([BLUE, GREEN, BLUE, YELLOW]),
		new Column([BRIGHTPINK, BRIGHTPINK, RED, BRIGHTPINK]),
		new Column([RED, BLUE, YELLOW, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.41:
	var columns = [
		new Column([RED, BLUE, RED, YELLOW]),
		new Column([WHITE, YELLOW, GREEN, BRIGHTPINK]),
		new Column([BLUE, RED, YELLOW, BLUE]),
		new Column([GREEN, WHITE, YELLOW, BRIGHTPINK]),
		new Column([GREEN, BLUE, GREEN, BRIGHTPINK]),
		new Column([WHITE, RED, WHITE, BRIGHTPINK]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.42:
	var columns = [
		new Column([GREEN, BRIGHTPINK, GREEN, YELLOW]),
		new Column([YELLOW, RED, GREEN, BLUE]),
		new Column([BLUE, BRIGHTPINK, RED, BRIGHTPINK]),
		new Column([BLUE, RED, BRIGHTPINK, YELLOW]),
		new Column([YELLOW, GREEN, BLUE, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.43:
	var columns = [
		new Column([YELLOW, BLUE, BLUE, YELLOW]),
		new Column([GREEN, GREEN, BLUE, RED]),
		new Column([RED, GREEN, GREEN, RED]),
		new Column([YELLOW, BLUE, YELLOW, RED]),
		new Column([]),
	];
	break;

	case 2.44:
	var columns = [
		new Column([GREEN, GREEN, BLUE, RED]),
		new Column([YELLOW, RED, BRIGHTPINK, RED]),
		new Column([YELLOW, GREEN, GREEN, RED]),
		new Column([BRIGHTPINK, BLUE, BLUE, BRIGHTPINK]),
		new Column([YELLOW, BRIGHTPINK, YELLOW, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 2.45:
	var columns = [
		new Column([RED, YELLOW, BLUE, RED]),
		new Column([YELLOW, YELLOW, RED, YELLOW]),
		new Column([BLUE, BLUE, GREEN, RED]),
		new Column([GREEN, GREEN, GREEN, BLUE]),
		new Column([]),
	];
	break;

	case 2.46:
	var columns = [
		new Column([RED, YELLOW, BLUE, YELLOW]),
		new Column([BLUE, GREEN, BLUE, YELLOW]),
		new Column([RED, RED, BLUE, RED]),
		new Column([GREEN, GREEN, YELLOW, GREEN]),
		new Column([]),
	];
	break;

	case 2.47:
	var columns = [
		new Column([GREEN, GREEN, RED, BLUE]),
		new Column([BLUE, RED, BLUE, RED]),
		new Column([YELLOW, GREEN, YELLOW, YELLOW]),
		new Column([BLUE, YELLOW, GREEN, RED]),
		new Column([]),
	];
	break;

	case 2.48:
	var columns = [
		new Column([YELLOW, RED, RED, RED]),
		new Column([YELLOW, GREEN, YELLOW, RED]),
		new Column([BLUE, BLUE, GREEN, YELLOW]),
		new Column([GREEN, BLUE, BLUE, GREEN]),
		new Column([]),
	];
	break;

	case 2.49:
	var columns = [
		new Column([RED, RED, GREEN, RED]),
		new Column([YELLOW, GREEN, BLUE, BLUE]),
		new Column([GREEN, BLUE, YELLOW, YELLOW]),
		new Column([RED, YELLOW, BLUE, GREEN]),
		new Column([]),
	];
	break;

	case 2.50:
	var columns = [
		new Column([RED, BLUE, YELLOW, YELLOW]),
		new Column([YELLOW, BLUE, RED, GREEN]),
		new Column([GREEN, GREEN, GREEN, RED]),
		new Column([RED, YELLOW, BLUE, BLUE]),
		new Column([]),
	];
	break;

	case 3.01:
	var columns = [
		new Column([GREEN, GREEN, BRIGHTPINK, RED]),
		new Column([LIGHTBLUE, LIGHTBLUE, GREEN, WHITE]),
		new Column([BLUE, YELLOW, YELLOW, WHITE]),
		new Column([BRIGHTPINK, RED, LIGHTBLUE, GREEN]),
		new Column([LIGHTBLUE, WHITE, RED, WHITE]),
		new Column([BLUE, BRIGHTPINK, BLUE, YELLOW]),
		new Column([YELLOW, BLUE, BRIGHTPINK, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.02:
	var columns = [
		new Column([RED, LIGHTBLUE, LIGHTBLUE, BRIGHTPINK]),
		new Column([RED, YELLOW, RED, WHITE]),
		new Column([BLUE, LIGHTBLUE, RED, BLUE]),
		new Column([GREEN, YELLOW, YELLOW, BLUE]),
		new Column([WHITE, BRIGHTPINK, BLUE, WHITE]),
		new Column([WHITE, GREEN, LIGHTBLUE, BRIGHTPINK]),
		new Column([GREEN, BRIGHTPINK, YELLOW, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.03:
	var columns = [
		new Column([RED, LIGHTBLUE, LIGHTBLUE, BRIGHTPINK]),
		new Column([RED, YELLOW, RED, WHITE]),
		new Column([BLUE, LIGHTBLUE, RED, BLUE]),
		new Column([GREEN, YELLOW, YELLOW, BLUE]),
		new Column([WHITE, BRIGHTPINK, BLUE, WHITE]),
		new Column([WHITE, GREEN, LIGHTBLUE, BRIGHTPINK]),
		new Column([GREEN, BRIGHTPINK, YELLOW, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.04:	//3 ball
	var columns = [
		new Column([RED, RED, YELLOW]),
		new Column([YELLOW, BRIGHTPINK, BLUE]),
		new Column([WHITE, BLUE, GREEN]),
		new Column([BRIGHTPINK, YELLOW, WHITE]),
		new Column([RED, GREEN, WHITE]),
		new Column([BRIGHTPINK, BLUE, GREEN]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.05:	
	var columns = [
		new Column([LIGHTBLUE, WHITE, BLUE, YELLOW]),
		new Column([WHITE, BLUE, LIGHTBLUE, BLUE]),
		new Column([GREEN, BRIGHTPINK, GREEN, RED]),
		new Column([GREEN, WHITE, RED, YELLOW]),
		new Column([LIGHTBLUE, BRIGHTPINK, RED, BRIGHTPINK]),
		new Column([GREEN , BRIGHTPINK, YELLOW, WHITE]),
		new Column([LIGHTBLUE, BLUE, YELLOW, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.06:	
	var columns = [
		new Column([GREEN, YELLOW, WHITE, YELLOW]),
		new Column([LIGHTBLUE, RED, YELLOW, BRIGHTPINK]),
		new Column([BLUE, WHITE, RED, WHITE]),
		new Column([LIGHTBLUE, WHITE, BLUE, GREEN]),
		new Column([GREEN, RED, LIGHTBLUE, BLUE]),
		new Column([BRIGHTPINK, LIGHTBLUE, BRIGHTPINK, GREEN]),
		new Column([BLUE, YELLOW, BRIGHTPINK, RED]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.07:	//3 ball
	var columns = [
		new Column([GREEN, BLUE, BLUE]),
		new Column([RED, YELLOW, RED]),
		new Column([WHITE, BRIGHTPINK, WHITE]),
		new Column([BLUE, BRIGHTPINK, GREEN]),
		new Column([BRIGHTPINK, GREEN, YELLOW]),
		new Column([RED, WHITE, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.08:	
	var columns = [
		new Column([RED, BRIGHTPINK, WHITE, YELLOW]),
		new Column([GREEN, WHITE, BLUE, RED]),
		new Column([LIGHTBLUE, BRIGHTPINK, LIGHTBLUE, BLUE]),
		new Column([LIGHTBLUE, YELLOW, GREEN, BLUE]),
		new Column([BRIGHTPINK, GREEN, GREEN, BLUE]),
		new Column([RED, RED, YELLOW, YELLOW]),
		new Column([LIGHTBLUE, WHITE, BRIGHTPINK, WHITE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.09:	
	var columns = [
		new Column([BRIGHTPINK, YELLOW, BRIGHTPINK]),
		new Column([BRIGHTPINK, YELLOW, RED]),
		new Column([WHITE, GREEN, BLUE]),
		new Column([WHITE, GREEN, WHITE]),
		new Column([BLUE, RED, BLUE]),
		new Column([YELLOW, RED, GREEN]),
		new Column([]),
	];
	break;

	case 3.10:	
	var columns = [
		new Column([BLUE, BLUE, RED, WHITE]),
		new Column([LIGHTBLUE, YELLOW, BRIGHTPINK, BLUE]),
		new Column([GREEN, LIGHTBLUE, BRIGHTPINK, RED]),
		new Column([YELLOW, BLUE, LIGHTBLUE, GREEN]),
		new Column([GREEN, RED, GREEN, WHITE]),
		new Column([YELLOW, BRIGHTPINK, WHITE, WHITE]),
		new Column([RED, BRIGHTPINK, LIGHTBLUE, YELLOW]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.11:	
	var columns = [
		new Column([BLUE, RED, LIGHTBLUE, ORANGE]),
		new Column([RED, YELLOW, BRIGHTPINK, GREEN]),
		new Column([BLUE, WHITE, WHITE, YELLOW]),
		new Column([WHITE, YELLOW, GREEN, RED]),
		new Column([BRIGHTPINK, YELLOW, GREEN, LIGHTBLUE]),
		new Column([BRIGHTPINK, BRIGHTPINK, ORANGE, ORANGE]),
		new Column([BLUE, ORANGE, LIGHTBLUE, WHITE]),
		new Column([RED, GREEN, LIGHTBLUE, BLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.12:	
	var columns = [
		new Column([LIGHTBLUE, RED, WHITE, WHITE]),
		new Column([RED, RED, BRIGHTPINK, GREEN]),
		new Column([GREEN, LIGHTBLUE, BLUE, GREEN]),
		new Column([BLUE, YELLOW, BRIGHTPINK, RED]),
		new Column([BLUE, YELLOW, BLUE, YELLOW]),
		new Column([GREEN, WHITE, YELLOW, WHITE]),
		new Column([BRIGHTPINK, LIGHTBLUE, BRIGHTPINK,LIGHTBLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.13:	
	var columns = [
		new Column([BRIGHTPINK, ORANGE, BLUE, BLUE]),
		new Column([LIGHTBLUE, WHITE, RED, BLUE]),
		new Column([YELLOW, ORANGE, RED, WHITE]),
		new Column([GREEN, GREEN, BRIGHTPINK, GREEN]),
		new Column([RED, ORANGE, RED, GREEN]),
		new Column([YELLOW, BRIGHTPINK, WHITE, YELLOW]),
		new Column([LIGHTBLUE, WHITE, BRIGHTPINK, LIGHTBLUE]),
		new Column([BLUE, YELLOW, ORANGE, LIGHTBLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.14:	
	var columns = [
		new Column([BLUE, BRIGHTPINK, RED, YELLOW]),
		new Column([WHITE, LIGHTBLUE, WHITE, LIGHTBLUE]),
		new Column([LIGHTBLUE, RED, BRIGHTPINK, GREEN]),
		new Column([RED, GREEN, YELLOW, BLUE]),
		new Column([WHITE, GREEN, WHITE, RED]),
		new Column([LIGHTBLUE, BLUE, YELLOW, BLUE]),
		new Column([BRIGHTPINK, YELLOW, BRIGHTPINK]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.15:	
	var columns = [
		new Column([BLUE, YELLOW, YELLOW, WHITE]),
		new Column([YELLOW, ORANGE, LIGHTBLUE, GREEN]),
		new Column([LIGHTBLUE, WHITE, BLUE, LIGHTBLUE]),
		new Column([GREEN, BRIGHTPINK, RED, WHITE]),
		new Column([RED, BRIGHTPINK, BRIGHTPINK, ORANGE]),
		new Column([RED, YELLOW, GREEN, LIGHTBLUE]),
		new Column([RED, GREEN, ORANGE, ORANGE]),
		new Column([BRIGHTPINK, BLUE, BLUE, WHITE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.16:	
	var columns = [
		new Column([LIGHTBLUE, BLUE, YELLOW, GREEN]),
		new Column([RED, LIGHTBLUE, YELLOW, BRIGHTPINK]),
		new Column([LIGHTBLUE, YELLOW, BRIGHTPINK, GREEN]),
		new Column([RED, WHITE, BRIGHTPINK, WHITE]),
		new Column([BLUE, RED, BLUE, BLUE]),
		new Column([GREEN, YELLOW, LIGHTBLUE, WHITE]),
		new Column([GREEN, BRIGHTPINK, RED, WHITE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.17:	
	var columns = [
		new Column([BLUE, WHITE, BRIGHTPINK]),
		new Column([YELLOW, GREEN, WHITE]),
		new Column([GREEN, RED, BLUE]),
		new Column([RED, YELLOW, WHITE]),
		new Column([BRIGHTPINK, GREEN, YELLOW]),
		new Column([BLUE, RED, BRIGHTPINK]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.18:	
	var columns = [
		new Column([BRIGHTPINK, RED, ORANGE, LIGHTBLUE]),
		new Column([RED, GREEN, GREEN, GREEN]),
		new Column([BLUE, ORANGE, YELLOW, WHITE]),
		new Column([BLUE, RED, BRIGHTPINK, GREEN]),
		new Column([RED, WHITE, ORANGE, YELLOW]),
		new Column([YELLOW, BLUE, BLUE, LIGHTBLUE]),
		new Column([ORANGE, YELLOW, BLUE, BRIGHTPINK]),
		new Column([WHITE, WHITE, BRIGHTPINK, LIGHTBLUE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.19:	
	var columns = [
		new Column([YELLOW, RED, GREEN]),
		new Column([WHITE, GREEN, BRIGHTPINK]),
		new Column([GREEN, BRIGHTPINK, RED]),
		new Column([BRIGHTPINK, BLUE, YELLOW]),
		new Column([BLUE, WHITE, RED]),
		new Column([BLUE, WHITE, YELLOW]),
		new Column([]),
	];
	break;

	case 3.20:	
	var columns = [
		new Column([YELLOW, ORANGE, RED, BLUE]),
		new Column([LIGHTBLUE, LIGHTBLUE, LIGHTBLUE, YELLOW]),
		new Column([BRIGHTPINK, GREEN, RED, ORANGE]),
		new Column([ORANGE, BRIGHTPINK, WHITE, YELLOW]),
		new Column([BRIGHTPINK, WHITE, GREEN, WHITE]),
		new Column([BLUE, ORANGE, RED, BRIGHTPINK]),
		new Column([GREEN, YELLOW, BLUE, GREEN]),
		new Column([BLUE, LIGHTBLUE, RED, WHITE]),
		new Column([]),
		new Column([]),
	];
	break;

	case 3.99:	
	var columns = [
		new Column([]),
		new Column([]),
		new Column([]),
		new Column([]),
		new Column([]),
		new Column([]),
		new Column([]),
		new Column([]),
		new Column([]),
		new Column([]),
	];
	break;

	case 4.1:	
	var columns = [
		new Column([PURPLE, CYAN, YELLOW, WHITE]),
		new Column([CYAN, YELLOW, GREEN, BLUE]),
		new Column([BLUE, BRIGHTPINK, GREEN, RED]),
		new Column([RED, YELLOW, BRIGHTPINK, GREEN]),
		new Column([CYAN, RED, ORANGE, BRIGHTPINK]),
		new Column([PURPLE, WHITE, WHITE, ORANGE]),
		new Column([BLUE, PURPLE, ORANGE, LIGHTBLUE]),
		new Column([ORANGE, LIGHTBLUE, CYAN, BRIGHTPINK]),
		new Column([LIGHTBLUE, GREEN, PURPLE, LIGHTBLUE]),
		new Column([RED, BLUE, YELLOW,WHITE]),
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

	case 4.3262:
	var columns = [
		new Column([RED, PURPLE, PURPLE, PURPLE]),
		new Column([WHITE, GREEN, GREEN, GREEN]),//1
		new Column([LIGHTGREEN, CYAN, CYAN]),
		new Column([GREY, BRIGHTPINK, BRIGHTPINK, BRIGHTPINK]),//3
		new Column([BLUE, LIGHTBLUE, LIGHTBLUE, LIGHTBLUE]),
		new Column([GREY, ORANGE, YELLOW, LIGHTGREEN]),//5
		new Column([PINK, PINK, PINK]),
		new Column([LIGHTGREEN, WHITE, WHITE, PURPLE]),//7
		new Column([YELLOW, RED, CYAN, CYAN]),
		new Column([LIGHTBLUE, YELLOW, BLUE, BLUE]),//9
		new Column([PINK, RED, ORANGE, LIGHTGREEN]),
		new Column([GREEN, RED, BRIGHTPINK, WHITE]),
		new Column([BLUE, YELLOW, GREY, GREY]),
		new Column([]),
		new Column([ORANGE, ORANGE]),
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
	console.log(level);
	return columns
}



module.exports = getTheLevel;


