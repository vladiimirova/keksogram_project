import { getRandomEl } from "./utils.js";

const bigPicture = document.querySelector(".big-picture");
const bigPictureImg = bigPicture.querySelector(".big-picture__img img");

function updateInf(photo) {
  bigPictureImg.src = photo.url;
  bigPicture.querySelector(".likes-count").innerText = photo.likes;
  bigPicture.querySelector(".social__caption").innerText = photo.description;

  const randomComment = getRandomEl(photo.comments);
  bigPicture.querySelector(".social__picture").src = randomComment.avatar;

  const totalComments = photo.comments.length;
  bigPicture.querySelector(".comments-count").innerText = totalComments;

  addComments(photo, 5);
}

export function showBigPicture(photo) {
  bigPicture.classList.remove("hidden");
  updateInf(photo);
  document.body.classList.add("modal-open");
}

function displayComments(comments, number) {
  const commentsContainer = bigPicture.querySelector(".social__comments");
  commentsContainer.innerHTML = "";

  comments.slice(0, number).forEach((comment) => {
    const commentElement = document.createElement("li");
    commentElement.classList.add("social__comment");

    commentElement.innerHTML = `
      <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
      <p class="social__text">${comment.message}</p>
    `;

    commentsContainer.appendChild(commentElement);
  });
}

function updateCommentCount(totalComments, loadedComments) {
  const commentCountElement = bigPicture.querySelector(".social__comment-count");

  if (totalComments <= 5 || loadedComments >= totalComments) {
    commentCountElement.classList.add("hidden");
  } else {
    commentCountElement.classList.remove("hidden");
    commentCountElement.innerHTML = `${loadedComments} из <span class="comments-count">${totalComments}</span> комментариев`;
  }
}

function addComments(photo, number) {
  const totalComments = photo.comments.length;

  displayComments(photo.comments, number);
  
  updateCommentCount(totalComments, number);

  const loadComments = bigPicture.querySelector(".social__comments-loader");

  if (number < totalComments) {
    loadComments.classList.remove("hidden");
    loadComments.dataset.currentCount = number;

    loadComments.onclick = () => {
      const currentCount = +loadComments.dataset.currentCount;
      const newCount = Math.min(currentCount + 5, totalComments);
      addComments(photo, newCount);
      loadComments.dataset.currentCount = newCount;

      if (newCount >= totalComments) {
        loadComments.classList.add("hidden");
      }
    };
  } else {
    loadComments.classList.add("hidden");
  }
}

export function closePicture() {
  bigPicture.classList.add("hidden");
  document.body.classList.remove("modal-open");
}
