import {
  // openModal,
  // imageCardPopup,
  // nameCardPopup,
  // imagePopup,
} from "./utils.js";

// import { openImagePopap } from "./index.js";
import { handleImageClick } from "./index.js";

export class Card {
  constructor(title, tamplate) {
    this._name = title.name;
    this._link = title.link;
    this._tamplate = tamplate;
  }

  //приватный метод удаления карточки
  _deleteCard() {
    this._view.remove();
    this._view = null;
  }
  //приватный метод like карточки
  _likeCard() {
    this._view
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }

  //публичный метод формируем template
  getView() {
    this._view = this._tamplate.content
      .cloneNode(true)
      .querySelector(".element"); // клонируем template со всем содержимым
    this._picture = this._view.querySelector(".element__picture");
    this._picture.src = this._link; // добавляем картинку для карточки
    this._picture.alt = this._name; // добавляем alt для карточки
    this._view.querySelector(".element__text").textContent = this._name; // добавляем имя карточки

    // удаление карточек, запуск слушателя
    this._view
      .querySelector(".element__trash")
      .addEventListener("click", () => { 
        this._deleteCard();
      });
    // like карточки, запуск слушателя
    this._view.querySelector(".element__like").addEventListener("click", () => {
      this._likeCard();
    });
    // открыть попап image, запуск слушателя
    this._picture.addEventListener("click", () => {
      handleImageClick (this._name, this._link);
    });


    return this._view;
  }
}
