import "../pages/index.css"; //только для webpack

import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";
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
const profileAvatar = document.querySelector(".profile__avatar");

//Authorization
const token = "6f79ceb2-8103-4527-9a78-1a1299add319";

const api = new Api("https://mesto.nomoreparties.co/v1/cohort-43", token);
//==================================================

let userId;

api.getAllData().then(([data, user]) => {
  //добавление данных пользователя с сервера
  profileName.textContent = user.name;
  profileProfession.textContent = user.about;
  profileAvatar.src = user.avatar;
  userId = user._id;

  //добавление карт с сервера
  data.forEach((item) => {
    const cardElemnt = creatingCardInstance(item);
    cardList.addCardServer(cardElemnt);
  });
});

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
    api
      .addAvatar(data.link)
      .then((data) => {
        controlUserInfo.setAvatar(data.avatar);
      })
      .catch((err) => {
        console.log(err);
      });

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

//
const popupProfile = new PopupWithForm({
  popupSelector: ".popup_type_profile",
  handleFormSubmit: (data) => {
    handleProfileFormSubmit(data);
  },
});

const controlUserInfo = new UserInfo({
  nameProfile: ".profile__name",
  professionProfile: ".profile__profession",
  avatarProfile: ".profile__avatar",
});

// обрабатыватываем отправку формы профиля
function handleProfileFormSubmit(data) {
  api
    .addUserInfo(data.name, data.job)
    .then((data) => {
      controlUserInfo.setUserInfo(data.name, data.about);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

//==================================================

//отрисовка карт на странице
const cardList = new Section({
  items: [],
  renderItems: (item) => {
    const cardElemnt = creatingCardInstance(item);
    cardList.addCard(cardElemnt);
  },
  listContainer: ".elements",
});

//открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => {
  cardFormValidator.resetErrors();
  popupCard.open();
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
}

//создание экземпляра карточки и генерация объекта
function creatingCardInstance(item) {
  const card = new Card(
    item,
    { template: ".template-cards" },
    handleCardClick,
    deleteCardHandler,
    openPopupDeleteCard,
    handelLikeClick,
    userId
  );

  function handelLikeClick(likeId) {
    if (card.isLiked()) {
      api
        .deleteLike(likeId)
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .addLike(likeId)
        .then((res) => {
          card.setLikes(res.likes);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  return card.getView();
}

//открытие попапа delete
function openPopupDeleteCard(cardId) {
  popupDelete.open();
  popupDelete.setSubmitAction(() => {
    deleteCardHandler(cardId);
  });
}

const popupDelete = new PopupWithConfirmation({
  popupSelector: ".popup_type_delete",
});

function deleteCardHandler(cardId) {
  api.deleteCard(cardId);
  popupDelete.close();
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
popupDelete.setEventListenersDelete();

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
