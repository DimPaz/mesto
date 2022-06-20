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
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  /**
   * публичный метод сброс ошибок при открытии попапа
   */
  resetErrors() {
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButtonState();
  }

  /**
   * приватный метод проверка на валидность полей попапа
   * @param {*} inputList
   * @returns
   */
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  /**
   * приватный метод переключения кнопки актив/неактив
   * @param {*} inputList
   * @param {*} buttonElement
   */
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.classList.add(this._inactiveButtonClass); // сделать кнопку неактивной
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass); // сделать кнопку активной
      this._buttonElement.disabled = false;
    }
  }

  /**
   * приватный метод проверяет валидность поля
   * @param {*} formElement
   * @param {*} inputElement
   */
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
      this._hideInputError(inputElement); // Если проходит, скроем
    }
  };

  /**
   * приватный метод добавляет класс с ошибкой
   * @param {*} formElement
   * @param {*} inputElement
   * @param {*} errorMessage
   */
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
    inputElement.classList.add(this._markErrorClass); // Показываем красную линию ошибки
    errorElement.textContent = errorMessage; //текст браузерных ошибок
    errorElement.classList.add(this._activeErrorClass); // Показываем сообщение об ошибке
  };

  /**
   * приватный метод удаляет класс с ошибкой
   * @param {*} inputElement
   */
  _hideInputError = (inputElement) => {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    ); // Находим элемент ошибки
    inputElement.classList.remove(this._markErrorClass); // Скрываем красную линию ошибки
    errorElement.classList.remove(this._activeErrorClass); // Скрываем сообщение об ошибке
    errorElement.textContent = ""; // Очистим ошибку
  };

  /**
   * приватный метод добавления обработчиков всем полям формы
   */
  _setEventListeners = () => {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(this._formElement, inputElement); // передаем форму и проверяемый элемент
        this._toggleButtonState();
      });
    });
  };

  /**
   * публичный метод включает валидацию формы
   */
  enableValidation() {
    this._setEventListeners();
  }
}
