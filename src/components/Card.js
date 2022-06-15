export class Card {
  constructor(
    title,
    { template },
    clickImagePopup,
    deleteClickHandler,
    openPopupDeleteCard,
    userId
  ) {
    this._name = title.name;
    this._link = title.link;
    this._cardId = title._id;
    this.userCard_id = title.owner._id;
    this._tamplate = document.querySelector(template);
    this._clickImagePopup = clickImagePopup;
    this._deleteClickHandler = deleteClickHandler;
    this._openPopupDeleteCard = openPopupDeleteCard;
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
   * приватный метод like карточки
   */
  _likeCard() {
    this._view
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
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
        // this._deleteClickHandler(this._cardId); // удаление карты
      });
    // like карточки, запуск слушателя
    this._view.querySelector(".element__like").addEventListener("click", () => {
      this._likeCard();
    });

    // открыть попап image, запуск слушателя
    this._picture.addEventListener("click", () => {
      this._clickImagePopup(this._name, this._link);
    });

    return this._view;
  }
}
