import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
  }

  // приватный метод который собирает данные всех полей формы
  _getInputValues() {
    console.log("qwe");
  }

  setEventListeners() {
    console.log("добавить обработчик сабмита формы");
  }

  close() {
    console.log("добавить сброс формы");
  }
}
