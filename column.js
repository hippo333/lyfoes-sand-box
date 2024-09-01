'use strict';

const MAXSIZE = 4;

var Column = function(contents) {
  var obj = {
  		content : [],
  	}

  for (var i in contents) {
    obj.content.push(contents[i]);
  }
  
  obj.top = function (){
  	return this.content[this.content.length -1];
  }
  
  obj.isFull = function(){
  	if(this.content.length == 0){
  		return false
  	}else{
  		return this.content.length ==4
  }	}
  
  return obj;
}

module.exports = Column;
