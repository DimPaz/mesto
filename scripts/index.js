const profileEditBtn = document.querySelector(".profile__edit-btn");
const popupWindow = document.querySelector(".popup");
const popupCloseBtn = popupWindow.querySelector(".popup__close-btn");

// открытие popup
function openPopupWindow() {
  popupWindow.classList.add("popup_opened");
}
profileEditBtn.addEventListener("click", openPopupWindow);

// закрытие popup
function closePopupWindow() {
  popupWindow.classList.remove("popup_opened");
}
popupCloseBtn.addEventListener("click", closePopupWindow);
