/* Problem Statement - 
 
  1. Implement setInterval, clearInterval function using native setTimeout, clearTimeout function.
  2. For setInterval func. 1st arg be callback func, 2nd arg be delay (default value is 0ms), rest other arguments will be passed to callback func when it gets invoked.
  3. setInterval func. should return id (interval id) which further can be used to clear interval using clearInterval function.

*/

/* Thought Process
  
  * First Think of how we can create one interval using native setTimeout and also setInterval func invokation should return id, which later can be used to clear interval.
  * Once a previous timeout expires we need to first setup current timeout of same deleay and then invoke callback function.
  * After setting up current timeout we need to keep its timeout id for respective interval, so in future to clear respective interval by clearing current timeout.
  * Handle the case, clearInterval func can also be invoked in the callback function.
  * After completing the thought process of how to create one setInterval, now think of
    1. For clearInterval func, how using only interval id as argument we can clear the interval, its true we need current timeout id but, we know it gets changed as we are setting up current timeout for next interval.
    2. It seems clearInterval func should be in same scope with setInterval func as we need its current timeout id to clear interval.
    3. Also think how how we can create multiple intervals using setInterval func. To handle multiple intervals we need map where key (interval id) and value (current timeout id).
  * Now setInterval, clearInterval to have in same scope we need wrapper function, here setIntervalUtils stores object which have utility function and here we used module design pattern.
  * In wrapper function we create idtoTimeoutIdMap, uniqueId which now available to both mySetInterval, myClearInterval function.
  
*/

// Code
const setIntervalUtils = (function(){

  let idtoTimeoutIdMap = {}, uniqueId=0;

  const mySetInterval = function(callback, delay=0, ...rest){

    if(typeof callback !== "function"){
      throw Error("callback is expected to be function");
    }
    let intervalId = uniqueId++;
    const setCurrTimeout = function(){
      idtoTimeoutIdMap[intervalId] = setTimeout(function(){
        setCurrTimeout();
        callback(...rest);
      }, delay);
    }
    setCurrTimeout();
    return intervalId;

  }

  const myClearInterval = function(id){
    clearTimeout(idtoTimeoutIdMap[id]);
    delete idtoTimeoutIdMap[id];
  }

  return {mySetInterval, myClearInterval};

})();

// testing functionality
const {mySetInterval, myClearInterval} = setIntervalUtils;

const cbFunc = function(...args){
  console.log(...args);
}
let id = mySetInterval(cbFunc,1000,1,2,3);
setTimeout(()=>{
  myClearInterval(id);
  console.log("cleared interval id -> ",id);
},3000);

/*
  Learning 
  1. In setInterval next timeout will be set once current timeout callback function invoked.
*/