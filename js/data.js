'use strict';
(function() {

var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море.', 'Как же круто тут кормят.', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

function getJsObjects(quantity) {
  var objectCollection = [];
  for (var i = 1; i<=quantity; i++) {
    var object = {}, newArr = window.utils.getRandomLength(COMMENTS, 5);   
    object[i] = {url: 'photos/' + [i] + '.jpg', likes: window.utils.getRandom(15, 200), comments: newArr, description: DESCRIPTION[window.utils.getRandom(0, DESCRIPTION.length-1)]};
    objectCollection.push(object[i]);
  }
  return objectCollection;
}

//rendering DOM photo

window.data = {photoContainer: document.querySelector('.pictures'),
photo: getJsObjects(25)
};

})();