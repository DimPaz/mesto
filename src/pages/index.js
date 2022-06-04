import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import { initialCards } from "../components/initialCards.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  config,
  imagePopup,
  imageCardPopup,
  nameCardPopup,
} from "../components/utils.js";

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
//переменные ддя сабмита profile
const profileForm = document.querySelector(".popup_type_profile");
const nameInput = profileForm.querySelector(".popup__text_input_name");
const jobInput = profileForm.querySelector(".popup__text_input_job");
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");

console.log('Hello World');
//==================================================
//открыть попап профиль
profileEditBtn.addEventListener("click", () => {
  controlUserInfo.getUserInfo(nameInput, jobInput);
  editFormValidator.resetErrors();
  popupProfile.open();
});

const popupProfile = new PopupWithForm(profilePopup, {
  handleFormSubmit: () => {
    controlUserInfo.setUserInfo(nameInput, jobInput);
    popupProfile.close();
  },
});

const controlUserInfo = new UserInfo(nameProfile, professionProfile);

//==================================================
//открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => {
  cardFormValidator.resetErrors();
  popupCard.open();
});

//добавление новых карт
const popupCard = new PopupWithForm(cardPopup, {
  handleFormSubmit: (item) => {
    creatingCardInstance(item);
  },
});

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

//==================================================
// попап image
const popupImage = new PopupWithImage(
  imagePopup,
  imageCardPopup,
  nameCardPopup
);

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

//==================================================
//добавление слушателей попапам
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();

//==================================================
//валидация формы profile
const editFormValidator = new FormValidator(config, editPopupForm);
editFormValidator.enableValidation();

//валидация формы card
const cardFormValidator = new FormValidator(config, cardPopupForm);
cardFormValidator.enableValidation();
