// import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import { config, openModal, closePopupWindow, imagePopup } from "./utils.js";

//добавление карт
const listContainer = document.querySelector(".elements"); // выбираем elements, куда будет вставляться template
const elementCard = document.querySelector(".template-cards"); // выбираем нужный template
// открыть popup
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
const cardEditBtn = document.querySelector(".profile__add-btn"); // кнопка добавления новой карточки
const profilePopup = document.querySelector(".popup_type_profile"); // попап профиля
const cardPopup = document.querySelector(".popup_type_card"); // попап карт
const editPopupForm = profilePopup.querySelector("#editPopupForm"); // форма профиля
const cardPopupForm = cardPopup.querySelector("#cardPopupForm"); // форма карт
// закрыть popup
const profileCloseBtn = document.querySelector(
  ".popup__close-btn_type_profile"
); // кнопка попап profile
const cardCloseBtn = document.querySelector(".popup__close-btn_type_card"); // кнопка попап card
const imageCloseBtn = document.querySelector(".popup__close-btn_type_image"); // кнопка попап image
const onOverlayBtn = document.querySelectorAll(".popup__container"); // область overlay попап
//переменные ддя сабмита profile
const profileForm = document.querySelector(".popup_type_profile");
const nameInput = profileForm.querySelector(".popup__text_input_name");
const jobInput = profileForm.querySelector(".popup__text_input_job");
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");
//переменные ддя сабмита card
const cardForm = document.querySelector(".popup_type_card");
const cardFormInput = document.getElementById("cardPopupForm");
const signatureInput = cardForm.querySelector(".popup__text_input_signature");
const imageInput = cardForm.querySelector(".popup__text_input_image");

//==============================
// //создание карточек
// initialCards.forEach((item) => {
//   addCards(createСard(item));
// });
// //функция ввод signature и link
// function handleCardFormSubmit(event) {
//   event.preventDefault();
//   const newCard = {
//     name: signatureInput.value,
//     link: imageInput.value,
//   };
//   listContainer.prepend(createСard(newCard)); //добавляем карту в начало списка из попапа
//   cardFormInput.reset(); //обнуление значений в инпуте название и ссылка на картинку
//   closePopupWindow(cardPopup);
// }
// //создание экземпляра карточки и генерация объекта
// function createСard(item) {
//   const card = new Card(item, elementCard);
//   return card.getView();
// }
// //функция добавляем карты в начало списка из массива
// function addCards(element) {
//   listContainer.append(element);
// }
//========================================

const cardList = new Section(initialCards, elementCard);
cardList.renderer();

//========================================

//функция ввод name и job
function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  closePopupWindow(profilePopup);
}

//открыть попап профиль
profileEditBtn.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  jobInput.value = professionProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  editFormValidator.resetErrors();
  openModal(profilePopup);
});

//открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => {
  cardFormValidator.resetErrors();
  openModal(cardPopup);
});

// закрыть попапы на overLay
onOverlayBtn.forEach((elem) => {
  elem.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopupWindow(document.querySelector(".popup_opened"));
    }
  });
});

//валидация формы profile
const editFormValidator = new FormValidator(config, editPopupForm);
editFormValidator.enableValidation();

//валидация формы card
const cardFormValidator = new FormValidator(config, cardPopupForm);
cardFormValidator.enableValidation();

//слушатели

profileForm.addEventListener("submit", handleProfileFormSubmit); //ввод name и job
// cardForm.addEventListener("submit", handleCardFormSubmit); //ввод signature и link

profileCloseBtn.addEventListener("click", function () {
  closePopupWindow(profilePopup);
}); // закрыть popup profile

cardCloseBtn.addEventListener("click", function () {
  closePopupWindow(cardPopup);
}); // закрыть popup Card

imageCloseBtn.addEventListener("click", function () {
  closePopupWindow(imagePopup);
}); // закрыть popup Image
