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

const pictures = document.querySelector(".pictures");
const fragment = document.createDocumentFragment();

generateAllMiniatures(photosArr).forEach((miniature) => {
  fragment.appendChild(miniature);
});

pictures.appendChild(fragment);

const pictureSection = document.querySelector(".pictures");

pictureSection.addEventListener("click", (e) => {
  const id = +e.target.dataset.id;
  const selectedPhoto = photosArr.find((photo) => photo.id === id);
  if (selectedPhoto) {
    showBigPicture(selectedPhoto);
  }
});

const bigPicture = document.querySelector(".big-picture");

const closeButton = bigPicture.querySelector(".big-picture__cancel");
closeButton.addEventListener("click", (e) => {
  closePicture();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePicture();
  }
});
