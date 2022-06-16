export class Card {
  constructor(
    title,
    { template },
    clickImagePopup,
    deleteClickHandler,
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
    this._deleteClickHandler = deleteClickHandler;
    this._openPopupDeleteCard = openPopupDeleteCard;
    this._handelLikeClick = handelLikeClick;
    this._userId = userId;
  }

  /**
   * приватный метод удаления карточки
   */
  // _deleteCard() {
  //   this._view.remove();
  //   this._view = null;
  // }

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
      this._view
        .querySelector(".element__like")
        .classList.add("element__like_active");
    } else {
      this._view
        .querySelector(".element__like")
        .classList.remove("element__like_active");
    }
    // счетчик лайков
    this._countLike = this._view.querySelector(".element__count");
    this._countLike.textContent = this.userLike.length;
  }

  /**
   * публичный метод формируем template
   * @returns this._view
   */
  getView() {
    this._view = this._tamplate.content
      .cloneNode(true)
      .querySelector(".element"); // клонируем template со всем содержимым
    this._picture = this._view.querySelector(".element__picture");
    this._picture.src = this._link; // добавляем картинку для карточки
    this._picture.alt = this._name; // добавляем alt для карточки
    this._view.querySelector(".element__text").textContent = this._name; // добавляем имя карточки

    //добавление корзинки на мои карточки
    this._cardDelete = this._view.querySelector(".element__trash");
    if (this.userCard_id === this._userId) {
      this._cardDelete.classList.add("element__trash_visible");
    }

    // удаление карточек, запуск слушателя
    this._view
      .querySelector(".element__trash")
      .addEventListener("click", () => {
        this._openPopupDeleteCard(this._cardId);
      });

    // like карточки, запуск слушателя
    this._view.querySelector(".element__like").addEventListener("click", () => {
      this._handelLikeClick(this._cardId);
      // this._likeCard();
    });
    this.setLikes(this.userLike);

    // открыть попап image, запуск слушателя
    this._picture.addEventListener("click", () => {
      this._clickImagePopup(this._name, this._link);
    });

    return this._view;
  }
}
