import { displayMiniatures } from "./miniature.js";
import { photosArr } from "./constants.js";
import { getRandomNumber } from "./utils.js";
import { maxRandomPhotos } from "./constants.js";

const filterButtons = document.querySelectorAll('.img-filters__button');
const imgFilters = document.querySelector(".img-filters");
imgFilters.classList.remove("img-filters--inactive");

function showRandom() {
  const count = Math.min(maxRandomPhotos, photosArr.length);
  const randomPhotos = getRandomPhotos(photosArr, count);
  displayMiniatures(randomPhotos);
}

function showDiscussed() {
  const discussedPhotos = [...photosArr].sort(function(a, b) {
    return b.comments.length - a.comments.length;
  });
  displayMiniatures(discussedPhotos);
}

function getRandomPhotos(arr, count) {
  const shuffled = arr.slice();
  const randomPhotos = [];

  for (let i = 0; i < count; i++) {
    if (shuffled.length === 0) break;

    const randomIndex = getRandomNumber(0, shuffled.length - 1);
    randomPhotos.push(shuffled[randomIndex]);
    shuffled.splice(randomIndex, 1);
  }

  return randomPhotos;
}

export function setActiveButton(activeButton) {
  filterButtons.forEach(function(button) {
    if (button === activeButton) {
      button.classList.add('img-filters__button--active');
    } else {
      button.classList.remove('img-filters__button--active');
    }
  });
}

function debounce(func, delay) {
  let timer;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  };
}

const debouncedDisplayMiniatures = debounce(function() {
  displayMiniatures(photosArr);
}, 500);

const debouncedShowRandom = debounce(function() {
  showRandom();
}, 500);

const debouncedShowDiscussed = debounce(function() {
  showDiscussed();
}, 500);

export function handleFilterButtonClick(clickedButton) {
  setActiveButton(clickedButton);

  if (clickedButton.id === 'filter-default') {
    debouncedDisplayMiniatures();
  } else if (clickedButton.id === 'filter-random') {
    debouncedShowRandom();
  } else if (clickedButton.id === 'filter-discussed') {
    debouncedShowDiscussed();
  }
}
