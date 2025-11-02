
var column = require('../tools/column');
//var columns999 = require('../level');
var abstract = require('../tools/abstract');
var move = require('../tools/move');



function emptyBotle(columns2){
	
	for(let col=0 ; col<columns2.length; col++){
		if(columns2[col].isEmpty()){return col}
		
	}
	//else
	return null
}


let columns0 = [];
let lstOfMove = [];
let state = [columns0,lstOfMove];


//set up











let lstByColor = [];
let mostPresent = [-1,[]];

function addToTheList(col,color){
	let theColor = lstByColor.find(
		clr => clr[0] ==color	
	);
	
	if(theColor == undefined){
		lstByColor.push([color,[col]]);
		return
	}	
	theColor[1].push(col);	
	
	
	if(theColor[1].length > mostPresent[1].length){
		mostPresent = theColor;
	}
}

//newColor
function mostPresentBall(){
	
	for(let col=0; col< columns0.length; col++){
		let theCol = columns0[col];
		let theColor = theCol.top();
		
		if(theColor == undefined){continue}
		
		addToTheList(col,theColor);		
	}	
}


/*
console.log("lstByColor",lstByColor);
console.log("theMost Present",mostPresent);
*/

let nextTarget = [];

function newColor(){
	let lstCol = mostPresent[1]
	//if(lstCol.length <3){return}
	
	let emptyBtl= emptyBotle(columns0);
	console.log("emptyBtl",emptyBtl);
	
	if(emptyBtl ==-1){return}
	
	for(let col=0; col<lstCol.length; col++){
		move(state,lstCol[col],emptyBtl);
		
		nextTarget.push(lstCol[col]);
	}
	
	
	
}




//raining all color (column monochrome);
function getAllColor(){
	let output = [];
	
	for(let col=0; col < columns0.length; col++){
	
		if(columns0[col].isEmpty()){
			output.push(-1);
		}else if(columns0[col].content.length ==1){//we dont count if 1 ball
			output.push(-1)
		}else if(columns0[col].isMonochrome()){
			output.push(columns0[col].top());
		}else{
			output.push(-1);
		}
		
	}
	//console.log("get all color",output);
	return output
}

//rainAllColor
//move all top ball who can go to col2
function moveToColor(col2){
	console.log("move to color",col2);
	
	let newTarget2 = []; //after raining
	let theColor = columns0[col2].top();
	
	for(let col=0; col<columns0.length; col++){
		let thisCol = columns0[col];
		let topBall = thisCol.top();
		
		if(col == col2){continue}
		if(topBall == theColor){
			
			//if the invers move free a column
			//move the second ball to the color
			if(columns0[col2].content.length ==2){
				if(thisCol.content.length < 4){
					if(columns0[col2].content[0] == mostPresent[0]){
						let theColor = columns0.findIndex(
							clr => clr.top() == mostPresent[0]
							&& clr.content.length <4	
						)
						if(theColor != -1){
							//console.log("colFrom",col2,"colTo",col);
							//console.log(" the color",theColor,"\n");
							move(state,col2,col);
							if(theColor != col2){
								console.log("colFrom",col2,"colTo",theColor);
								move(state,col2,theColor);
							}
							
							abstract(columns0)
							console.log("lstOfMove",state[1]);
							//throw Error
							continue
						}
					}
				}	//messy			
			}//*/
					
			
			
			//dont Over feed
			if(thisCol.bigBall + columns0[col2].content.length > 4){continue}
			
			move(state,col,col2);
			newTarget2.push(col);
			//console.log("add col",col);
			//console.log("move",col,col2);
		}
		
	}
	//console.log("next target2",newTarget2);
	return newTarget2
}

//for each color (column monochrome) move all top Ball who can go to
function rainingAllColor(){
	//console.log("raining All Color");
	
	let lstAllColor = getAllColor();
	
	for(let col=0; col<lstAllColor.length; col++){
		let thisColor = lstAllColor[col];
		
		if(thisColor == -1){continue}
		
		//after raining
		let newTarget = moveToColor(col);
		nextTarget = nextTarget.concat(newTarget);
	}
	
}

	
	
//after raining we ave new top ball so we do rain to the new	
function afterRaining(){
	console.log("after raining, for the cols",nextTarget)
	let nextTarget2 = [];
	
	for(col =0; col<nextTarget.length; col++){
		let thisCol = nextTarget[col];
		
		if(columns0[thisCol].isEmpty()){continue}
		
		let newTarget = moveToColor(thisCol);
		
		nextTarget2 = nextTarget2.concat(newTarget)
	}
	nextTarget = nextTarget2;
	
	console.log("after raining over");
}

function cleanAfterRaining(){

	//max 10 ball /column
	for(let i=0; i<10; i++){
		if(nextTarget.length ==0 ){break}
		if(i ==9){
			console.log("infinit raining");
			console.log("nextTarget",nextTaret);
		}
		afterRaining();
		
		//debug
		abstract(columns0);
		console.log(lstOfMove);
	}
}

function main(state2){
	state = state2;
	[columns0,lstOfMove]= state
	
	
	//reset
	lstByColor = [];
	mostPresent = [-1,[]];
	
	//console.log("mostPresent Ball");
	mostPresentBall();
	
	//console.log("new Color");
	newColor();
	
	//console.log("raining all color");
	rainingAllColor()

	//abstract(columns0);
	//console.log(lstOfMove);
	
	//console.log("clean after raining");
	cleanAfterRaining();
	
	//abstract(columns0);
	console.log(lstOfMove);
}

//main(state);






module.exports = main


