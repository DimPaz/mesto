//добавление карт
const listContainer = document.querySelector(".elements"); // выбираем elements, куда будет вставляться template
const elementsCards = document.querySelector(".template-cards"); // выбираем нужный template
// открыть popup
const profileEditBtn = document.querySelector(".profile__edit-btn"); // кнопка редактирования профиля
const cardEditBtn = document.querySelector(".profile__add-btn"); // кнопка добавления новой карточки
const profilePopup = document.querySelector(".popup_type_profile"); // попап профиля
const cardPopup = document.querySelector(".popup_type_card"); // попап карты
const imagePopup = document.querySelector(".popup_type_image"); // попап картинки
const imageCardPopup = document.querySelector(".popup__card-image"); // картинка в попапе
const nameCardPopup = document.querySelector(".popup__card-name"); // наименование в попапе
// закрыть popup
const profileCloseBtn = document.querySelector(
  ".popup__close-btn_type_profile"
); // кнопка попап profile
const cardCloseBtn = document.querySelector(".popup__close-btn_type_card"); // кнопка попап card
const imageCloseBtn = document.querySelector(".popup__close-btn_type_image"); // кнопка попап image
const OnOverlayBtn = document.querySelectorAll(".popup__container"); // область overlay попап
//переменные ддя сабмита profile
const profileForm = document.querySelector(".popup_type_profile");
const nameInput = profileForm.querySelector(".popup__text_input_name");
const jobInput = profileForm.querySelector(".popup__text_input_job");
const nameProfile = document.querySelector(".profile__name");
const professionProfile = document.querySelector(".profile__profession");
//переменные ддя сабмита card
const cardForm = document.querySelector(".popup_type_card");
const signatureInput = cardForm.querySelector(".popup__text_input_signature");
const imageInput = cardForm.querySelector(".popup__text_input_image");
//массив для создания стартовых карточек
const initialCards = [
  {
    name: "Ергаки",
    link: "https://images.unsplash.com/photo-1594539364250-81a8bcb51531?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=999&q=80",
  },
  {
    name: "Эсто-Садок",
    link: "https://images.unsplash.com/photo-1612274059446-5c480106b1cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    name: "Тункинский парк",
    link: "https://images.unsplash.com/photo-1445299329339-8b8f48ab53b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Чуйский тракт",
    link: "https://images.unsplash.com/photo-1634876371588-d38b1c44271c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80",
  },
  {
    name: "Золотая Долина",
    link: "https://images.unsplash.com/photo-1608661649288-d4a3e7ec4838?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
  },
  {
    name: "Мутно́вская сопка",
    link: "https://images.unsplash.com/photo-1610575860170-28799a092c39?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1331&q=80",
  },
];

//создание карточек
function initialAddCards() {
  const cards = initialCards.map(getElement); // выполняем функцию для каждой пары (ключ, значение)
  addCards(cards);
}

//функция добавляем карты в начало списка из массива
function addCards(element) {
  listContainer.prepend(...element);
}

// функция формируем template
function getElement(item) {
  const cardElement = elementsCards.content.cloneNode(true); // клонируем template со всем содержимым
  const title = cardElement.querySelector(".element__text");
  title.textContent = item.name; // добавляем имя карточки
  const picture = cardElement.querySelector(".element__picture");
  picture.src = item.link; // добавляем картинку для карточки
  picture.alt = item.name; // добавляем alt для карточки

  // открыть попап image
  picture.addEventListener("click", () => {
    imageCardPopup.src = item.link; // добавили нужную картинку для попапа
    imageCardPopup.alt = picture.alt; // добавили alt для картинки попапа
    nameCardPopup.textContent = item.name; // добавили нужную подпись для попапа
    openModal(imagePopup);
  });

  // удаление карточек, запуск слушателя
  const trashButton = cardElement.querySelector(".element__trash");
  trashButton.addEventListener("click", deleteCard);

  // like карточки, запуск слушателя
  const elementLike = cardElement.querySelector(".element__like");
  elementLike.addEventListener("click", likeCard);

  return cardElement;
}

initialAddCards();

//функция ввод signature и link
function handleCardFormSubmit(event) {
  event.preventDefault();
  const newCard = {
    name: signatureInput.value,
    link: imageInput.value,
  };
  const addPopupCard = getElement(newCard);
  listContainer.prepend(addPopupCard); //добавляем карту в начало списка из попапа
  document.getElementById("cardPopupForm").reset(); //обнуление значений в инпуте название и ссылка на картинку
  closePopupWindow();
}

//функция ввод name и job
function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  professionProfile.textContent = jobInput.value;
  closePopupWindow();
}

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

//функция открыть попапы
function openModal(modalNode) {
  modalNode.classList.add("popup_opened");
}

//функция закрыть попапы
function closePopupWindow() {
  const openedPopup = document.querySelector(".popup_opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_opened");
  }
}

// закрыть попапы на overLay
OnOverlayBtn.forEach((elem) => {
  elem.addEventListener("mousedown", (event) => {
    if (event.target === event.currentTarget) {
      closePopupWindow();
    }
  });
});

// закрыть попапы на esc
document.addEventListener("keydown", function (evt) {
  if (evt.key === "Escape") {
    closePopupWindow();
  }
});

//открыть попап профиль
profileEditBtn.addEventListener("click", () => {
  nameInput.value = nameProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  jobInput.value = professionProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  clearInputError();
  openModal(profilePopup);
});

//открыть попап добавление карточек
cardEditBtn.addEventListener("click", () => {
  clearInputError();
  openModal(cardPopup);
});

//функция скрыть ошибки при открытии попапа
function clearInputError() {
  const styleInputError = Array.from(
    document.querySelectorAll(".form__input_type_error")
  );
  styleInputError.forEach((styleError) => {
    styleError.classList.remove(config.markErrorClass); // Скрываем красную линию ошибки при открытии
  });
  const textInputError = Array.from(
    document.querySelectorAll(".form__input-error")
  );
  textInputError.forEach((textError) => {
    textError.textContent = ""; // Скрываем текст ошибки при открытии
  });
}

//слушатели
profileCloseBtn.addEventListener("click", closePopupWindow); // закрыть popup profile
cardCloseBtn.addEventListener("click", closePopupWindow); // закрыть popup Card
imageCloseBtn.addEventListener("click", closePopupWindow); // закрыть popup Image
profileForm.addEventListener("submit", handleProfileFormSubmit); //ввод name и job
cardForm.addEventListener("submit", handleCardFormSubmit); //ввод signature и link
