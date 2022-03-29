// открытие-закрытие popup
const profileEditBtn = document.querySelector(".profile__edit-btn");
const popupWindow = document.querySelector(".popup");
const popupCloseBtn = popupWindow.querySelector(".popup__close-btn");
const formElement = document.querySelector(".popup__container");
const nameInput = formElement.querySelector(".popup__text_input_name");
const jobInput = formElement.querySelector(".popup__text_input_job");
const popupSaveBtn = formElement.querySelector(".popup__save-btn");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

// открытие-закрытие popup
function openPopupWindow() {
  nameInput.value = profileName.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  jobInput.value = profileProfession.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  popupWindow.classList.add("popup_opened");
}
profileEditBtn.addEventListener("click", openPopupWindow); // открыть popup

function closePopupWindow() {
  popupWindow.classList.remove("popup_opened");
}
popupCloseBtn.addEventListener("click", closePopupWindow); // закрыть popup

// закрыть popup на overlay
function closeOnOverlayClick(event) {
  // console.log("Event.target", event.target); // самый глубокий элемент, на котором произошло событие.
  // console.log("Event.carrentTarget", event.currentTarget); // элемент, на котором в данный момент сработал обработчик (до которого «доплыло» событие)
  if (event.target === event.currentTarget) {
    closePopupWindow();
  }
}
popupWindow.addEventListener("click", closeOnOverlayClick);

//ввод name и job
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopupWindow();
}
formElement.addEventListener("submit", formSubmitHandler);

// // кнопка лайка
// const cardElement = document.querySelector(".elements");
// const cardLike = document.querySelector(".element__like");

// function likeActiv(event) {
//   console.log("event.target", event.target);
//   console.log("Event.carrentTarget", event.currentTarget);
//   if (event.target === event.currentTarget) {
//     console.log("Равно")
//     cardLike.innerHTML = '<img src="./images/element/like-active.svg" alt="like">';
//   } else {
//     console.log("не Равно")
//     cardLike.innerHTML = '<img src="./images/element/like-disabled.svg" alt="like">';
//   }
// }

// cardLike.addEventListener("click", likeActiv, true);
