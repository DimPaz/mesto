export const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_inactive",
  markErrorClass: "form__input_type_error",
  activeErrorClass: "form__input-error_active",
};

export class FormValidator {
  _config;
  _formElement;
  _inputList;

  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._markErrorClass = config.markErrorClass;
    this._activeErrorClass = config.activeErrorClass;
    this._formElement = formElement;
  }

  _submitHandler = (evt) => {
    evt.preventDefault();
  };

  //проверка на валидность полей попапа
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // функция переключения кнопки актив/неактив
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(config.inactiveButtonClass); // сделать кнопку неактивной
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass); // сделать кнопку активной
    }
  }

  // функция, которая проверяет валидность поля
  _isValid = (formElement, inputElement) => {
    // элемент формы, в которой находится проверяемое поле ввода & проверяемое поле ввода
    if (!inputElement.validity.valid) {
      // получаем параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(
        this._formElement,
        inputElement,
        inputElement.validationMessage
      ); // Если поле не проходит валидацию, покажем ошибку
    } else {
      this._hideInputError(this._formElement, inputElement); // Если проходит, скроем
    }
  };

  // Функция, которая добавляет класс с ошибкой
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(config.markErrorClass); // Показываем красную линию ошибки
    errorElement.textContent = errorMessage; //текст браузерных ошибок
    errorElement.classList.add(config.activeErrorClass); // Показываем сообщение об ошибке
  };

  // Функция, которая удаляет класс с ошибкой
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(config.markErrorClass); // Скрываем красную линию ошибки
    errorElement.classList.remove(config.activeErrorClass); // Скрываем сообщение об ошибке
    errorElement.textContent = ""; // Очистим ошибку
  };

  _setEventListeners = () => {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(config.inputSelector)
    ); //делаем массив
    this._buttonElement = this._formElement.querySelector(
      config.submitButtonSelector
    );
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(this._formElement, inputElement); // передаем форму и проверяемый элемент
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  enableValidation() {
    this._formElement.addEventListener("submit", this._submitHandler);
    this._setEventListeners();
  }
}
