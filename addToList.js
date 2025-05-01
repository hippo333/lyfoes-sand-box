


function compareArray(arr1,arr2){
	return arr1.toString() === arr2.toString()
}

function normalise(lstOfMove2){
	//console.log("normalise");
	
	let leftCol = [99,0];	//col,order
	let emptyBtl = lstOfMove2[0][1];
	
	//is criss cross
	for(k=1; k<lstOfMove2.length; k++){
		//console.log("k",k);
		let mv = lstOfMove2[k];
		let lastMv = lstOfMove2[k-1];
		
		if(mv[1] != lastMv[0]){
			console.log("it's not criss cross");
			return lstOfMove2
		}
		if(lastMv[0] < leftCol[0]){
			leftCol = [lastMv[0],k-1];
			console.log("it's on left",leftCol);
		}
	
	}
	//if we are already normalised
	if(leftCol[1] == 0){return lstOfMove2}
	
	//if we dont free the empty botle
	if(lstOfMove2[0][1] != lstOfMove2[lstOfMove2.length -1][0]){
		console.log("first move",lstOfMove2[0]);
		console.log("last Move",lstOfMove2[lstOfMove2.length -1]);
		return	lstOfMove2
	}
	
	let firstPart = lstOfMove2.slice(1,leftCol[1]+1);
	let lastPart =  lstOfMove2.slice(leftCol[1]+1);
	
	lastPart.pop();	//remove the ending botle
	
	let hibrid = [lstOfMove2[0][0],lstOfMove2[lstOfMove2.length-1][1]];
	lastPart.push(hibrid);	//join the two part
	firstPart.pop();	//old join
	
	lastPart.splice(0,0,[lastPart[0][1],emptyBtl]);	//opening
	
	let newLstOfMove = lastPart.concat(firstPart);
	newLstOfMove.push([emptyBtl,newLstOfMove[newLstOfMove.length -1][0]]);
	
	/*
	console.log("it's criss cross");
	console.log("the left col",leftCol);
	console.log("first part",firstPart,"lastPart",lastPart);
	console.log("l'hybride",hibrid);
	console.log("lst of move",lstOfMove2);
	console.log("new list of move",newLstOfMove);*/
	lstOfMove2 = newLstOfMove;
	return lstOfMove2
}

function addToList(list,newList){
	//console.log("\n\n\n\nadd to list");
	//console.log("old list",list.length);
	//console.log("new list",newList.length);
	
	for(element in newList){
		let newElement0 = newList[element][1];
		let newElement = normalise(newElement0);
		
		for(solution in list){
			//console.log("list",solution,list[solution]);
			if(compareArray(list[solution], newElement)){/*
				console.log("is already on the list");
				console.log("newElement",newElement)
				console.log("original",list[solution]);*/
	
				return 
			}
			//console.log(compareArray(list[solution][0], newElement[0]));
		}
		//console.log("is not on the list");
		list.push(newElement);
	}
}

module.exports = addToList
