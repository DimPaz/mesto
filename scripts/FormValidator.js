export class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._errorInputSelector = config.errorInputSelector;
    this._activeErrorSelector = config.activeErrorSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._markErrorClass = config.markErrorClass;
    this._activeErrorClass = config.activeErrorClass;
    this._formElement = formElement;
    this._textInputError = Array.from(
      this._formElement.querySelectorAll(this._errorInputSelector)
    );
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
    this._styleInputError = Array.from(
      this._formElement.querySelectorAll(this._activeErrorSelector)
    );
  }

  //публичный метод сброс ошибок при открытии попапа
  resetErrors() {
    console.log(this._styleInputError);
    this._styleInputError.forEach((styleError) => {
      styleError.classList.remove(this._markErrorClass); // Скрываем красную линию ошибки при открытии
    });
    this._textInputError.forEach((textError) => {
      textError.textContent = ""; // Скрываем текст ошибки при открытии
    });
    this._toggleButtonState(this._inputList, this._buttonElement);
  }

  // приватный метод отмена стандартного поведения форм
  _submitHandler = (evt) => {
    evt.preventDefault();
  };

  //приватный метод проверка на валидность полей попапа
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  // приватный метод переключения кнопки актив/неактив
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass); // сделать кнопку неактивной
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass); // сделать кнопку активной
      buttonElement.disabled = false;
    }
  }

  // приватный метод проверяет валидность поля
  _isValid = (formElement, inputElement) => {
    // элемент формы, в которой находится проверяемое поле ввода & проверяемое поле ввода
    if (!inputElement.validity.valid) {
      // получаем параметром форму, в которой находится проверяемое поле, и само это поле
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage
      ); // Если поле не проходит валидацию, покажем ошибку
    } else {
      this._hideInputError(this._formElement, inputElement); // Если проходит, скроем
    }
  };

  // приватный метод добавляет класс с ошибкой
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(this._markErrorClass); // Показываем красную линию ошибки
    errorElement.textContent = errorMessage; //текст браузерных ошибок
    errorElement.classList.add(this._activeErrorClass); // Показываем сообщение об ошибке
  };

  // приватный метод удаляет класс с ошибкой
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки
    inputElement.classList.remove(this._markErrorClass); // Скрываем красную линию ошибки
    errorElement.classList.remove(this._activeErrorClass); // Скрываем сообщение об ошибке
    errorElement.textContent = ""; // Очистим ошибку
  };

  //приватный метод добавления обработчиков всем полям формы
  _setEventListeners = () => {
    this._toggleButtonState(this._inputList, this._buttonElement);
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(this._formElement, inputElement); // передаем форму и проверяемый элемент
        this._toggleButtonState(this._inputList, this._buttonElement);
      });
    });
  };

  //публичный метод включает валидацию формы
  enableValidation() {
    this._formElement.addEventListener("submit", this._submitHandler);
    this._setEventListeners();
  }
}
