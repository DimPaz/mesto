export class Card {
  _name;
  _link;
  _tamplate;
  _veiw; // содержимое tamplate, сам article

  constructor(title, tamplate) {
    this._name = title.name;
    this._link = title.link;
    this._tamplate = tamplate;
  }

  //приватный метод удаления карточки
  _deleteCard() {
    this._veiw.remove();
  }
  //приватный метод like карточки
  _likeCard() {
    this._veiw
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  //приватный метод открыть попап image
  _openModalImage() {
    document.querySelector(".popup__card-image").src = this._link; // добавили нужную картинку для попапа
    document.querySelector(".popup__card-image").alt =
      this._veiw.querySelector(".element__picture").alt; // добавили alt для картинки попапа
    document.querySelector(".popup__card-name").textContent = this._name; // добавили нужную подпись для попапа
    document.querySelector(".popup_type_image").classList.add("popup_opened");
    document.addEventListener("keydown", onEscBtn);
  }

  //публичный метод формируем template
  getView() {
    this._veiw = this._tamplate.content
      .cloneNode(true)
      .querySelector(".element"); // клонируем template со всем содержимым
    this._veiw.querySelector(".element__text").textContent = this._name; // добавляем имя карточки
    this._veiw.querySelector(".element__picture").src = this._link; // добавляем картинку для карточки
    this._veiw.querySelector(".element__picture").alt = this._name; // добавляем alt для карточки

    // удаление карточек, запуск слушателя
    this._veiw
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._deleteCard();
      });
    // like карточки, запуск слушателя
    this._veiw.querySelector(".element__like").addEventListener("click", () => {
      this._likeCard();
    });
    // открыть попап image, запуск слушателя
    this._veiw
      .querySelector(".element__picture")
      .addEventListener("click", () => {
        this._openModalImage();
      });

    return this._veiw;
  }
}
