const profileEditBtn = document.querySelector(".profile__edit-btn");
const popupWindow = document.querySelector(".popup");
const popupCloseBtn = popupWindow.querySelector(".popup__close-btn");

function openPopupWindow() {
  popupWindow.classList.add("popup_opened");
}

profileEditBtn.addEventListener("click", openPopupWindow);

console.log(document.querySelector(".popup_opened"));
console.log("dfdfderrer");
