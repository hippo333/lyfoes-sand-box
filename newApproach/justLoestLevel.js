var column = require('../tools/column');
var columns = require('../level');


let groundLevel = [];

for(col of columns){
	let groundOfCol = col.content.splice(1,1);
	groundLevel.push(groundOfCol);

}

console.log(groundLevel);
