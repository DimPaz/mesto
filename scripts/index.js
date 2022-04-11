//добавление карт
const listContainer = document.querySelector(".elements"); // выбираем elements, куда будет вставляться template
const elementsCards = document.querySelector(".template-cards"); // выбираем нужный template
// открыть popup
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
const popupWindow = document.querySelector(".popup_type_profile"); // попап профиля
const cardEditBtn = document.querySelector(".profile__add-btn"); // кнопка добавления новой карточки
const popupWindowCard = document.querySelector(".popup_type_card"); // попап карты
const popupWindowImage = document.querySelector(".popup_type_image"); // попап картинки
// закрыть popup
const popupCloseBtn = document.querySelector(".popup__close-btn_type_profile"); // кнопка попап profile
const popupCloseBtnCard = document.querySelector(".popup__close-btn_type_card"); // кнопка попап card
const popupCloseBtnImage = document.querySelector(
  ".popup__close-btn_type_image"
); // кнопка попап image

const formElement = document.querySelector(".popup_type_profile"); //для сабмита profile
const formElementСard = document.querySelector(".popup_type_card"); //для сабмита card
const nameInput = formElement.querySelector(".popup__text_input_name");
const jobInput = formElement.querySelector(".popup__text_input_job");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

// закрыть попап
function closePopupWindow() {
  document.querySelector(".popup_opened").classList.remove("popup_opened");
}

//ввод name и job
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopupWindow();
}

popupCloseBtn.addEventListener("click", closePopupWindow); // закрыть popup profile
popupCloseBtnCard.addEventListener("click", closePopupWindow); // закрыть popup Card
popupCloseBtnImage.addEventListener("click", closePopupWindow); // закрыть popup Image
// popupWindow.addEventListener("click", closeOnOverlayClick); // закрыть popup на overlay
formElement.addEventListener("submit", formSubmitHandler); //ввод name и job
formElementСard.addEventListener("submit", formSubmitHandlerCard); //ввод signature и link

//открыть попапы
function openModal(modalNode) {
  modalNode.classList.add("popup_opened");
}

// открыть попап профиль
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  jobInput.value = profileProfession.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  openModal(popupWindow);
});
// открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => openModal(popupWindowCard));

// закрыть popup на overlay
// function closeOnOverlayClick(event) {
// console.log("Event.target", event.target); // самый глубокий элемент, на котором произошло событие.
// console.log("Event.carrentTarget", event.currentTarget); // элемент, на котором в данный момент сработал обработчик (до которого «доплыло» событие)
// if (event.target === event.currentTarget) {
//     closePopupWindow();
//   }
// }

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Создание карторчек при открытии страницы
function addCards() {
  const cards = initialCards.map(getElement); // выполняем функцию для каждой пары (ключ, значение)
  listContainer.prepend(...cards); //добавляем карты в НАЧАЛО списка
}
function getElement(item) {
  console.log(item);
  const getElementsCards = elementsCards.content.cloneNode(true); // клонируем template со всем содержимым
  const title = getElementsCards.querySelector(".element__text");
  title.textContent = item.name; // добавляем имя карточки
  const picture = getElementsCards.querySelector(".element__picture");
  picture.src = item.link; // добавляем картинку для карточки
  // открыть попап image
  picture.addEventListener("click", () => {
    const popupCardImage = document.querySelector(".popup__card-image");
    const popupCardName = document.querySelector(".popup__card-name");
    popupCardImage.src = item.link; // добавили нужную картинку для попапа
    popupCardName.textContent = item.name; // добавили нужную подпись для попапа
    openModal(popupWindowImage);
  });

  // удаление карточек, запуск слушителя
  const trashButton = getElementsCards.querySelector(".element__trash");
  trashButton.addEventListener("click", deleteCard);

  // like карточки, запуск слушителя
  const elementLike = getElementsCards.querySelector(".element__like");
  elementLike.addEventListener("click", likeCard);

  return getElementsCards;
}
addCards();

const signatureInput = formElementСard.querySelector(
  ".popup__text_input_signature"
);
const imageInput = formElementСard.querySelector(".popup__text_input_image");

//ввод signature и link========================================================
function formSubmitHandlerCard(event) {
  event.preventDefault();
  let initialNewCard = [
    {
      name: signatureInput.value,
      link: imageInput.value,
    },
  ];
  const addNewCard = initialNewCard.map(getElement);
  listContainer.prepend(addNewCard);
  closePopupWindow();
}
//=============================================================================
//функция удаления карточки
function deleteCard(evt) {
  // console.log(evt);
  // console.log(evt.target);
  const deleteCardItem = evt.target.closest(".element");
  deleteCardItem.remove();
}
//функция like карточки
function likeCard(evt) {
  evt.target.classList.toggle("element__like_active");
}
