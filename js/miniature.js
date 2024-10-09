const pictures = document.querySelector(".pictures");

function generateSingleMiniature(photoData) {
    const pictureTemplate = document.querySelector('#picture').content.cloneNode(true);
    const imgElement = pictureTemplate.querySelector('img');

    imgElement.src = photoData.url; 
    imgElement.dataset.id = photoData.id;
    
    pictureTemplate.querySelector('.picture__comments').innerText = photoData.comments.length; 
    pictureTemplate.querySelector('.picture__likes').innerText = photoData.likes; 
    
    return pictureTemplate; 
}


function generateAllMiniatures(photosArr) {
    return photosArr.map(photo => generateSingleMiniature(photo));
}

export function displayMiniatures(photosArr) {
    const existingMiniatures = pictures.querySelectorAll('.picture'); 
    existingMiniatures.forEach(function(miniature) {
        miniature.remove();
    });

    const fragment = document.createDocumentFragment();
    
    generateAllMiniatures(photosArr).forEach(function(miniature) {
        fragment.appendChild(miniature);
    });
  
    pictures.appendChild(fragment); 
}
