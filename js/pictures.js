'usesrict';

//random number generator

function getRandom(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
};


var COMMENTS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var DESCRIPTION = ['Тестим новую камеру!', 'Затусили с друзьями на море.', 'Как же круто тут кормят.', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

// function getRandomArrElementQuantity(arr, q) {
    
//     return newArr;
// };


function createArrowObject(quantity) {
  var objectCollection = [];
  for (i = 1; i<=quantity; i++) {
    var object = {};        
    var descriptionRand = DESCRIPTION[getRandom(0, DESCRIPTION.length-1)];
    var oldArr = COMMENTS;
    var newArr = [];
    for (g = 0; g <= Math.floor(Math.random() * 2); g++) {
      j = getRandom(0, oldArr.length-1);
      newArr.push(oldArr[j]);
    };
    object[i] = {url: 'photos/' + [i] + '.jpg', likes: getRandom(15, 200), comments: newArr, description: descriptionRand};
    objectCollection.push(object[i]);
  };
  return objectCollection;
};

var photo = createArrowObject(25);
var temptlatePhotoDOM = document.querySelector('#picture').content;

var createDOMphoto = function (temptlate) {
  var photoDOM = temptlatePhotoDOM.cloneNode(true);
  photoDOM.querySelector('img').src = temptlate.url;
  photoDOM.querySelector('.picture__likes').textContent = temptlate.likes;
  photoDOM.querySelector('.picture__comments').textContent = temptlate.comments;
  return photoDOM;
};

var photoHTML = [];

var getHTMLcollection = function (arr) {
  var newArr = [];
  for (i = 0; i <=arr.length-1; i++) {
    var current = createDOMphoto(arr[i]);
    newArr.push(current);
  };
  return newArr;
};

photoHTML = getHTMLcollection(photo);
var photoContainer = document.querySelector('.pictures');
var getVisiblePhoto = function (arr, parent) {
  for (i = 0; i < arr.length; i++) {
    var mock = {};
    mock[i] = arr[i];
    parent.appendChild(mock[i]);
  };
};

getVisiblePhoto(photoHTML, photoContainer);

var closeBigPicture = document.querySelector('#picture-cancel');

var bigPicture = document.querySelector('.big-picture');

closeBigPicture.addEventListener('click', function(evt) {
  evt.preventDefault();
  if (!bigPicture.classList.contains('hidden')) {
    bigPicture.classList.add('hidden');
  }
  else {false};
});

bigPicture.classList.remove('hidden');

var bigPicturePhoto = bigPicture.querySelector('.big-picture__img img');
var bigPictureLikes = bigPicture.querySelector('.likes-count');

bigPicturePhoto.src = photo[0].url;
bigPictureLikes.textContent = photo[0].likes;
