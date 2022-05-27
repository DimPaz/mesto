import { Card } from "./Card.js";

export class Section {
  constructor(items, selector) {
    this._items = items;
    this._selector = selector;
  }

  //создание карточек
  renderer() {
    this._items.forEach((item) => {
        console.log(this._createСard(item));
      this._addCards(this._createСard(item));
    });
  }
  //создание экземпляра карточки и генерация объекта
  _createСard(item) {
    const card = new Card(item, this._selector);
    return card.getView();
  }
  //функция добавляем карты в начало списка из массива
  _addCards() {
    document.querySelector(".elements").append(this._selector);
  }
}
