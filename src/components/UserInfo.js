export class UserInfo {
  constructor({ nameProfile, professionProfile }) {
    this._nameProfile = document.querySelector(nameProfile);
    this._professionProfile = document.querySelector(professionProfile);
  }

  /**
   * публичный метод возвращает объект с данными пользователя
   * @param {*} nameInput
   * @param {*} jobInput
   */
  getUserInfo(nameInput, jobInput) {
    nameInput.value = this._nameProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
    jobInput.value = this._professionProfile.textContent; //Если пользователь закрывает попап нажав на крестик, то введённые значения не сохраняются
  }

  /**
   * публичный метод принимает новые данные пользователя и добавляет их на страницу
   * @param {*} nameInput
   * @param {*} jobInput
   */
  setUserInfo(nameInput, jobInput) {
    this._nameProfile.textContent = nameInput;
    this._professionProfile.textContent = jobInput;
  }
}
