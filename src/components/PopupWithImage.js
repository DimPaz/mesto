import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor({ popupSelector, imageCardPopup, nameCardPopup }) {
    super({ popupSelector });
    this._imageCardPopup = document.querySelector(imageCardPopup);
    this._nameCardPopup = document.querySelector(nameCardPopup);
  }

  /**
   * метод открыть попап image
   * @param {*} name
   * @param {*} link
   */
  open(name, link) {
    this._imageCardPopup.src = link; // добавили нужную картинку для попапа
    this._imageCardPopup.alt = name; // добавили alt для картинки попапа
    this._nameCardPopup.textContent = name; // добавили нужную подпись для попапа
    super.open();
  }
}
