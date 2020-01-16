'use strict';

(function () {

  window.pictures = {

    getVisiblePhoto: function (arr, parent) {
      let fragment = document.createDocumentFragment();
      let mock = {};
      for (let i = 0; i < arr.length; i++) {
        mock[i] = arr[i];
        fragment.appendChild(mock[i]);
      }

      parent.appendChild(fragment);
    },
    photoContainer: document.querySelector('.pictures')
  };
})();


