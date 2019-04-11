'use strict';

(function() {

window.gallery = {

  

};

var photoHTML = [];

photoHTML = window.pictures.getHTMLcollection(window.data.photo);

window.pictures.getVisiblePhoto(photoHTML, window.data.photoContainer);

})();