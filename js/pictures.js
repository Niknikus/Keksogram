'use strict';

(function() {

window.pictures = {

 
 createDOMphoto: function(temptlate) {
  var photoDOM = document.querySelector('#picture').content.cloneNode(true);
  photoDOM.querySelector('img').src = temptlate.url;
  photoDOM.querySelector('.picture__likes').textContent = temptlate.likes;
  photoDOM.querySelector('.picture__comments').textContent = temptlate.comments;
  return photoDOM;
},
 getHTMLcollection: function(arr) {
  var newArr = [];
  for (var i = 0; i <=arr.length-1; i++) {
    var current = window.pictures.createDOMphoto(arr[i]);
    newArr.push(current);
  }
  return newArr;
},
 getVisiblePhoto: function (arr, parent) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    var mock = {};
    mock[i] = arr[i];
    fragment.appendChild(mock[i]);
  }
  parent.appendChild(fragment);
}
};
})();


