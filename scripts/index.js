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

const formElement = document.querySelector(".popup__container");
// console.log(formElement);
const nameInput = formElement.querySelector(".input-name");
// console.log(nameInput);
const jobInput = formElement.querySelector(".input-job");
// console.log(jobInput);
const popupSaveBtn = formElement.querySelector(".popup__save-btn");

const profileName = document.querySelector(".profile__name");
// console.log(profileName.textContent);
const profileProfession = document.querySelector(".profile__profession");
// console.log(profileProfession.textContent);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  popupSaveBtn.addEventListener("click", openPopupWindow);
}
formElement.addEventListener("submit", formSubmitHandler);

// function formSubmitHandler (evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileProfession.textContent = jobInput.value;
//   popupSaveBtn.addEventListener("click", openPopupWindow);
// }
// formElement.addEventListener("submit", formSubmitHandler);
