import { Popup } from "./Popup.js";

export class UserInfo extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupSelector = popupSelector;
  }

  getUserInfo() {
    console.log("возвращает объект с данными пользователя");
  }

  setUserInfo() {
    console.log(
      "принимает новые данные пользователя и добавляет их на страницу"
    );
  }
  //   close() {
  //     console.log("добавить сброс формы");
  //   }
}
