export class Section {
  constructor({ items, listContainer }) {
    this._items = items;
    this._listContainer = document.querySelector(listContainer);
  }
  /**
   * создание карточек
   */
  renderer() {
    this._items.forEach((item) => {
      this._renderItems(item);
    });
  }

  /**
   * функция добавляем карты в начало списка из массива
   * @param {*} element
   */
  addCard(element) {
    this._listContainer.prepend(element);
  }
  /**
   * функция добавляем карты с сервера
   * @param {*} element
   */
  addCardServer(element) {
    this._listContainer.append(element);
  }
}
