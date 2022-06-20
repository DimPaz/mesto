export class Card {
  constructor(
    title,
    { template },
    clickImagePopup,
    openPopupDeleteCard,
    handelLikeClick,
    userId
  ) {
    this._name = title.name;
    this._link = title.link;
    this._cardId = title._id;
    this.userCard_id = title.owner._id;
    this.userLike = title.likes;
    this._tamplate = document.querySelector(template);
    this._clickImagePopup = clickImagePopup;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._handelLikeClick = handelLikeClick;
    this._userId = userId;
  }

  /**
   * приватный метод удаления карточки
   */
  deleteCard() {
    this._view.remove();
    this._view = null;
  }

  /**
   * проверка наличия лайка
   */
  isLiked() {
    return this.userLike.find((user) => user._id === this._userId);
  }
  setLikes(arrayLike) {
    this.userLike = arrayLike;
    //like карточки
    if (this.isLiked()) {
      this._likeButton.classList.add("element__like_active");
    } else {
      this._likeButton.classList.remove("element__like_active");
    }
    // счетчик лайков
    this._countLike.textContent = this.userLike.length;
  }

  //добавление корзинки на мои карточки
  _addDeleteButton() {
    if (this.userCard_id === this._userId) {
      this._deleteButton.classList.add("element__trash_visible");
    }
  }

  _setEventListeners() {
    // удаление карточек, запуск слушателя
    this._deleteButton.addEventListener("click", () => {
      this._openPopupDeleteCard(this._cardId);
    });

    // like карточки, запуск слушателя
    this._likeButton.addEventListener("click", () => {
      this._handelLikeClick(this._cardId);
    });
    this.setLikes(this.userLike);

    // открыть попап image, запуск слушателя
    this._picture.addEventListener("click", () => {
      this._clickImagePopup(this._name, this._link);
    });
  }

  /**
   * публичный метод формируем template
   * @returns this._view
   */
  generateCard() {
    this._view = this._tamplate.content
      .cloneNode(true)
      .querySelector(".element"); // клонируем template со всем содержимым
    this._picture = this._view.querySelector(".element__picture");
    this._inputList = this._view.querySelector(".element__text");
    this._likeButton = this._view.querySelector(".element__like");
    this._deleteButton = this._view.querySelector(".element__trash");
    this._countLike = this._view.querySelector(".element__count");

    this._picture.src = this._link; // добавляем картинку для карточки
    this._picture.alt = this._name; // добавляем alt для карточки
    this._inputList.textContent = this._name; // добавляем имя карточки

    this._addDeleteButton();
    this._setEventListeners();
    return this._view;
  }
}
