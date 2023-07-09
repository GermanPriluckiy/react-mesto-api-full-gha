class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  //Проверка ответа
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    } else {
      return res.json();
    }
  }

  //Получение карточек с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then(
      (res) => {
        return this._getResponseData(res);
      }

    );
  }

  //Получение информации о пользователе
  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  //Редактирования информации профиля
  setUserInfo(newName, newAbout) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: newName,
        about: newAbout,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  
  //Добавление новой карточки
  addNewCard(cardName, cardLink) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  //Функция лайка

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
      }).then((res) => {
        return this._getResponseData(res);
      });
    }
    else {
      return fetch(`${this._baseUrl}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
        credentials: 'include',
      }).then((res) => {
        return this._getResponseData(res);
      });
    }
  }


  //Обновление аватара
  updateAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: 'include',
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

export const api = new Api({
  baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});
