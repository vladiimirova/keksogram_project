import {
  photosArr,
  messages,
  names,
  likes,
  comments,
  avatar,
  id,
  randomWords,
} from "./constants.js";
import { getRandomNumber, getRandomEl } from "./utils.js";
import { displayMiniatures } from "./miniature.js";
import { showBigPicture, closePicture } from "./full-size.js";
import { showImgForm, closeImgForm, doAllValidation } from "./form-check.js";
import { adjustImageSize } from "./image-scale.js";
import { updateSliderOptions, handleEffectChange } from "./image-effect.js";
import { loadImagePreview } from "./img-load.js";
import { handleFilterButtonClick } from "./img-filters.js";

const fileInput = document.querySelector("#upload-file");
const imgUploadCancel = document.querySelector(".img-upload__cancel");
const hashtagsInput = document.querySelector(".text__hashtags");
const commentsInput = document.querySelector(".text__description");
const imgUploadForm = document.querySelector(".img-upload__form");
const pictures = document.querySelector(".pictures");
const bigPicture = document.querySelector(".big-picture");
const closeButton = bigPicture.querySelector(".big-picture__cancel");
const controlSmaller = document.querySelector(".scale__control--smaller");
const controlBigger = document.querySelector(".scale__control--bigger");
const effectsContainer = document.querySelector(".img-upload__effects");
const uploadInput = document.querySelector(".img-upload__input");
const btnContainer = document.querySelector(".img-filters__form");

function getAvatar() {
  return `img/avatar-${getRandomNumber(avatar.min, avatar.max)}.svg`;
}

function generateComment() {
  return {
    id: getRandomNumber(id.min, id.max),
    avatar: getAvatar(),
    message: getRandomEl(messages),
    name: getRandomEl(names),
  };
}

function generateComments() {
  const commentsValue = getRandomNumber(comments.min, comments.max);
  return Array(commentsValue).fill(null).map(generateComment);
}

function generateDescription(arr) {
  const shuffled = arr.sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, 3).join(" ");
}

photosArr.forEach(function (_, i) {
  photosArr[i] = {
    id: i + 1,
    url: "photos/" + (i + 1) + ".jpg",
    description: generateDescription(randomWords),
    likes: getRandomNumber(likes.min, likes.max),
    comments: generateComments(),
  };
});

window.addEventListener("load", function () {
  displayMiniatures(photosArr);
});

pictures.addEventListener("click", function (e) {
  const id = +e.target.dataset.id;
  const selectedPhoto = photosArr.find(function (photo) {
    return photo.id === id;
  });
  if (selectedPhoto) {
    showBigPicture(selectedPhoto);
  }
});

closeButton.addEventListener("click", closePicture);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePicture();
  }
});

fileInput.addEventListener("change", function () {
  if (fileInput.files.length > 0) {
    showImgForm();
  }
});

imgUploadCancel.addEventListener("click", closeImgForm);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    if (
      document.activeElement !== hashtagsInput &&
      document.activeElement !== commentsInput
    ) {
      closeImgForm();
    }
  }
});

hashtagsInput.addEventListener("input", function () {
  hashtagsInput.setCustomValidity("");
});

commentsInput.addEventListener("input", function () {
  commentsInput.setCustomValidity("");
});

imgUploadForm.addEventListener("submit", doAllValidation);

controlSmaller.addEventListener("click", adjustImageSize);
controlBigger.addEventListener("click", adjustImageSize);

effectsContainer.addEventListener("change", handleEffectChange);

updateSliderOptions("none");

uploadInput.addEventListener("change", loadImagePreview);

btnContainer.addEventListener("click", function (e) {
  const clickedButton = e.target;

  if (clickedButton.classList.contains("img-filters__button")) {
    handleFilterButtonClick(clickedButton);
  }
});
