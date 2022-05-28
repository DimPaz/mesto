export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  //функция открыть попапы
  open() {
    this._popupSelector.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose.bind(this));
    this._closeOnOverlay();
    this._setEventListeners();
  }

  //функция закрыть попапы
  close() {
    this._popupSelector.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose.bind(this));
  }

  // закрыть конкретный попап на esc
  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }
  _setEventListeners() {
    this._popupSelector
      .querySelector(".popup__close-btn")
      .addEventListener("click", () => {
        // close(imagePopup);
        this.close();
      });
  }
  // закрыть попапы на overLay
  _closeOnOverlay() {
    this._popupSelector
      .querySelector(".popup__container")
      .addEventListener("mousedown", (event) => {
        if (event.target === event.currentTarget) {
          this.close();
        }
      });
  }
}
