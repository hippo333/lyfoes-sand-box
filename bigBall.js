var Column = require('./column');
var columns = require('./level');


var lstBigBall =[];
let state0 = [columns,lstBigBall,[]];
for (btl in columns){
	//bigball column_color
	lstBigBall.push([0,0])
}

function bigBall(state,botle){
	let [columns2,lstBigBall2,xxx] = state;
	let theColumn = columns2[botle];
	let lastBall = theColumn[theColumn.length -1];
	
	// for the botle who contain one ball
	if (theColumn.length == 1){
		let theRealColor = lstBigBall2.findIndex(
			rc=> rc[1]==lastBall 
		);
		lstBigBall2[botle] = [1,0];
		
		if(theRealColor == -1){
			lstBigBall2[botle][1] = lastBall;			
		}
		return		
	}
	if(theColumn.length == 0){
		//console.log("bigBall 0",botle)
		lstBigBall2[botle] = [0,0];
		return
	}
	
	for(let bll = theColumn.length -2 ; bll >=0;bll--){
		if (theColumn[bll]==lastBall){
			if (bll == 0){
				lstBigBall2[botle][0] = theColumn.length;
				//console.log("monochrome");
				//the color
				let theRealColor = lstBigBall2.findIndex(
					rc=> rc[1]==lastBall 
				);
				//if no other monochrome column exist 
				if(theRealColor == -1){
					lstBigBall2[botle][1] = lastBall;
					//console.log("now ",botle,"is on color mode");
				}
				
				
				
			}else{
				continue;
			}
		}else{
			lstBigBall2[botle][0] = theColumn.length -bll -1;
			//console.log("calcul of bigball bottle",botle,"big ball",lstBigBall2[botle][0]);
			return
		}
	}
}

for (btl in columns){
	bigBall(state0,btl);
}

//console.log("big ball",lstBigBall);


module.exports = [bigBall,lstBigBall];
