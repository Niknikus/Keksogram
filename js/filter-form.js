'use strict';

(function () {

  window.filterForm = {

    uploadLabel: document.querySelector('.img-upload__control'),
    redactionForm: document.querySelector('.img-upload__overlay'),
    redactionFormCloseButton: document.querySelector('#upload-cancel'),
    effectPin: document.querySelector('.effect-level__pin'),
    effectDepth: document.querySelector('.effect-level__depth'),
    effectLevelInput: document.querySelector('.effect-level__value'),
    scaleButtonBigger: document.querySelector('.scale__control--bigger'),
    scaleButtonSmaller: document.querySelector('.scale__control--smaller'),
    scaleInput: document.querySelector('.scale__control--value'),
    effectInputs: document.querySelector('.effects__list').querySelectorAll('input'),
    imgUpploadPreview: document.querySelector('.img-upload__preview img'),
    spansForEffects: document.querySelectorAll('.effects__preview'),
    inputFiles: document.querySelector('#upload-file')
  };
  window.filterForm.redactionFormCloseButton.addEventListener('click', window.handlers.closeButtonHandler);

  // scale filter
  // Мне нужно, чтобы при нажатии на одну из кнопок масштабирования
  // У меня изображение меняло размер, согласно шагу в процентах,
  // которым будет оперировать мой код.

  window.filterForm.scaleButtonBigger.addEventListener('click', function (evt) {
    evt.preventDefault();
    let scaleValue = parseInt(window.filterForm.scaleInput.value);
    let step = 5;
    if (scaleValue >= 100) {
      return;
    }
    window.filterForm.scaleInput.value = scaleValue + step + '%';
    window.filterForm.imgUpploadPreview.style.width = window.filterForm.scaleInput.value;
  });

  window.filterForm.scaleButtonSmaller.addEventListener('click', function (evt) {
    evt.preventDefault();
    let scaleValue = parseInt(window.filterForm.scaleInput.value);
    let step = 5;
    if (scaleValue <= 5) {
      return;
    }
    window.filterForm.scaleInput.value = scaleValue - step + '%';
    window.filterForm.imgUpploadPreview.style.width = window.filterForm.scaleInput.value;
  });

  let TranslateToClass = {
    none: '',
    chrome: 'effects__preview--chrome',
    sepia: 'effects__preview--sepia',
    marvin: 'effects__preview--marvin',
    phobos: 'effects__preview--phobos',
    heat: 'effects__preview--heat'
  };

  let TranslateToFilter = {
    none: '',
    chrome: 'grayscale',
    sepia: 'sepia',
    marvin: 'invert',
    phobos: 'blur',
    heat: 'brightness'
  };


  function setCheked(target) {
    let targetParent = target.parentNode.parentNode;
    let input = targetParent.querySelector('input');
    input.checked = true;
    let initialPinValue = 20;
    window.handlers.deleteAllClasses(window.filterForm.imgUpploadPreview);
    window.filterForm.effectPin.style.left = 90 + 'px';
    window.filterForm.effectDepth.style.width = initialPinValue + '%';
    window.filterForm.effectLevelInput.value = initialPinValue;
    window.filterForm.imgUpploadPreview.setAttribute('class', TranslateToClass[input.value]);
    getFilter(window.filterForm.imgUpploadPreview, initialPinValue);
  }

  let filterValue = '';

  let effectList = document.querySelector('.effects');
  effectList.addEventListener('click', function (evt) {
    let target = evt.target;
    let parent = target.parentNode;
    let sibling = parent.parentNode.querySelector('input');
    filterValue = sibling.value;
  }, true);

  function getFilter(node, quantity) {
    node.style.filter = '';
    if (TranslateToFilter[filterValue] === '') {
      return;
    }
    if (TranslateToFilter[filterValue] === 'grayscale') {
      node.style.filter = TranslateToFilter[filterValue] + '(' + quantity + '%)';
    }
    if (TranslateToFilter[filterValue] === 'sepia') {
      node.style.filter = TranslateToFilter[filterValue] + '(' + quantity + '%)';
    }
    if (TranslateToFilter[filterValue] === 'invert') {
      node.style.filter = TranslateToFilter[filterValue] + '(' + quantity + '%)';
    }
    if (TranslateToFilter[filterValue] === 'blur') {
      node.style.filter = TranslateToFilter[filterValue] + '(' + (quantity / 10) + 'px)';
    }
    if (TranslateToFilter[filterValue] === 'brightness') {
      node.style.filter = TranslateToFilter[filterValue] + '(' + (quantity + 100) + '%)';
    }
  }

  window.filterForm.effectPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let start = {
      x: evt.clientX
    };

    let onMouseMove = function (move) {
      move.preventDefault();
      if (move.clientX > 980 || move.clientX < 530) {
        return;
      }

      let shift = {
        x: start.x - move.clientX
      };

      start = {
        x: move.clientX
      };

      window.filterForm.effectPin.style.left = (window.filterForm.effectPin.offsetLeft - shift.x) + 'px';
      let parent = window.filterForm.effectPin.parentNode;
      let value = Math.floor((window.filterForm.effectPin.offsetLeft / parent.clientWidth) * 100);
      window.filterForm.effectDepth.style.width = '' + value + '%';
      window.filterForm.effectLevelInput.value = value;
      getFilter(window.filterForm.imgUpploadPreview, value);
    };
    let onMouseUpB = function (UpEvt) {
      UpEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUpB);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUpB);

  });

  window.filterForm.uploadLabel.addEventListener('click', function (evt) {
    window.filterForm.imgUpploadPreview.src = 'img/upload-default-image.jpg';
    window.filterForm.inputFiles.addEventListener('change', function (evt) {
      let file = window.filterForm.inputFiles.files[0];
      let fileTypes = ['jpg', 'jpeg', 'png'];
      let fileName = file.name.toLowerCase();
      let matches = fileTypes.some(function (it) {
        return fileName.endsWith(it);
      });
      if (matches) {
        let reader = new FileReader();
        reader.addEventListener('load', function (evt) {
          window.filterForm.imgUpploadPreview.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    });
    let initialDistance = '90px';
    let initialDepth = 20;
    let initialScaleValue = '95%';
    filterValue = 'none';
    window.filterForm.effectPin.style.left = initialDistance;
    window.filterForm.effectDepth.style.width = initialDepth + '%';
    window.filterForm.effectLevelInput.value = initialDepth;
    window.filterForm.imgUpploadPreview.style.width = initialScaleValue;
    window.filterForm.scaleInput.value = initialScaleValue;
    window.filterForm.spansForEffects.forEach(function (item) {
      let input = item.parentNode.parentNode.querySelector('input');
      input.checked = false;
    });
    getFilter(window.filterForm.imgUpploadPreview, 20);
    window.handlers.HiddenClassDeleteHandler(window.filterForm.redactionForm);
    window.handlers.deleteAllClasses(window.filterForm.imgUpploadPreview);
  });

  window.filterForm.spansForEffects.forEach(function (item) {
    item.addEventListener('click', function (evt) {
      setCheked(evt.target);
    });
  });

  // checking of hash tag correction

  let hashTagInput = document.querySelector('.text__hashtags');

  hashTagInput.addEventListener('blur', function (evt) {
    evt.preventDefault();
    let target = evt.target;
    let text = target.value;
    let checkArrow = text.split(/[ ]|,\s*|\,/);
    for (let i = 0; i < checkArrow.length; i++) {
      if (checkArrow[i].indexOf('#') === -1 || checkArrow[i].length > 20) {
        target.classList.add('input-invalid');
        switch (checkArrow[i].indexOf('#') === -1) {
          case true: target.setCustomValidity('Добавь # в ' + 'хэштэги!');
            break;
          case false: target.setCustomValidity((i + 1) + '-й' + ' слишком длинный хэштэг, не более 20 символов!');
            break;
        }
      } else {
        target.classList.remove('input-invalid');
        target.setCustomValidity(' ');
      }
    }
  });

})();
