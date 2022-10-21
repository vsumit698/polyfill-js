// problem link - https://bigfrontend.dev/problem/create-call-method

/* Problem Statement

  1. Implemented call polyfill using apply method 
*/

// Code
Function.prototype.myCall = function(thisObj,...restParams){
  this.apply(thisObj,restParams);
}
/* Problem Statement

  1. Implemented call polyfill without using apply method 
*/

/* Thought Process
  
  1. Requirement is we need to invoke function on which call method is invoked, such that its this keyword points to thisArg reference.
  2. To make this happen we need to invoke that function from thisArg object beacuse this keyword reference depends on while we invoke function (only including regular function here).
  3. To do that we need to attach that function object to thisArg object, and invoke that function from thisArg object. Make sure thisArg should always be of type object. If it's primitive value, its need to transform to object.
  4. To attach function object in thisArg object, we need key where function object(on which call method is invoked) as value. For proper key so that it will not conflict with existing keys of thisArg object.
  5. Now here need of Symbol datatype arises, where these symbol keys are also not enumerable i.e these keys, keys values are not available at for in and for of loop and also acts as a unique key in object.
  6. After invoking function from thisArg object, delete inserted key from thisArg object, so after completing operation thisArg comes to original state.
*/

// Code
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
let obj = {name:"sumit"};

function fun(a,b,c){
  console.log(this===obj,a,b,c);
}

fun.myCall(obj,1,2,3);
