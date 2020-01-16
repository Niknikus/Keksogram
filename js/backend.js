'use strict';

(function () {
  window.backend = {
    onErrorMessage: function (status) {
      switch (status) {
        case 400: alert('Не найден'); break;
        case 404: alert('Проверь адрес'); break;
        case 500: alert('Бэкэнд барахлит'); break;
      }
    },
    load: function (onLoad, onError) {
      var url = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function () {
        if (xhr.status !== 200) {
          onError(xhr.status);
        } else {
          onLoad(xhr.response);
        }
      });
      xhr.responseType = 'json';
      xhr.open('GET', url);
      xhr.send();
    }
  };
})();
