export class Section {
  constructor({ items, renderItems }, listContainer) {
    this._items = items;
    this._renderItems = renderItems;
    this._listContainer = listContainer;
  }
  //создание карточек
  renderer() {
    this._items.forEach((item) => {
      this._renderItems(item);
      // this.addCards(this._renderer(item));
    });
  }
  //функция добавляем карты в начало списка из массива
  addCards(element) {
    // console.log(this._listContainer);
    this._listContainer.prepend(element);
  }
}
