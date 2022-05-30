import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector, imageCardPopup, nameCardPopup) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._imageCardPopup = imageCardPopup;
    this._nameCardPopup = nameCardPopup;
  }

  open() {
    // // открыть попап image, запуск слушателя
    // this._view.querySelector(".element__picture").addEventListener("click", () => {

    // console.log(this._popupSelector);
    console.log(this._imageCardPopup.src);
    console.log(this._nameCardPopup.alt);
    // this._imageCardPopup.src = this._link; // добавили нужную картинку для попапа
    this._imageCardPopup.src =
      "https://images.unsplash.com/photo-1594539364250-81a8bcb51531?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80"; // добавили нужную картинку для попапа
    // this._imageCardPopup.alt = this._name; // добавили alt для картинки попапа
    this._imageCardPopup.alt = "ергарки"; // добавили alt для картинки попапа
    super.open();
    //   this._openModalImage();
    // });

    //       //приватный метод открыть попап image
    // _openModalImage() {
    //     imageCardPopup.src = this._link; // добавили нужную картинку для попапа
    //     imageCardPopup.alt = this._name; // добавили alt для картинки попапа
    //     nameCardPopup.textContent = this._name; // добавили нужную подпись для попапа
    //     // open(imagePopup);
    //     openImagePopap();
    // }
  }
}
