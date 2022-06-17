import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._form = this._popupSelector.querySelector(".form");
  }

  //метод для передачи колбека удаления карточки
  setSubmitAction(сardHandler) {
    // console.log(сardHandler);
    this._сardHandler = сardHandler;
  }

  setEventListenersDelete() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._сardHandler();
    });
  }
}
