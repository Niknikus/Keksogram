'use strict';

(function () {

  // handlers
  window.handlers = {

    deleteAllClasses: function (target) {
      target.setAttribute('class', '');
    },

    closeButtonHandler: function (evt) {
      evt.preventDefault();
      let target = evt.target;
      let targetParent = target.parentNode;
      if (!targetParent.classList.contains('overlay')) {
        targetParent = targetParent.parentNode;
      }
      if (!targetParent.classList.contains('img-upload__overlay')) {
        if (!target.classList.contains('big-picture__cancel')) {
          targetParent = targetParent.parentNode;
        }
      }
      if (!targetParent.classList.contains('hidden')) {
        targetParent.classList.add('hidden');
      }
      window.handlers.deleteAllClasses(window.filterForm.imgUpploadPreview);
    },

    EscCloseHandler: function (evt) {
      if (evt.keyCode === 27) {
        let openPicture = document.querySelector('.big-picture');
        let openRedactor = document.querySelector('.img-upload__overlay');
        if (!openPicture.classList.contains('hidden') || !openRedactor.classList.contains('hidden')) {
          openPicture.classList.add('hidden');
          openRedactor.classList.add('hidden');
        }
      }
      window.handlers.deleteAllClasses(window.filterForm.imgUpploadPreview);
    },

    HiddenClassDeleteHandler: function (targetNod) {
      targetNod.classList.remove('hidden');
    }
  };

})();
