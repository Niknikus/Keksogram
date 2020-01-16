'use strict';

(function () {


  var onBigPictureCloseButton = document.querySelector('#picture-cancel');

  onBigPictureCloseButton.addEventListener('click', window.handlers.closeButtonHandler);
  document.addEventListener('keydown', window.handlers.EscCloseHandler);

  // set on listener for thumbnails-pictures, for rendering bigphoto.

  window.pictures.photoContainer.addEventListener('click', function (evt) {
    let target = evt.target;
    let targetClass = target.getAttribute('class');
    let targetTag = target.tagName;
    let targetParent = target.parentNode;
    let bigPicture = document.querySelector('.big-picture');
    if (!bigPicture.classList.contains('hidden')) {
      bigPicture.classList.add('hidden');
    }

    // look over, is target image? If it is, set on new target value.

    if (targetClass !== 'picture__img') {
      return false;
    }

    if (targetTag === 'IMG' || !targetParent.classList.contains('picture')) {
      target = targetParent;
    }

    // mark up our target with id.

    target.setAttribute('id', 'prettyNice');

    // looking for our marked photo index, for binding it with jsobjects.

    let correctIndex = 0;
    let collection = window.pictures.photoContainer.querySelectorAll('.picture');
    for (let i = 0; i <= collection.length - 1; i++) {
      if (collection[i].getAttribute('id') === 'prettyNice') {
        correctIndex = i;
        target.setAttribute('id', 'old');
      }
    }

    // rendering big photo
    window.preview.creationBigPicture(window.data.photoObject[correctIndex]);

  }, true);

})();
