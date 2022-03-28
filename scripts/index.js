const profileEditBtn = document.querySelector(".profile__edit-btn");
const popupWindow = document.querySelector(".popup");
const popupCloseBtn = popupWindow.querySelector(".popup__close-btn");

// открытие-закрытие popup
function openPopupWindow() {
  popupWindow.classList.toggle("popup_opened");
}
// открыть popup
profileEditBtn.addEventListener("click", openPopupWindow);
// закрыть popup
popupCloseBtn.addEventListener("click", openPopupWindow);

// закрыть popup на overlay
function closeOnOverlayClick(event) {
  //console.log("Event.target", event.target); // самый глубокий элемент, на котором произошло событие.
  //console.log("Event.carrentTarget", event.currentTarget); // элемент, на котором в данный момент сработал обработчик (до которого «доплыло» событие)
  if (event.target === event.currentTarget) {
    openPopupWindow();
  }
}
popupWindow.addEventListener("click", closeOnOverlayClick);


let formElement = document.querySelector(".popup__container");
let nameInput = formElement.querySelector(".popup__container");
let jobInput = formElement.querySelector(".popup__container");