var Column = require('./column');
var [bigBall,lstBigBall] = require('./bigBall');
var abstract = require('./abstract');


function emptyBotle(lstBigBall2){
	btl = lstBigBall2.findIndex(
		btl => btl[0] ==0
		&& btl[1] == 0
	);
	if(btl != -1){
		return btl
	}else{
		return null
	}
}



function Target(state,col,VColumn2){	//place for move the ball above col
	console.log("      //target for col",col);
	
	let [columns2,lstBigBall2,xxx] = state;
	
	if(VColumn2 != undefined){
		console.log("      last chance")
		let theBall = VColumn2[col][0];
		for(way in VColumn2){
			if(VColumn2[way][0] != theBall){continue}
			if(way == col){continue}
			if(VColumn2[col][1] + VColumn2[way][2] <= 4){
				console.log("from",col,"big ball",VColumn2[col][1]);
				console.log("to",col,"big ball",VColumn2[way][2]);
				return way
			}
			
		}
		console.log("      no target possible");
		return null
	}
	let theCol = columns2[col];
	let theBall = theCol.top();
	
	if(theBall == undefined){
		console.log("      can't find the ball above",col,theCol);
	}
	let theColor = getColor(lstBigBall2,theBall);
	if(theColor != null){
		//console.log("      i get a color for",theBall,theColor,columns2[theColor].content);
		return theColor
	}else{
		//console.log("      i can't get a color for",col,theBall);	
		let emptyBtl = emptyBotle(lstBigBall2);
		if (emptyBtl != null){
			//console.log("      i can do empty botlr",emptyBtl);
			return emptyBtl
		}else{
			console.log("      no target for",col);
			return null
		}
	}
}


function newVirtualColumn(columns2,lstBigBall2){
	//console.log("\n______virtualcolumn");
	VColumn2 = [];
	
	for(i in columns2){
		let color = columns2[i].top();
		let bigBall = lstBigBall2[i][0];
		let sizeCol = columns2[i].content.length ;
		if (sizeCol ==0){
			color = 0;
			bigBall = 0;
		}
		
		VColumn2.push([color,bigBall,sizeCol]);
		
	}
	//console.log("      color, bigBall, sizeCol");
	//console.log("      Vcolumns",VColumn2);
	return VColumn2
}

function virtualUpdate(columns2,VColumn2,from,to){
	//console.log(`\n      virtual update from:${from} to:${to}`);
	//console.log("      ",VColumn2);
	let bllFrom = VColumn2[from][0];
	let bBFrom = VColumn2[from][1];
	let sizeFrom = VColumn2[from][2];
	
	let bllTo = VColumn2[to][0];
	let bBTo = VColumn2[to][1];
	let sizeTo = VColumn2[to][2];
	
	if(bllFrom != bllTo && bBTo != 0){
		console.log("      virtual update");
		console.log("  ____error ");
		console.log("      the ball are different");
		console.log(`      virtual update from:${from} to:${to}`);
		console.log("      ",VColumn2,"\n");
	}
	
	bBTo += bBFrom;
	sizeTo +=bBFrom;
	bllTo = bllFrom
	
	sizeFrom -= bBFrom;
	if(sizeFrom > 0){
		bllFrom = columns2[from].content[sizeFrom-1];
		bBFrom =1;
	}else{
		bllFrom =0;
		bBFrom = 0;
	}
	
	for(let i=sizeFrom-2;i>=0;i--){
		if(columns2[from].content[i] == bllFrom){
			bBFrom++
		}else{
			break;
		}
	}
	VColumn2[from] = [bllFrom,bBFrom,sizeFrom];
	VColumn2[to] = [bllTo,bBTo,sizeTo];
	
	//console.log("      from",from,"to",to);
	//console.log("      Vcolumn2",VColumn2);
}

function getColor(lstBigBall2,blue){
	let out = lstBigBall2.findIndex(
		out => out[1] == blue	
	);
	if(out != -1){
		return out
	}else{
		return null
	}
}


//all column who contain a blue ball and the one with the lowest ball above

function AllBlue2(VColumn2,colB,blue){
	let allBlue = [];
	//console.log("all blue col",colB,"place for",VColumn2[colB][2],"balls");
	for(let i in VColumn2){
		if(i== colB){continue}
		
		if(lstBigBall[i][1]==blue ){	//if it can go to color
			//console.log(`the on the col ${colB} the ball ${blue} go to ${i}`);
			return [i]
		
		}
		
		if(VColumn2[i][0]==blue && VColumn2[i][1] * VColumn2[colB][2] <=4){
			allBlue.push(i);
			//console.log("    blue",i);
		}
	}
	
	return allBlue;
}

function ifNewColor(col,columns2,lstTwin,lstBigBall){
	//console.log("\n      if new color");
	let firstCol = lstTwin[1];
	let firstBall = columns2[col].top();
	let firstBigBall = lstBigBall[firstCol][0];
	//console.log("      firs:col",firstCol,"ball",firstBall,"bigball",firstBigBall);
	//console.log("      lst Twin",lstTwin);
	
	let thisBigBall = lstBigBall[col][0];
	//console.log("      thisBigBall",thisBigBall);
}

function getTwin(state,lstTwin,alreadyTry,mode,VColumn2){
	console.log("\n  //get twin",lstTwin);
	let [columns2,lstBigBall2,xxx] = state;
	
	if(lstTwin.length > columns2.length*3){return}//loop killer
	
	let output =[];
	let lstOfCol =[];	//all col include in calcul (anti double)
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	
	if(typeof(lastCol)== "object"){	//if last move is a color
		lastCol = lastCol[0];
	}
	
	let sdBall = VColumn2[lastCol][0];
	let sdBigBall = VColumn2[lastCol][1];
	//console.log(` lastCol ${lastCol} sdBall ${sdBall} sdBigBall ${sdBigBall}`)
	
	if(sdBall == 0  ){
		//console.log("  it free a botle");
		
		
		
		let firstMove = [lstTwin[1],lstTwin[0]];
		
		lstTwin = lstTwin.slice(2);		
		lstTwin = [firstMove].concat(lstTwin);
		
		//console.log("  lstTwin",lstTwin);
		return [[lstTwin],[]]
	}


	ifNewColor(lastCol,columns2,lstTwin,lstBigBall);
	
	let allBlue = AllBlue2(VColumn2,lastCol,sdBall);
	
	//if we can't move saw if we can go to to the first empty
	if (allBlue.length ==0){
		//console.log("*/* no blue to ",lastCol);
		let firstMove = lstTwin[0];
		let firstBall = VColumn2[firstMove][0];
		//console.log(`  the first empty botle ${firstMove} the ball ${firstBall} in the list ${lstTwin}`);
		
		sdBall = firstBall;
		lastCol = firstMove;
		allBlue = AllBlue2(VColumn2,lastCol,sdBall);
		let target2;
		
		//console.log("all blue 2.0",allBlue);

		if (allBlue.length !=0){
			//mode = "go to first";
			
			target2 = allBlue[0];
			//console.log("now the col",lastCol,"can go to",target2);
			
			let thisCoppy = [...lstTwin];
			thisCoppy.push([target2,lastCol]);
			
			
			virtualUpdate(columns2,VColumn2,target2,lastCol);
						
			let nextStep = getTwin(state,thisCoppy,alreadyTry,mode,VColumn2);//do it 
			
			if(nextStep[0].length != 0){		//if the next recursive loop work
				output = output.concat(nextStep[0]);	//return it for the previous
			}
			
			return [output,lstOfCol]
				
					
		}else{	//move the above ball to an other column
		
			lastCol = lstTwin[lstTwin.length -1];//last col of the list
			
			if(typeof(lastCol)== "object"){
				lastCol = lastCol[0];
			}
			
			sdBall = VColumn2[lastCol][0];
			
			
			target2 = Target(state,lastCol,VColumn2);
			
			if(target2 == null){return [[],[]]}
			
			//console.log("now the col",lastCol,"can go to",target2);
			
			let thisCoppy = [...lstTwin];
			thisCoppy.push([lastCol,target2]);
			
			
			virtualUpdate(columns2,VColumn2,lastCol,target2);
						
			let nextStep = getTwin(state,thisCoppy,alreadyTry,mode,VColumn2);//do it 
			
			if(nextStep[0].length != 0){		//if the next recursive loop work
				output = output.concat(nextStep[0]);	//return it for the previous
			}
			
			return [output,lstOfCol]
		}
	}
	
		
	let thisTry;		//curent element of the loop
	let alreadyThere;	//short cut of intern loop
	let thisCoppy = []	//coppy of lstTwin 
	
	//console.log("  for all col who contain the color");
	//console.log("  ",allBlue.length ,"way possible");
	for(way in allBlue){
		thisTry = allBlue[way];
		thisCoppy = [...lstTwin];//clone
		//console.log("  all blue element",way,thisTry);
		
		if(alreadyTry.indexOf(thisTry) != -1){continue}	//already try this column
		//console.log(" -i never try this");
		
		if(VColumn2[thisTry][1] + VColumn2[lastCol][2] > 4){continue}//big ball
		//console.log(" -the big ball dont over feed");
		
		lstOfCol.push(thisTry);		
		alreadyThere =lstTwin.indexOf(thisTry);//if we loop on the list
		
		if(alreadyThere != -1 && mode =="standard" && false){
		//if we loop on the list of move short cut
			console.log(" -already there");
			let firstMove = [,thisCoppy[0]];
			firstMove[0] = thisTry;
			thisCoppy = thisCoppy.slice(alreadyThere+1);//cut the col befor the loop
			
			thisCoppy = [firstMove].concat(thisCoppy);
			output.push(thisCoppy);
			//here its fuck top
			
			
		}else{//do it recursively
			thisCoppy.push(thisTry);
			virtualUpdate(columns2,VColumn2,thisTry,lastCol);
			//console.log("  we use Vcolumn");
			//if we get multiple choices what happen ?	
			
			
			
			let nextStep = getTwin(state,thisCoppy,alreadyTry,mode,VColumn2);//do it 
			
			if(nextStep[0].length != 0){		//if the next recursive loop work
				output = output.concat(nextStep[0]);	//return it for the previous
			}
			lstOfCol = lstOfCol.concat(nextStep[1]);//add the col from the recursive
		}
	}return [output,lstOfCol]
}//get twin

var CrissCross = function(state){
	
	let [columns2,lstBigBall2,lstOfMove2] = state;
	
	
	let thisWay = [];			//local try
	let lstOfCrissCross = [];	//global try
	let a = [];					//intermediar buffer
	let emptyBtl = emptyBotle(lstBigBall2);	//nececary for the first move
	let target ;					//same with color


	let alreadyTry =[];	//global anti double
	let newTry =[];		//local  anti double
	for( way in columns2){
		if(columns2[way].content.length == 0){continue}		//empty botle
		if(alreadyTry.indexOf(way) != -1){continue}	//already try this column
		if(lstBigBall2[way][1] != 0){continue}		//its a color
		target = Target(state,way);
	
	
		let VColumn2 = newVirtualColumn(columns2,lstBigBall2);
		virtualUpdate(columns2,VColumn2,way,target);
	
		a = getTwin(state,[target,way],alreadyTry,"standard",VColumn2);
		if(a[0].length == 0){continue}
		[thisWay,newTry] = a;
		//console.log(" i want it that way",thisWay);
		//console.log("all column include in calcul",newTry);
	
		lstOfCrissCross = lstOfCrissCross.concat(thisWay);
		//console.log("\n  i ave crisscross",lstOfCrissCross);
		
		alreadyTry = alreadyTry.concat(newTry);
		//console.log("lst global",alreadyTry);
	}
	return lstOfCrissCross
}

module.exports = CrissCross;
