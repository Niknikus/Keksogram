'use strict';
(function () {

  window.preview = {
    // rewrite comments

    rewritingComments: function (sector, temptlate) {
      let sectorCollecton = sector.querySelectorAll('li');
      sectorCollecton.forEach(function (item) {
        sector.removeChild(item);
      });
      let fragment = document.createDocumentFragment();
      for (let i = 0; i <= temptlate.comments.length - 1; i++) {
        let li = document.createElement('li');
        let img = document.createElement('img');
        let p = document.createElement('p');
        li.setAttribute('class', 'social__comment social__comment--text');
        img.setAttribute('class', 'social__picture');
        img.setAttribute('src', temptlate.comments[i].avatar);
        img.setAttribute('alt', 'Аватар комментатора фотографии');
        img.setAttribute('width', '35');
        img.setAttribute('height', '35');
        p.setAttribute('class', 'social__text');
        p.textContent = temptlate.comments[i].message;
        li.appendChild(img);
        li.appendChild(p);
        fragment.appendChild(li);
      }
      sector.appendChild(fragment);
    },
    creationBigPicture: function (temptlate) {
      let bigPicture = document.querySelector('.big-picture');
      let sectorComments = bigPicture.querySelector('.social__comments');
      let pictureAvatar = bigPicture.querySelector('.social__picture');
      pictureAvatar.src = 'img/avatar-' + window.utils.getRandom(1, 6) + '.svg';
      bigPicture.querySelector('.big-picture__img img').src = temptlate.url;
      bigPicture.querySelector('.likes-count').textContent = temptlate.likes;
      bigPicture.querySelector('.comments-count').textContent = temptlate.comments.length;
      bigPicture.querySelector('.social__caption').textContent = temptlate.description;
      window.preview.rewritingComments(sectorComments, temptlate);
      bigPicture.classList.remove('hidden');
    }
  };

})();
