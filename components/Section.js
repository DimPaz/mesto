export class Section {
  constructor({ items, renderItems }, listContainer) {
    this._items = items;
    this._renderItems = renderItems;
    this._listContainer = listContainer;
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
  addCards(element) {
    this._listContainer.prepend(element);
  }
}
