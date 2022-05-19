const config = {
  formSelector: ".form",
  inputSelector: ".form__input",
  submitButtonSelector: ".popup__save-btn",
  inactiveButtonClass: "popup__save-btn_inactive",
  markErrorClass: "form__input_type_error",
  activeErrorClass: "form__input-error_active",
};

const imageCardPopup = document.querySelector(".popup__card-image"); // картинка в попапе

//функция открыть попапы
function openModal(modalNode) {
  modalNode.classList.add("popup_opened");
  document.addEventListener("keydown", onEscBtn);
}

// закрыть конкретный попап на esc
function onEscBtn(evt) {
  if (evt.key === "Escape") {
    const popupActive = document.querySelector(".popup_opened");
    closePopupWindow(popupActive);
  }
}
//функция закрыть попапы
function closePopupWindow(modalNode) {
  modalNode.classList.remove("popup_opened");
  document.removeEventListener("keydown", onEscBtn);
}

export { config, imageCardPopup, openModal, closePopupWindow };
