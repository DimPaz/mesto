import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageCardPopup, nameCardPopup) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._imageCardPopup = imageCardPopup;
    this._nameCardPopup = nameCardPopup;
  }

  // метод открыть попап image
  open(name, link) {
    this._imageCardPopup.src = link; // добавили нужную картинку для попапа
    this._imageCardPopup.alt = name; // добавили alt для картинки попапа
    this._nameCardPopup.textContent = name; // добавили нужную подпись для попапа
    super.open();
  }
}
