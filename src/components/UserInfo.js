export class UserInfo {
  constructor({ nameProfile, professionProfile, avatarProfile }) {
    this._nameProfile = document.querySelector(nameProfile);
    this._professionProfile = document.querySelector(professionProfile);
    this._avatarProfile = document.querySelector(avatarProfile);
  }

  /**
   * публичный метод возвращает объект с данными пользователя
   * @param {*} name
   * @param {*} about
   */
  getUserInfo(name, about) {
    name.value = this._nameProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
    about.value = this._professionProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  }

  /**
   * публичный метод принимает новые данные пользователя и добавляет их на страницу
   * @param {*} name
   * @param {*} about
   */
  setUserInfo(name, about) {
    this._nameProfile.textContent = name;
    this._professionProfile.textContent = about;
  }

  setAvatar(avatar) {
    this._avatarProfile.src = avatar;
  }
}
