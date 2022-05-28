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
const listContainer = document.querySelector(".elements"); // выбираем elements, куда будет вставляться template
const onOverlayBtn = document.querySelectorAll(".popup__container"); // область overlay попап
//===============================
//функция открыть попапы
// function openModal(modalNode) {
//   modalNode.classList.add("popup_opened");
//   document.addEventListener("keydown", onEscBtn);
// }

// // закрыть конкретный попап на esc
// function onEscBtn(evt) {
//   if (evt.key === "Escape") {
//     const popupActive = document.querySelector(".popup_opened");
//     closePopupWindow(popupActive);
//   }
// }
// //функция закрыть попапы
// function closePopupWindow(modalNode) {
//   modalNode.classList.remove("popup_opened");
//   document.removeEventListener("keydown", onEscBtn);
// }
//===================================
export {
  config,
  imageCardPopup,
  nameCardPopup,
  imagePopup,
  // openModal,
  // closePopupWindow,
  listContainer,
  onOverlayBtn,
};
