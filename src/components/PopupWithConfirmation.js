import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor({ popupSelector }) {
    super(popupSelector);
    this._popupSelector = document.querySelector(popupSelector);
  }

  setEventListenersDelete() {
    super.setEventListeners();
  }

  // sabmitPopupDelete(){

  // }
}
