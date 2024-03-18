var Column = require('./column');
var columns = require('./level');
var [bigBall,lstBigBall] = require('./bigBall');
var move = require('./move');
var emptyBotle = require('./emptyBotle');


function getHigestBall(){
	//list of flore color level
	//color , score
	let scoreLst = [];
	//the ball with the highest score
	let theBall =[0,0];
	
	//note color in the list
	function scoreColor(color,ranc){
		if(color == undefined){
			return
		}
		let place = scoreLst.find(
			plc => plc[0] == color
		);	
		if (place == undefined){
			scoreLst.push([color,0]);
			place = scoreLst[scoreLst.length -1 ];
		}
		place[1] += ranc;
		
		//update the ball
		if(place[1] >= theBall[1]){
			theBall = place;
		}
	}

	//for the flore note the color
	for (col in columns){
		if(columns[col].length ==0){continue;}
		if(lstBigBall[col][1] != 0){continue;}
		//console.log("raining",col,"color",lstBigBall[col][1]);
	
		scoreColor(columns[col][3],3);
		scoreColor(columns[col][2],2);
		scoreColor(columns[col][1],1);
		scoreColor(columns[col][0],0);
	}
	return theBall[0];
}

function raining(){
	//console.log("its raining men");
	
	let emptyBtl = emptyBotle();
	
	//if we can't rain nowere 
	if (emptyBtl == null){
		return null
	}
	// bll is the color the most present on the top zone
	let bll = getHigestBall();
	//console.log("bll",bll);
	if(bll ==0){
		return "finito"
	}
	//get all bll in top of botle
	let lstMovableCol = columns.filter(
		mvBll => mvBll[mvBll.length -1 ] ==bll
	)
	let lstMovableBall= [];
	for (col in lstMovableCol){
		lstMovableBall.push(columns.indexOf(lstMovableCol[col]));
	}
	
	console.log("rain output",lstMovableBall,emptyBtl);
	return [lstMovableBall,emptyBtl]
	
	/*//do the move
	for(btl in lstMovableBall){
		move(columns.indexOf(lstMovableBall[btl]),emptyBtl);
	}
	return bll*/
}

module.exports = raining;
