import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popupSelector.querySelectorAll(".form__input");
    this._form = this._popupSelector.querySelector(".form");
  }

  /**
   * // приватный метод который собирает данные всех полей формы
   * @returns this._inputValues
   */
  _getInputValues() {
    this._inputValues = {};
    this._inputList.forEach((input) => {
      this._inputValues[input.name] = input.value;
    });

    return this._inputValues;
  }

  /**
   * добавляет слушатель клика иконке закрытия попапа и на оверлей
   */
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
      // this._form.reset(); //обнуление значений в инпуте название и ссылка на картинку
    });
  }

  close() {
    super.close();
    this._form.reset(); //обнуление значений в инпуте название и ссылка на картинку
  }
}
