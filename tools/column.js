'use strict';

const MAXSIZE = 4;

var Column = function(contents) {
  var obj = {
  		content : [],
  		bigBall : 0,
  		color : 0,
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
  
  obj.isEmpty = function(){
  	if(this.content.length ==0){
 		this.color =0; 
  		return true
  	}return false
  }
  
  obj.isFinish = function(){
  	if(!this.isFull()){
  		return false
  	}if(this.isMonochrome()){
  		return true
  	}
  	return false  	
  }
  
  obj.isMonochrome = function(){
  	if(this.isEmpty()){return false}
  	
  	let withoutDuplicate = [...new Set(this.content)];
  	if(	withoutDuplicate.length == 1){
  		return true
  	}return false
  }
  
  obj.newBigBall = function(){
  	if(this.isEmpty()){this.bigBall =0; return};
  	
  	this.bigBall =1;
  	let lastball = this.content[this.content.length -1];
  	
  	
  	for(let i=this.content.length-2;i>=0;i--){
  		if(this.content[i] == lastball){
  			this.bigBall++;
  			
  		}else{
  			this.color = 0;
  			return
  		}
  	}
  	if(this.bigBall >1){this.color = lastball}
  	//if column contain one ball
  }
   
  for (var i in contents) {//constructor
    obj.content.push(contents[i]);
  }
  
  obj.newBigBall();	//make it for the begining
  return obj;
}

module.exports = Column;
