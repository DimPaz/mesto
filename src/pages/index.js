import "../pages/index.css"; //только для webpack

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
// import { initialCards } from "../utils/initialCards.js";
import { FormValidator } from "../components/FormValidator.js";
import { config } from "../utils/utils.js";
import { Api } from "../components/Api.js";

// открыть popup
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
const avatarEditBtn = document.querySelector(".profile__avatar-btn"); // кнопка редактирования профиля
const cardEditBtn = document.querySelector(".profile__add-btn"); // кнопка добавления новой карточки
const editPopupForm = document.querySelector("#editPopupForm"); // форма профиля
const cardPopupForm = document.querySelector("#cardPopupForm"); // форма карт
const avatarPopupForm = document.querySelector("#avatarPopupForm"); // форма карт
//переменные ддя сабмита profile
const nameInput = document.querySelector(".popup__text_input_name");
const jobInput = document.querySelector(".popup__text_input_job");
const avatarInput = document.querySelector(".popup__text_input_avatar");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

//Authorization
const token = "6f79ceb2-8103-4527-9a78-1a1299add319";

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43", token);
//==================================================

//открыть попап аватар
avatarEditBtn.addEventListener("click", () => {
  controlUserInfo.getUserInfo(nameInput, jobInput, avatarInput);
  avatarFormValidator.resetErrors();
  popupAvatar.open();
});

const popupAvatar = new PopupWithForm({
  popupSelector: ".popup_type_avatar",
  handleFormSubmit: (data) => {
    controlUserInfo.setAvatar(data.link);
    popupAvatar.close();
  },
});

//==================================================

//открыть попап профиль
profileEditBtn.addEventListener("click", () => {
  controlUserInfo.getUserInfo(nameInput, jobInput, avatarInput);
  editFormValidator.resetErrors();
  popupProfile.open();
});

//имя и профессия с сервера
function userData(data) {
  profileName.textContent = data.name;
  profileProfession.textContent = data.about;
}

api
  .getUser()
  .then((data) => {
    // console.log(data);
    userData(data);
  })
  .catch((err) => {
    console.log(err);
  });

const controlUserInfo = new UserInfo({
  nameProfile: ".profile__name",
  professionProfile: ".profile__profession",
  avatarProfile: ".profile__avatar",
});

const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    api
      .addUserInfo(data.name, data.job)
      .then((data) => {
        controlUserInfo.setUserInfo(data.name, data.about);
      })
      .catch((err) => {
        console.log(err);
      });

    popupProfile.close();
  },
});

//==================================================
//открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => {
  cardFormValidator.resetErrors();
  popupCard.open();
});

// отрисовка карт с сервера
api
  .getCards()
  .then((cards) => {
    // console.log(cards)
    //отрисовка карт на странице
    const cardList = new Section({
      items: cards,
      renderItems: (item) => {
        const cardElemnt = creatingCardInstance(item);
        cardList.addCard(cardElemnt);
      },
      listContainer: ".elements",
    });
    cardList.renderer();
  })
  .catch((err) => {
    console.log(err);
  });

//добавление новых карт
const popupCard = new PopupWithForm({
  popupSelector: ".popup_type_card",
  handleFormSubmit: (item) => {
    addCardHandler(item);
  },
});
function addCardHandler(card) {
  api.addCard(card);
  // .then((res))
  // .catch((err) => console.log('Ошибка'))
}

// api.test() //Для проверки

//создание экземпляра карточки и генерация объекта
function creatingCardInstance(item) {
  const card = new Card(
    item,
    { template: ".template-cards" },
    handleCardClick,
    deleteCardHandler
  );
  return card.getView();
}

function deleteCardHandler(cardId) {
  api.deleteCard(cardId);
  // .then((res))
  // .catch((err) => console.log('Ошибка'))
}

//==================================================
// попап image
const popupImage = new PopupWithImage({
  popupSelector: ".popup_type_image",
  imageCardPopup: ".popup__card-image",
  nameCardPopup: ".popup__card-name",
});

function handleCardClick(name, link) {
  popupImage.open(name, link);
}

//==================================================
//добавление слушателей попапам
popupProfile.setEventListeners();
popupCard.setEventListeners();
popupImage.setEventListeners();
popupAvatar.setEventListeners();

//==================================================
//валидация формы profile
const editFormValidator = new FormValidator(config, editPopupForm);
editFormValidator.enableValidation();

//валидация формы card
const cardFormValidator = new FormValidator(config, cardPopupForm);
cardFormValidator.enableValidation();

//валидация формы avatar
const avatarFormValidator = new FormValidator(config, avatarPopupForm);
avatarFormValidator.enableValidation();
