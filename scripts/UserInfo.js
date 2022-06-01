// import { Popup } from "./Popup.js";

export class UserInfo {
  constructor(nameProfile, professionProfile) {
    this._nameProfile = nameProfile;
    this._professionProfile = professionProfile;
  }

  //публичный метод возвращает объект с данными пользователя
  getUserInfo(nameInput, jobInput) {
    nameInput.value = this._nameProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
    jobInput.value = this._professionProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  }

  //публичный метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(nameInput, jobInput) {
    this._nameProfile.textContent = nameInput.value;
    this._professionProfile.textContent = jobInput.value;
  }
}
