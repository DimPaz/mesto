import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._form = this._popupSelector.querySelector(".form");
  }

  setEventListenersDelete() {
    super.setEventListeners();
  }
  //метод для передачи колбека удаления карточки
  setSubmitAction(deleteCardHandler) {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      deleteCardHandler();
    });
  }
}
