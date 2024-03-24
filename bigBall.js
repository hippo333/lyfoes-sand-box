var Column = require('./column');
var columns = require('./level');

var lstBigBall =[];
for (btl in columns){
	//bigball column_color
	lstBigBall.push([0,0])
}

function bigBall(botle){
	let theColumn = columns[botle];
	let lastBall = theColumn[theColumn.length -1];
	
	if (theColumn.length == 1){
		console.log("bigBall 1",botle)
		lstBigBall[botle] = [1,0];
		return		
	}
	if(lastBall == undefined){
		//console.log("bigBall 0",botle)
		lstBigBall[botle] = [0,0];
		return
	}
	
	for(let bll = theColumn.length -2 ; bll >=0;bll--){
		if (theColumn[bll]==lastBall){
			if (bll == 0){
				lstBigBall[botle][0] = theColumn.length;
				//console.log("monochrome");
				//the color
				if(theColumn.length >=3){
					lstBigBall[botle][1] = lastBall;
					//console.log("now ",botle,"is on color mode");
				}
				
				
				
			}else{
				continue;
			}
		}else{
			lstBigBall[botle][0] = theColumn.length -bll -1;
			return
		}
	}
}

for (btl in columns){
	bigBall(btl);
}

//console.log("big ball",lstBigBall);


module.exports = [bigBall,lstBigBall];
