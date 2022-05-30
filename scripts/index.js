import { Card } from "./Card.js";
import { Section } from "./Section.js";
import { Popup } from "./Popup.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { initialCards } from "./initialCards.js";
import { FormValidator } from "./FormValidator.js";
import {
  config,
  imagePopup,
  listContainer,
  imageCardPopup,
  nameCardPopup,
} from "./utils.js";

//добавление карт
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

//========================================

const cardOpenWindow = new PopupWithForm(cardPopup);
const popupCard = new Popup(cardPopup);

//========================================

const imageOpenWindow = new PopupWithImage(
  imagePopup,
  imageCardPopup,
  nameCardPopup
);
export function handleImageClick(name, link) {
  imageOpenWindow.open(name, link);
}

//========================================

const popupProfile = new Popup(profilePopup);

//========================================

// отрисовка карт на странице
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      //создание экземпляра карточки и генерация объекта
      const card = new Card(item, elementCard);
      return card.getView();
    },
  },
  elementCard
);

cardList.renderer();

//========================================

//функция ввод signature и link
function handleCardFormSubmit(event) {
  event.preventDefault();
  const newCard = {
    name: signatureInput.value,
    link: imageInput.value,
  };
  listContainer.prepend(renderer(newCard)); //добавляем карту в начало списка из попапа
  cardFormInput.reset(); //обнуление значений в инпуте название и ссылка на картинку
  popupCard.close();
}

//функция ввод name и job
function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  popupProfile.close();
}

//открыть попап профиль
profileEditBtn.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  jobInput.value = professionProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  editFormValidator.resetErrors();
  popupProfile.open();
});

//открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => {
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

profileForm.addEventListener("submit", handleProfileFormSubmit); //ввод name и job
cardForm.addEventListener("submit", handleCardFormSubmit); //ввод signature и link
