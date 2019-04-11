'use strict';
(function() {

var onBigPictureCloseButton = document.querySelector('#picture-cancel');

onBigPictureCloseButton.addEventListener('click', window.handlers.closeButtonHandler);
document.addEventListener('keydown', window.handlers.EscCloseHandler);

//set on listener for thumbnails-pictures, for rendering bigphoto.

window.data.photoContainer.addEventListener('click', function(evt) {
  evt.preventDefault();
  var target = evt.target;
  var targetClass = target.getAttribute('class');
  var targetTag = target.tagName;
  var targetParent = target.parentNode;
  var bigPicture = document.querySelector('.big-picture');
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

  //mark up our target with id.

  target.setAttribute('id', 'prettyNice');

  //looking for our marked photo index, for binding it with jsobjects.

  var correctIndex = 0;
  var collection = window.data.photoContainer.querySelectorAll('.picture');
  for (var i = 0; i <= collection.length-1; i++) {
    if (collection[i].getAttribute('id') == 'prettyNice') {
      correctIndex = i;
      target.setAttribute('id', 'old');
    }
  }

  //rendering big photo

  creationBigPicture(window.data.photo[correctIndex]);

}, true);

	//rewrite comments

function rewritingComments (sector, temptlate) {
 var sectorCollecton = sector.querySelectorAll('li');
 sectorCollecton.forEach(function(item) {
   sector.removeChild(item);
 });
 var fragment = document.createDocumentFragment();
 for (var i = 0; i <= temptlate.comments.length-1; i++) {
    var li = document.createElement('li');
    var img = document.createElement('img');
    var p = document.createElement('p');
    li.setAttribute('class', 'social__comment social__comment--text');    
    img.setAttribute('class', 'social__picture');
    img.setAttribute('src', 'img/avatar-' + window.utils.getRandom(1,6) + '.svg');
    img.setAttribute('alt', 'Аватар комментатора фотографии');
    img.setAttribute('width', '35');
    img.setAttribute('height', '35');
    p.setAttribute('class', 'social__text');
    p.textContent = temptlate.comments[i];
    li.appendChild(img);
    li.appendChild(p);
    fragment.appendChild(li);
  }
  sector.appendChild(fragment);
}
	//rendering new big picture

var creationBigPicture = function (temptlate) {
  var bigPicture = document.querySelector('.big-picture');
  var sectorComments = bigPicture.querySelector('.social__comments');
  bigPicture.querySelector('.big-picture__img img').src = temptlate.url;
  bigPicture.querySelector('.likes-count').textContent = temptlate.likes;
  bigPicture.querySelector('.comments-count').textContent = temptlate.comments.length;
  bigPicture.querySelector('.social__caption').textContent = temptlate.description;
  rewritingComments(sectorComments, temptlate);
  bigPicture.classList.remove('hidden');
};
})();