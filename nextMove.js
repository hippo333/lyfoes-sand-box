var Column = require('./column');
var columns = require('./level');
var [bigBall,lstBigBall] = require('./bigBall');
var move = require('./move');
var raining = require('./raining');
var emptyBotle = require('./emptyBotle');

var emptyBtl = emptyBotle;

function internMove(){
	//list all place we can take ball
	let targets = columns.filter(
		tgt => tgt.length <4
	);
	
	let btls =[];
	let out =[];
	
	for (tgt in targets){
		let theBtl = targets[tgt];
		let thebll = theBtl[theBtl.length-1];
		let to = columns.indexOf(theBtl);
		
		
		btls = columns.filter(
			bll=> bll.length > 0
			&& bll[bll.length -1]==thebll
			&& lstBigBall[columns.indexOf(bll)][1] == 0
			&& bll != theBtl
			&& theBtl.length +lstBigBall[columns.indexOf(bll)][0] <=4
		);
		
		// 1 grade
		//x000
		//xxx
		//
		if(emptyBtl != null && lstBigBall[to][1]!=0){
			btls2 = columns.filter(
				bll=> bll.length > 0
				&& bll[bll.length -1-lstBigBall[columns.indexOf(bll)][0]]==thebll
				&& bll.length == lstBigBall[columns.indexOf(bll)][0] +1
			);
			if(btls2.length >0){
				//console.log("first grade ,",btls2,to);
			}
		}
		//
		
		if (btls == undefined){
			continue;
		}
		
		//for all btl with the same above ball
		
		for(bll in btls){
			let btl2 = btls[bll];
			let from = columns.indexOf(btl2);
			
			//inevitable
			if(lstBigBall[to][1] != 0){
				return [[from,to]]
			}
			
			//first grad
			//x000
			//xxx
			//
			
			
			//asymetrie
			if(columns[from].length ==1 && columns[to].length == lstBigBall[to][0]){
				continue;
			}else if (columns[from].length == columns[to].length && from > to){
				continue;
			}
			
			
			
			
			
			//over flow
			if(theBtl.length +lstBigBall[from][0] <=4){
				out.push([from,to]);
				
			}
		}
	}
	
	
	
	
	//rain if fail
	if (out.length == 0){
		let theRain = raining();
		
		if(theRain == "finito"){
			//console.log("raining null");
			return "finito";
		}else {
			//console.log("the rain",theRain);
			return [["raining :",theRain]];
		}
	}
	//console.log("out",out);
	return out;
}
module.exports = internMove;
