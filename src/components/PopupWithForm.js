import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".form__input");
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._popup.querySelector(".popup__save-btn");
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
      // как я до этого не додумася, конекретно про сохранение изначального текста)))
      const initialText = this._submitButton.textContent; // сохраняем изначальный текст кнопки
      this._submitButton.textContent = "Сохранение...";
      this._handleFormSubmit(this._getInputValues()) //
        .then(() => this.close()) // закрывается попап
        .finally(() => {
          this._submitButton.textContent = initialText; //возвращаем изначальный текст сабмита
        });
    });
  }

  close() {
    super.close();
    this._form.reset(); //обнуление значений в инпуте название и ссылка на картинку
  }
}
