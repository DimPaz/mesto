import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { UserInfo } from "./UserInfo.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import { config, imagePopup, imageCardPopup, nameCardPopup } from "./utils.js";
import { Popup } from "./Popup.js";

//добавление карт
const templateCards = document.querySelector(".template-cards"); // выбираем нужный template
const listContainer = document.querySelector(".elements"); // выбираем elements, куда будет вставляться template
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
// const cardFormInput = document.querySelector(".popup__form");

//========================================
const popupProfile = new PopupWithForm(profilePopup, {
  handleFormSubmit: () => {
    controlUserInfo.setUserInfo(nameInput, jobInput);
    popupProfile.close();
  },
});
const controlUserInfo = new UserInfo(nameProfile, professionProfile);

//открыть попап профиль
profileEditBtn.addEventListener("click", () => {
  controlUserInfo.getUserInfo(nameInput, jobInput);
  editFormValidator.resetErrors();
  popupProfile.open();
});

//========================================

const popupImage = new PopupWithImage(
  imagePopup,
  imageCardPopup,
  nameCardPopup
);

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

//========================================

const popupCard = new PopupWithForm(cardPopup, {
  handleFormSubmit: (item) => {
    creatingCardInstance(item);
  },
});

popupCard.setEventListeners();
popupImage.setEventListeners();
popupProfile.setEventListeners();
//========================================

// отрисовка карт на странице
const cardList = new Section(
  {
    items: initialCards,
    renderItems: (item) => {
      creatingCardInstance(item);
    },
  },
  listContainer
);
cardList.renderer();

//создание экземпляра карточки и генерация объекта
function creatingCardInstance(item) {
  const card = new Card(item, templateCards, handleCardClick);
  cardList.addCards(card.getView());
}

//========================================

//открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => {
  cardFormInput.reset(); //обнуление значений в инпуте название и ссылка на картинку
  cardFormValidator.resetErrors();
  popupCard.open();
});

//валидация формы profile
const editFormValidator = new FormValidator(config, editPopupForm);
editFormValidator.enableValidation();

//валидация формы card
const cardFormValidator = new FormValidator(config, cardPopupForm);
cardFormValidator.enableValidation();

//слушатели

// profileForm.addEventListener("submit", handleProfileFormSubmit); //ввод name и job
// cardForm.addEventListener("submit", handleCardFormSubmit); //ввод signature и link
