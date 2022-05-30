import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popupSelector, { handleFormSubmit }) {
    super(popupSelector);
    this._popupSelector = popupSelector;
    this._handleFormSubmit = handleFormSubmit;
  }

  // приватный метод который собирает данные всех полей формы
  _getInputValues() {
    this._inputList = this._popupSelector.querySelectorAll(".form__input");
    this._inputValues = {};
    this._inputList.forEach((input) => {
      console.log(input.value);
      this._inputValues = input.value;
    });
    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener("submit", (event) => {
      event.preventDefault();

      console.log(this._getInputValues());
      // this._handleFormSubmit();
      super.close();
    });
  }

  close() {
    super.close();
    console.log("добавить сброс формы");
  }
}
