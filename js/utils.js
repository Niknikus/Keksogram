'use strict';
(function() {
  window.utils = {
    getRandom: function(min, max) {
      let rand = min + Math.random() * (max + 1 - min);
      rand = Math.floor(rand);
      return rand;
    },

    getUnic: function(arr) {
      let obj = {};
      for (let i = 0; i <= arr.length-1; i++) {
        let newKey = arr[i];
        obj[newKey] = true;
      }
      return Object.keys(obj);
    }

  };
})();
