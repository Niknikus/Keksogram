'use strict';
(function() {
	window.utils = {
      getRandom: function(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
},
   
   getUnic: function(arr) {
  var obj = {};
  for (var i = 0; i <= arr.length-1; i++) {
    var newKey = arr[i];
    obj[newKey] = true;
  }
  return Object.keys(obj);
},

  getRandomLength: function(arr, quantity) {
  var newArr = [];
  for (var g = 0; g <= Math.floor(Math.random() * quantity); g++) {
      var j = window.utils.getRandom(0, arr.length-1);
      newArr.push(arr[j]);
    }
  newArr = window.utils.getUnic(newArr);
  return newArr;
}

	};
})();