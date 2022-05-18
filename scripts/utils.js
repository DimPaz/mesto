export const imageCardPopup = document.querySelector(".popup__card-image"); // картинка в попапе

//функция открыть попапы
export function openModal(modalNode) {
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
export function closePopupWindow(modalNode) {
  modalNode.classList.remove("popup_opened");
  document.removeEventListener("keydown", onEscBtn);
}
