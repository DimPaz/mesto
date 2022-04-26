// Вынесем все необходимые элементы формы в константы
const formElement = document.querySelector(".form"); //html-элемент формы, в которой находится проверяемое поле ввода. Он нужен для поиска элемента ошибки в форме.
const formInput = formElement.querySelector(".form__input");
console.log(formInput.id); // "name-input"
const formError = formElement.querySelector(`.${formInput.id}-error`); //Выбираем элемент ошибки на основе уникального класса
console.log(formError);

// Функция, которая добавляет класс с ошибкой
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки внутри самой функции
  inputElement.classList.add("form__input_type_error"); // Показываем красную линию ошибки
  errorElement.textContent = errorMessage; //текст браузерных ошибок
  errorElement.classList.add("form__input-error_active"); // Показываем сообщение об ошибке
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`); // Находим элемент ошибки
  inputElement.classList.remove("form__input_type_error"); // Скрываем красную линию ошибки
  errorElement.classList.remove("form__input-error_active"); // Скрываем сообщение об ошибке
  errorElement.textContent = ""; // Очистим ошибку
};

// Функция, которая проверяет валидность поля
const isValid = (formElement, inputElement) => {
  // элемент формы, в которой находится проверяемое поле ввода & проверяемое поле ввода
  if (inputElement.validity.valid) {
    // Если проходит, скроем
    hideInputError(formElement, inputElement);
  } else {
    // получаем параметром форму, в которой находится проверяемое поле, и само это поле
    // Если поле не проходит валидацию, покажем ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage);
  }
};

//проверка на валидность полей попапа
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// функция переключения кнопки
const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add("popup__save-btn_inactive"); // сделать кнопку неактивной
  } else {
    buttonElement.classList.remove("popup__save-btn_inactive"); // сделать кнопку активной
  }
};

// Добавление обработчиков всем полям формы
const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(".form__input")); //делаем массив
  const buttonElement = formElement.querySelector(".popup__save-btn");
  toggleButtonState(inputList, buttonElement); //функция переключения кнопки
  // Обойдём все элементы полученной коллекции
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement); // передаем форму и проверяемый элемент
      toggleButtonState(inputList, buttonElement); //функция переключения кнопки
    });
  });
};

// Добавление обработчиков всем формам
const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll(".form"));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault(); // У каждой формы отменим стандартное поведение
    });
    setEventListeners(formElement); //Для каждой формы вызовем функцию setEventListeners, передав ей элемент формы
  });
};

enableValidation();
