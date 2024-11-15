var Column = require('./column');
var abstract = require('./abstract');


function emptyBotle(columns2){
	for(col in  columns2){
		if(columns2[col].isEmpty()){return col}
	}
	return null
}



function Target(state,col,VColumn2){	//place for move the ball above col
	//console.log("      //target for col",col);
	
	let [columns2,xxx] = state;
	
	if(VColumn2 != undefined){
		//console.log("      last chance")
		let theBall = VColumn2[col][0];
		for(way in VColumn2){
			if(VColumn2[way][0] != theBall){continue}
			if(way == col){continue}
			if(VColumn2[col][1] + VColumn2[way][2] <= 4){
				return way
			}
			
		}
		//console.log("      no target possible",col);
		return null
	}
	let theCol = columns2[col];
	let theBall = theCol.top();
	
	if(theBall == undefined){
		//console.log("      can't find the ball above",col,theCol);
	}
	let theColor = getColor(columns2,theBall);
	if(theColor != null){
		//console.log("      i get a color for",theBall,theColor,columns2[theColor].content);
		return theColor
	}else{
		//console.log("      i can't get a color for",col,theBall);	
		let emptyBtl = emptyBotle(columns2);
		if (emptyBtl != null){
			//console.log("      i can do empty botlr",emptyBtl);
			return emptyBtl
		}else{
			console.log("      no target for",col);
			return null
		}
	}
}


function newVirtualColumn(columns2){
	//console.log("\n______virtualcolumn");
	VColumn2 = [];
	
	for(i in columns2){
		let color = columns2[i].top();
		let bigBall = columns2[i].bigBall;
		
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

function virtualUpdate(columns2,VColumn2,[from,to]){
	//console.log(`\n      -virtual update from:${from} to:${to}`);
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
		throw Error("      ",VColumn2,"\n");
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
	}if(sizeTo >4){
		console.log("error VColumn over feed, from",from,"to",to,"ball",bllTo)
		abstract(columns2);
		throw error();
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
	/*
	console.log("      -from",from,"to",to);
	console.log("      -Vcolumn from",VColumn2[from]);
	console.log("      -Vcolumn to",VColumn2[to]);
	console.log("      -ball, big ball, size");*/
}

function getColor(columns2,blue){

	let out = columns2.findIndex(
		out => out.color == blue	
	);
	if(out != -1){
		return out
	}else{
		return null
	}
}


//all column who contain a blue ball and the one with the lowest ball above

function AllBlue2(columns2,VColumn2,colB,blue){
	let allBlue = [];
	//console.log("\nall blue col",colB,"place for",VColumn2[colB][2],"balls","colueur",VColumn2[colB][0]);
	for(let i in VColumn2){
		if(i== colB){continue}
		
		//bll bBl size
		if(VColumn2[i][1]==VColumn2[i][2]){//if i is color
			if(VColumn2[colB][1]==VColumn2[colB][2]){//if colB is color
				//console.log("and its the same color");
				
				if(VColumn2[i][2] > VColumn2[colB][2]){
					continue;//avoid move big color to litle
					
				}else if(VColumn2[i][2] == VColumn2[colB][2] && i>colB){
					//console.log("so we dont do that\n");
					continue;//remove symetrical branch
				}
				//console.log("and we can\n");
			}
		}
		
		if(VColumn2[i][0]==blue && (VColumn2[i][1] + VColumn2[colB][2] <=4)){
			allBlue.push(i);/*
			console.log("    blue",i);
			console.log("    big ball from",VColumn2[i][1]);/*
			console.log("    the col to contain",VColumn2[i][2]);*/
		}
	}
	//console.log("lst all blue",allBlue);
	return allBlue;
}


function getTwin(state,lstTwin,alreadyTry,VColumn2){
	//console.log("\n  //get twin",lstTwin);
	let [columns2,xxx] = state;
	
	if(lstTwin.length > columns2.length*3){return}//loop killer
	
	let output =[];
	let lstOfCol =[];	//all col include in calcul (anti double)
	let posibility = [];//all move posible
	
	let lastCol = lstTwin[lstTwin.length -1];//last col of the list
	if(typeof(lastCol)== "object"){	//if last move is a color
		lastCol = lastCol[0];
	}
	
	let sdBall = VColumn2[lastCol][0];	//for the last botle
	let sdBigBall = VColumn2[lastCol][1];
	
	
	if(sdBall == 0  ){	//if we free a botle		
		
		let firstMove = [lstTwin[1],lstTwin[0]];
		
		lstTwin = lstTwin.slice(2);		
		lstTwin = [firstMove].concat(lstTwin);
		
		return [[lstTwin],[]]
	}

	let allBlue = AllBlue2(columns2,VColumn2,lastCol,sdBall);
	
	if (allBlue.length ==0){	//if no move posible
		let firstMove = lstTwin[0];
		let firstBall = VColumn2[firstMove][0];
		
		sdBall = firstBall;
		lastCol = firstMove;
		let secondBlue = AllBlue2(columns2,VColumn2,lastCol,sdBall);
		let target2;
		
		if (secondBlue.length !=0){	//second ball can go to first
			//console.log("  go to first");
			target2 = secondBlue[0];
			posibility.push([target2,lastCol]);				
					
		}else{	//move the above ball to an other column
		
			lastCol = lstTwin[lstTwin.length -1];//last col of the list
			
			if(typeof(lastCol)== "object"){
				lastCol = lastCol[0];
			}
			
			sdBall = VColumn2[lastCol][0];
			
			
			target2 = Target(state,lastCol,VColumn2);
			
			if(target2 == null){return [[],[]]}
			
			//console.log("now the col",lastCol,"can go to",target2);
			
			posibility.push([lastCol,target2]);
		}
	}
	
		
	let thisTry;		//curent element of the loop
	let alreadyThere;	//short cut of intern loop
	
	for(way in allBlue){
		thisTry = allBlue[way];
		//console.log("  all blue element",way,thisTry);
		
		if(alreadyTry.indexOf(thisTry) != -1){continue}	
		
		lstOfCol.push(thisTry);		
		posibility.push([thisTry,lastCol]);
	}
	
	
	let thisCoppy = [];	//coppy of lstTwin 
	let VColumn3 = [];
	for(mv of posibility){
		VColumn3 = [...VColumn2];
		thisCoppy = [...lstTwin];
		
		thisCoppy.push(mv); 
		virtualUpdate(columns2,VColumn3,mv);
	
		let nextStep = getTwin(state,thisCoppy,alreadyTry,VColumn3);
			
		if(nextStep[0].length != 0){		//if the next recursive loop work
			output = output.concat(nextStep[0]);	//return it for the previous
		}
		lstOfCol = lstOfCol.concat(nextStep[1]);//add the col from the
	
	}
	return [output,lstOfCol]
}//get twin


var CrissCross = function(state){
	
	let [columns2,yyy,lstOfMove2] = state;
	
	
	let thisWay = [];			//local try
	let lstOfCrissCross = [];	//global try
	let a = [];					//intermediar buffer
	let emptyBtl = emptyBotle(columns2);	//nececary for the first move
	let target ;					//same with color

	if(emptyBtl == null){return}

	let alreadyTry =[];	//global anti double
	let newTry =[];		//local  anti double
	for( way in columns2){
		if(columns2[way].content.length == 0){continue}		//empty botle
		if(alreadyTry.indexOf(way) != -1){continue}	//already try this column
		if(columns2[way].color != 0 ){
			if(columns2[way].content.length >2){
				continue;		//its a color
			}
		}
		target = Target(state,way);
	
	
		let VColumn2 = newVirtualColumn(columns2);
		virtualUpdate(columns2,VColumn2,[way,target]);
	
		a = getTwin(state,[target,way],alreadyTry,VColumn2);
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
