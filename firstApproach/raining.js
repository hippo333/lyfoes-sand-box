
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
		
		if(theCol.isMonochrome()){continue}
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
	
	let target = columns0.findIndex(
		x => x.isMonochrome()
		&& x.top() == mostPresent[0]
	);
	if(target ==-1){
		target= emptyBotle(columns0);
	}
	console.log("target",target);
	
	if(target ==-1){return}
	
	for(thisCol of lstCol){
		if(thisCol == target){continue}
		move(state,thisCol,target);
		
		nextTarget.push(thisCol);
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
							&& clr.content.length + columns0[col2].bigBall <=4	
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
function rainingAllColor(sucess2){
	//console.log("raining All Color");
	
	let lstAllColor = getAllColor();
	
	for(let col=0; col<lstAllColor.length; col++){
		success2 = true;
		let thisColor = lstAllColor[col];
		
		if(thisColor == -1){continue}
		
		//after raining
		let newTarget = moveToColor(col);
		nextTarget = nextTarget.concat(newTarget);
	}
	
}

	

function main(state2,succes2){
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
	rainingAllColor(succes2)

	
	
	//abstract(columns0);
	console.log(lstOfMove);
}

//main(state);






module.exports = main


