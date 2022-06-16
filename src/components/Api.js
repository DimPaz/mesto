export class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
      Authorization: this._token,
    };
  }

  _requestVerification(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject("Возникла ошибка");
  }

  getAllData() {
    return Promise.all([this.getCards(), this.getUser()]);
  }

  // данные пользователя имя проф и аватар
  getUser() {
    return fetch(`${this._url}/users/me/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._requestVerification);
    // .then((res) => {
    // if (res.ok) {
    //   return res.json();
    // }
    // return Promise.reject("Возникла ошибка");
    // });
  }

  //запрос патч для замены имя и проф
  addUserInfo(name, about) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._requestVerification);
  }

  //запрос патч для замены аватара
  addAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._requestVerification);
  }

  // данные карточки
  getCards() {
    return fetch(`${this._url}/cards/`, {
      method: "GET",
      headers: this._headers,
    }).then(this._requestVerification);
  }

  //запрос пост для создания карточки
  addCard(card) {
    const newCard = {
      name: card.name,
      link: card.link,
    };
    return fetch(`${this._url}/cards/`, {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: this._headers,
    }).then(this._requestVerification);
  }

  //запрос делит для создания карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._requestVerification);
  }

  //отправить PUT-запрос лайка
  addLike(likeId) {
    return fetch(`${this._url}/cards/${likeId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._requestVerification);
  }

  //отправить DELETE-запрос лайка
  deleteLike(likeId) {
    return fetch(`${this._url}/cards/${likeId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._requestVerification);
  }
}
