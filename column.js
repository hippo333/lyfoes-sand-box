'use strict';

const MAXSIZE = 4;

var Column = function(contents) {
  var obj = {
  		content : [],
  	}

  for (var i in contents) {
    obj.content.push(contents[i]);
  }
  
  return obj;
}

module.exports = Column;
