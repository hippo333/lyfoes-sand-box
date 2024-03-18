var Column = require('./column');
var columns = require('./level');
var [bigBall,lstBigBall] = require('./bigBall');

function move(from,to){
	
	let colFrom = columns[from];
	let colTo = columns[to];
	//console.log("from,to",from,to,colFrom,colTo);
	let ballFrom = colFrom[colFrom.length -1];
	let ballTo = colTo[colTo.length -1];
	
	
	if(columns[to].length ==4){
		console.log("error the column",to,"is full",colTo)
		return "error"
		//the botle to is not empty
	}else if(ballTo != undefined){
		if(ballFrom != ballTo){
			console.log("error the ball are diferent",colFrom,colTo);
			return "error"
		}
	}
	if(ballFrom == undefined){
		console.log("error no ball From",from,colFrom);
		return "error"
	}
	if(colTo.length + lstBigBall[from][0] >4){
		console.log("arg");
		console.log("lstBigBall from",lstBigBall[from]);
		return "error";
	}
	//console.log("la colune from contien",lstBigBall[from][0]);
	//bigBall 
	
	colFrom.pop();
	colTo.push(ballFrom);
	for ( let ball =1;ball < lstBigBall[from][0];ball++){
		colFrom.pop();
		colTo.push(ballFrom);
	}
	bigBall(from);
	bigBall(to);
}


function doTheMove([source,target]){
	let doFrom;
	let doTo;
	
	console.log("move source, target",source,target)
	
	//rain
	if (source == "raining :"){
		let lstSrc = target[0];
		doTo = target[1];
		
		//do each move on rain
		for(bll in lstSrc){
			move(lstSrc[bll],doTo);
		}
	
	
	/*
		console.log("move the array");
		doTo = source[1];
		doFrom =source[0];*/
	}else{
		doFrom = source;
		doTo = target;
		
		move(source,target);
	}
	
	if (source == undefined){
		//console.log("gnegne");
		return
	}


}
module.exports = doTheMove;
