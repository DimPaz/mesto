const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-btn",
  errorInputSelector: ".form__input-error",
  activeErrorSelector: ".form__input_type_error",
  inactiveButtonClass: "popup__save-btn_inactive",
  markErrorClass: "form__input_type_error",
  activeErrorClass: "form__input-error_active",
};

const imageCardPopup = document.querySelector(".popup__card-image"); // картинка в попапе
const nameCardPopup = document.querySelector(".popup__card-name"); // имя карточки в попапе
const imagePopup = document.querySelector(".popup_type_image"); // попап картинки
const onOverlayBtn = document.querySelectorAll(".popup__container"); // область overlay попап

export { config, imageCardPopup, nameCardPopup, imagePopup, onOverlayBtn };