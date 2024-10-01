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
import { generateAllMiniatures } from "./miniature.js";
import { showBigPicture, closePicture } from "./full-size.js";
import { showImgForm, closeImgForm, doAllValidation } from "./form-check.js";

const fileInput = document.querySelector('#upload-file');
const imgUploadCancel = document.querySelector('.img-upload__cancel');
const hashtagsInput = document.querySelector('.text__hashtags'); 
const commentsInput = document.querySelector('.text__description');
const imgUploadForm = document.querySelector('.img-upload__form');
const pictures = document.querySelector(".pictures");
const bigPicture = document.querySelector(".big-picture");

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
  const shuffled = arr.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3).join(" ");
}

photosArr.forEach((_, i) => {
  photosArr[i] = {
    id: i + 1,
    url: "photos/" + (i + 1) + ".jpg",
    description: generateDescription(randomWords),
    likes: getRandomNumber(likes.min, likes.max),
    comments: generateComments(),
  };
});

console.log(JSON.stringify(photosArr, null, 2));

const fragment = document.createDocumentFragment();
generateAllMiniatures(photosArr).forEach((miniature) => {
  fragment.appendChild(miniature);
});
pictures.appendChild(fragment);

pictures.addEventListener("click", (e) => {
  const id = +e.target.dataset.id;
  const selectedPhoto = photosArr.find((photo) => photo.id === id);
  if (selectedPhoto) {
    showBigPicture(selectedPhoto);
  }
});

const closeButton = bigPicture.querySelector(".big-picture__cancel");
closeButton.addEventListener("click", closePicture);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePicture();
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
      showImgForm();  
  }
});

imgUploadCancel.addEventListener("click", closeImgForm);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (document.activeElement !== hashtagsInput && document.activeElement !== commentsInput) {
      closeImgForm(); 
    }
  }
});

hashtagsInput.addEventListener('input', () => {
  hashtagsInput.setCustomValidity('');
});

commentsInput.addEventListener('input', () => {
  commentsInput.setCustomValidity('');
});

imgUploadForm.addEventListener('submit', doAllValidation);

