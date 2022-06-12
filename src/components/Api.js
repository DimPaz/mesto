export class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
      Authorization: this._token,
    };
  }
  getCards() {
    return fetch(this._url, {
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
    return fetch(this._url, {
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
    return fetch(`${this._url}/${cardId}`, {
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
