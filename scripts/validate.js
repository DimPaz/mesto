const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_inactive",
  markErrorClass: "form__input_type_error",
  activeErrorClass: "form__input-error_active",
};
// Добавление обработчиков всем формам
const enableValidation = ({ formSelector, ...config }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение
    });
    setEventListeners(config, formElement);
  });
};

// Добавление обработчиков всем полям формы
const setEventListeners = (config, formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  ); //делаем массив
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(config, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(config, formElement, inputElement); // передаем форму и проверяемый элемент
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

// Функция, которая проверяет валидность поля
const isValid = (config, formElement, inputElement) => {
  // элемент формы, в которой находится проверяемое поле ввода & проверяемое поле ввода
  if (!inputElement.validity.valid) {
    // получаем параметром форму, в которой находится проверяемое поле, и само это поле
    showInputError(
      config,
      formElement,
      inputElement,
      inputElement.validationMessage
    ); // Если поле не проходит валидацию, покажем ошибку
  } else {
    hideInputError(config, formElement, inputElement); // Если проходит, скроем
  }
};
// Функция, которая добавляет класс с ошибкой
const showInputError = (config, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
  inputElement.classList.add(config.markErrorClass); // Показываем красную линию ошибки
  errorElement.textContent = errorMessage; //текст браузерных ошибок
  errorElement.classList.add(config.activeErrorClass); // Показываем сообщение об ошибке
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (config, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // Находим элемент ошибки
  inputElement.classList.remove(config.markErrorClass); // Скрываем красную линию ошибки
  errorElement.classList.remove(config.activeErrorClass); // Скрываем сообщение об ошибке
  errorElement.textContent = ""; // Очистим ошибку
};

//проверка на валидность полей попапа
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция переключения кнопки актив/неактив
function toggleButtonState(config, inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.inactiveButtonClass); // сделать кнопку неактивной
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass); // сделать кнопку активной
  }
}

enableValidation(config);
