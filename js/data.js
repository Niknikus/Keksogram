'use strict';
(function () {

  window.data = {
    photo: [],
    photoObject: [],
    createDOMphoto: function (temptlate) {
      let photoDOM = document.querySelector('#picture').content.cloneNode(true);
      photoDOM.querySelector('img').src = temptlate.url;
      let like = photoDOM.querySelector('.picture__likes');
      like.textContent = temptlate.likes;
      for (let i = 0; i < temptlate.comments.length; i++) {
        let comment = photoDOM.querySelector('.picture__comments').cloneNode(true);
        comment.textContent = temptlate.comments[i].message;
        photoDOM.querySelector('.picture__info').insertBefore(comment, like);
      }
      return photoDOM;
    }
  };
  window.data.getHTMLcollection = function (arr) {
    let current = {};
    for (let i = 0; i <= arr.length - 1; i++) {
      current = window.data.createDOMphoto(arr[i]);
      window.data.photoObject.push(arr[i]);
      window.data.photo.push(current);
    }
    window.pictures.getVisiblePhoto(window.data.photo, window.pictures.photoContainer);
  };
  window.backend.load(window.data.getHTMLcollection, window.backend.onErrorMessage);

})();
