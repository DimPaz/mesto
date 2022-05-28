import { listContainer } from "./utils.js";

export class Section {
  constructor({ items, renderer }, selector) {
    this._items = items;
    this._renderer = renderer;
    this._selector = selector;
  }
  //создание карточек
  renderer() {
    this._items.forEach((item) => {
      this._addCards(this._renderer(item));
    });
  }
  //функция добавляем карты в начало списка из массива
  _addCards(element) {
    listContainer.append(element);
  }
}
