export class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
      Authorization: this._token,
    };
  }

  //Для проверки
  // test() {
  //   fetch(`${this._url}/cards/`, {
  //     method: "GET",
  //     headers: this._headers,
  //   })
  //   .then((res)=> {
  //     return res.json();
  //   })
  //     .then((data) => {
  //         console.log(data);
  //       });
  //   }

  getUser() {
    return fetch(`${this._url}/users/me/`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  addUserInfo(name, about) {
    return fetch(`${this._url}/users/me/`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }


  
  getCards() {
    return fetch(`${this._url}/cards/`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }

  addCard(card) {
    const newCard = {
      name: card.name,
      link: card.link,
    };
    return fetch(`${this._url}/cards/`, {
      method: "POST",
      body: JSON.stringify(newCard),
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Возникла ошибка");
    });
  }
}
