//добавление карт
const listContainer = document.querySelector(".elements"); // выбираем elements, куда будет вставляться template
const elementsCards = document.querySelector(".template-cards"); // выбираем нужный template
// открытие-закрытие popup
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
const popupWindow = document.querySelector(".popup_type_profile"); // попап профиля
const cardEditBtn = document.querySelector(".profile__add-btn"); // кнопка добавления новой карточки
const popupWindowCard = document.querySelector(".popup_type_card"); // попап карты
const popupWindowImage = document.querySelector(".popup_type_image"); // попап картинки

const popupCloseBtn = document.querySelector(".popup__close-btn");
const formElement = document.querySelector(".popup__container");
const nameInput = formElement.querySelector(".popup__text_input_name");
const jobInput = formElement.querySelector(".popup__text_input_job");
const profileName = document.querySelector(".profile__name");
const profileProfession = document.querySelector(".profile__profession");

// закрыть попап
function closePopupWindow() {
  popupWindow.classList.remove("popup_opened");
}
//ввод name и job
function formSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileProfession.textContent = jobInput.value;
  closePopupWindow();
}
//открыть попапы
function openModal(modalNode) {
  modalNode.classList.add("popup_opened");
}

// и вызов тогда будет такой
profileEditBtn.addEventListener("click", () => {
  nameInput.value = profileName.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  jobInput.value = profileProfession.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  openModal(popupWindow);
});
cardEditBtn.addEventListener("click", () => openModal(popupWindowCard));
popupCloseBtn.addEventListener("click", closePopupWindow); // закрыть popup profile
// popupWindow.addEventListener("click", closeOnOverlayClick); // закрыть popup на overlay
formElement.addEventListener("submit", formSubmitHandler); //ввод name и job

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

// Добавление карторчек
function addCards() {
  const cards = initialCards.map(getElement); // выполняем функцию для каждой пары (ключ, значение)
  listContainer.prepend(...cards); //добавляем карты в НАЧАЛО списка
}
function getElement(item) {
  const getElementsCards = elementsCards.content.cloneNode(true); // клонируем template со всем содержимым
  const title = getElementsCards.querySelector(".element__text");
  title.textContent = item.name; // добавляем имя карточки
  const picture = getElementsCards.querySelector(".element__picture");
  picture.src = item.link; // добавляем картинку для карточки
  picture.addEventListener("click", () => {
    const popupCardImage = document.querySelector(".popup__card-image");
    const popupCardName = document.querySelector(".popup__card-name");
    popupCardImage.src = item.link; // добавили нужную картинку для попапа
    popupCardName.textContent = item.name; // добавили нужную подпись для попапа
    openModal(popupWindowImage);
  });
  return getElementsCards;
}
addCards();
