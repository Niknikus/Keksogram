'use strict';

(function() {

 window.filterForm = {

 uploadLabel: document.querySelector('.img-upload__control'),
 uploadInput: document.querySelector('#upload-file'),
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
 spansForEffects: document.querySelectorAll('.effects__preview')

 };

 window.filterForm.redactionFormCloseButton.addEventListener('click', window.handlers.closeButtonHandler);

 //scale filter
//Мне нужно, чтобы при нажатии на одну из кнопок масштабирования
//У меня изображение меняло размер, согласно шагу в процентах,
//которым будет оперировать мой код.

window.filterForm.scaleButtonBigger.addEventListener('click', function(evt) {
  evt.preventDefault();
  var scaleValue = parseInt(window.filterForm.scaleInput.value), step = 5;
  if (scaleValue >= 100) {return;}
  window.filterForm.scaleInput.value = scaleValue + step + '%';
  window.filterForm.imgUpploadPreview.style.width = window.filterForm.scaleInput.value;
});

window.filterForm.scaleButtonSmaller.addEventListener('click', function(evt) {
  evt.preventDefault();
  var scaleValue = parseInt(window.filterForm.scaleInput.value), step = 5;
  if (scaleValue <= 5) {return;}
  window.filterForm.scaleInput.value = scaleValue - step + '%';
  window.filterForm.imgUpploadPreview.style.width = window.filterForm.scaleInput.value;
});

var TranslateToClass = {
  none: '',
  chrome: 'effects__preview--chrome',
  sepia: 'effects__preview--sepia',
  marvin: 'effects__preview--marvin',
  phobos: 'effects__preview--phobos',
  heat: 'effects__preview--heat'
};

var TranslateToFilter = {
  none: '',
  chrome: 'grayscale',
  sepia: 'sepia',
  marvin: 'invert',
  phobos: 'blur',
  heat: 'brightness'
};


function setCheked(target) {
  var targetParent = target.parentNode.parentNode;
  var input = targetParent.querySelector('input');
  input.checked = true;
  var initialPinValue = 20;
  window.handlers.deleteAllClasses(window.filterForm.imgUpploadPreview);
  window.filterForm.effectPin.style.left = 90 + 'px';
  window.filterForm.effectDepth.style.width = initialPinValue + '%';
  window.filterForm.effectLevelInput.value = initialPinValue;
  window.filterForm.imgUpploadPreview.setAttribute('class', TranslateToClass[input.value]);
  getFilter(window.filterForm.imgUpploadPreview, initialPinValue);
}

var filterValue = '';

var effectList = document.querySelector('.effects');
  effectList.addEventListener('click', function(evt) {
    var target = evt.target;
    var parent = target.parentNode;
    var sibling = parent.parentNode.querySelector('input');
    filterValue = sibling.value;
  }, true);

  function getFilter(node, quantity) {
    node.style.filter = '';
      if (TranslateToFilter[filterValue] === '') return;
      if (TranslateToFilter[filterValue] === 'grayscale')
      node.style.filter = TranslateToFilter[filterValue] + '(' + quantity + '%)';
      if (TranslateToFilter[filterValue] === 'sepia')
      node.style.filter = TranslateToFilter[filterValue] + '(' + quantity + '%)';
      if (TranslateToFilter[filterValue] === 'invert')
      node.style.filter = TranslateToFilter[filterValue] + '(' + quantity + '%)';
      if (TranslateToFilter[filterValue] === 'blur')
      node.style.filter = TranslateToFilter[filterValue] + '(' + (quantity/10) + 'px)';
      if (TranslateToFilter[filterValue] === 'brightness')
      node.style.filter = TranslateToFilter[filterValue] + '(' + (quantity + 100) + '%)';
  }

window.filterForm.effectPin.addEventListener('mousedown', function(evt) {
  evt.preventDefault();

  var start = {
    x: evt.clientX
  };

  var onMouseMove = function(move) {
  move.preventDefault();
   if (move.clientX > 980 || move.clientX < 530) {
    return;
  }

  var shift = {
    x: start.x - move.clientX
  };

  start = {
    x: move.clientX
  };

  window.filterForm.effectPin.style.left = (window.filterForm.effectPin.offsetLeft - shift.x) + 'px';
  var parent = window.filterForm.effectPin.parentNode;
  var value = Math.floor((window.filterForm.effectPin.offsetLeft/parent.clientWidth)*100);
  window.filterForm.effectDepth.style.width = '' + value + '%';
  window.filterForm.effectLevelInput.value = value;
  getFilter(window.filterForm.imgUpploadPreview, value); 
};
 var onMouseUpB = function(UpEvt) {
    UpEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUpB);
  };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUpB);

});


window.filterForm.uploadLabel.addEventListener('click', function(evt) {
  evt.preventDefault();
  var initialDistance = '90px';
  var initialDepth = 20;
  var initialScaleValue = '95%';
  filterValue = 'none';
  window.filterForm.effectPin.style.left = initialDistance;
  window.filterForm.effectDepth.style.width = initialDepth + '%';
  window.filterForm.effectLevelInput.value = initialDepth;
  window.filterForm.imgUpploadPreview.style.width = initialScaleValue;
  window.filterForm.scaleInput.value = initialScaleValue;
  window.filterForm.spansForEffects.forEach(function(item) {
    var input = item.parentNode.parentNode.querySelector('input');
    input.checked = false;
  });
  getFilter(window.filterForm.imgUpploadPreview, 20);
  window.handlers.HiddenClassDeleteHandler(window.filterForm.redactionForm);
  window.handlers.deleteAllClasses(window.filterForm.imgUpploadPreview);
});

window.filterForm.spansForEffects.forEach(function(item) {
  item.addEventListener('click', function(evt) {
    setCheked(evt.target);
  });
});

//checking of hash tag coorection

var hashTagInput = document.querySelector('.text__hashtags');

hashTagInput.addEventListener('blur', function(evt) {
  evt.preventDefault();
  var target = evt.target;
  var text = target.value;
  var checkArrow = text.split(/[ ]|,\s*|\,/);
  for (var i = 0; i < checkArrow.length; i++) {
    if (checkArrow[i].indexOf('#') === -1 || checkArrow[i].length > 20) {
      target.classList.add('input-invalid');
      switch (checkArrow[i].indexOf('#') === -1){
        case true: target.setCustomValidity('Добавь # в ' + 'хэштэги!');
        break;
        case false: target.setCustomValidity((i+1) + '-й' + ' слишком длинный хэштэг, не более 20 символов!');
        break;
      }
    }
    else {
      target.classList.remove('input-invalid');
    }
  }
});

})();