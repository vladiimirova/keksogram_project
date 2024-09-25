 function generateSingleMiniature(photoData) {
    const pictureTemplate = document.querySelector('#picture').content.cloneNode(true);
    pictureTemplate.querySelector('img').src = photoData.url;
    pictureTemplate.querySelector('.picture__comments').innerText = photoData.comments.length;
    pictureTemplate.querySelector('.picture__likes').innerText = photoData.likes;
    return pictureTemplate;
}

export function generateAllMiniatures(photosArr) {
    return photosArr.map(photo => generateSingleMiniature(photo));
}


