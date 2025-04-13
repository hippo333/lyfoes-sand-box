
//easy way to calcul
function newVcolumn(columns2){
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

//update the Vcolumn doing a move
function Vupdate(columns2,VColumn2,[from,to]){
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
		console.log("error VColumn over feed, from",from,"to",to,"ball",bllTo);
		console.log("Vcolumn",VColumn2);
		abstract(columns2);
		throw Error();
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
}

/*
function Vfinish(Vcolumn2){
	for(col in Vcolumn2){
		//empty botle
		if(Vcolumn2[col][1] ==0){continue}
		//if the big ball of the column is not 4 the col is not full finish
		if(Vcolumn2[col][1] <4){
			//console.log("the column is not clean",col);
			return false	
		}
	}
	return true
}*/





module.exports =[newVcolumn,Vupdate]
