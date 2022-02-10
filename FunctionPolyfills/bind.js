/* Problem Statement

  1. Implement polyfill for bind function. 
*/

/* Thought Process - 

  1. myBind function should return a binded function, which can invoke later on requirement.
  2. this, other arguments can be provided while calling bind function.
  3. Arguments can also be provided during invokation of binded function.
*/

// Code
Function.prototype.myBind = function(thisObj,...args1){
  let funcObj = this;
  return function(...args2){
    funcObj.myCall(thisObj,...args1,...args2); 
  }
}

Function.prototype.myCall = function(thisArg, ...args) {
  thisArg = thisArg===null || thisArg===undefined ? window : thisArg;
  thisArg = Object(thisArg);
  let symKey = Symbol();
  thisArg[symKey] = this;
  let result = thisArg[symKey](...args);
  delete thisArg[symKey];
  return result;
}

// testing functionality
let thisObj = {name:"sumit"};

function fun(a,b,origin){
  console.log(origin, this, a, b);
}

let bindedFun = fun.bind(thisObj,1);
bindedFun(2,"Inbuilt -> ")

let myBindedFun = fun.myBind(thisObj,1);
myBindedFun(2,"Self Created -> ")