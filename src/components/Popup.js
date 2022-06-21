export class Popup {
  constructor({ popupSelector }) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }
  /**
   * функция открыть попапы
   */
  open() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  /**
   * функция закрыть попапы
   */
  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  /**
   * закрыть попапы на кнопку
   */
  setEventListeners() {
    this._popup
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => {
        this.close();
      });
    // закрыть попапы на overLay
    this._popup
      .querySelector(".popup__container")
      .addEventListener("mousedown", (event) => {
        if (event.target === event.currentTarget) {
          this.close();
        }
      });
  }
  /**
   * закрыть попапы на esc
   * @param {*} evt
   */
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
}
