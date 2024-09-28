const bigPicture = document.querySelector(".big-picture");
const bigPictureImg = bigPicture.querySelector(".big-picture__img img");

function updateInf(photo) {
  bigPictureImg.src = photo.url;
  bigPicture.querySelector(".likes-count").innerText = photo.likes;
  bigPicture.querySelector(".social__caption").innerText = photo.description;
  bigPicture.querySelector(".social__picture").src = photo.comments[0].avatar;

  const totalComments = photo.comments.length;
  bigPicture.querySelector(".comments-count").innerText = totalComments;
  bigPicture.querySelector(".social__comment-count").classList.add("hidden");

  addComments(photo);
}

export function showBigPicture(photo) {
  bigPicture.classList.remove("hidden");
  updateInf(photo);
  document.body.classList.add("modal-open");
}

function addComments(photo) {
  const commentsContainer = bigPicture.querySelector(".social__comments");
  commentsContainer.innerHTML = "";

  photo.comments.forEach((comment) => {
    const commentElement = document.createElement("li");
    commentElement.classList.add("social__comment");

    commentElement.innerHTML = `
          <img
              class="social__picture"
              src="${comment.avatar}"
              alt="${comment.name}"
              width="35" height="35">
          <p class="social__text">${comment.message}</p>
      `;

    commentsContainer.appendChild(commentElement);
  });

  const loadComments = bigPicture.querySelector(".social__comments-loader");
  if (loadComments) {
    loadComments.classList.add("hidden");
  }
}

export function closePicture() {
  bigPicture.classList.add("hidden");
  document.body.classList.remove("modal-open");
}
