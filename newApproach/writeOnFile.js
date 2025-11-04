const fs = require('fs').promises;	//write file

var writeOnFile = function(myArray){
	console.log("my array",typeof(myArray));
	fs.writeFile('Temporary.txt', myArray.join("\n"), 'utf8');
}

//console.table({from:from,to:to})


module.exports = writeOnFile
