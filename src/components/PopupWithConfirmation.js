import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    this._popupWindow = this._popup.querySelector(".form");
  }

  //метод для передачи колбека удаления карточки
  setSubmitAction(сardHandler) {
    this._сardHandler = сardHandler;
  }

  setEventListenersDelete() {
    super.setEventListeners();
    this._popupWindow.addEventListener("submit", (event) => {
      event.preventDefault();
      this._сardHandler();
    });
  }
}
