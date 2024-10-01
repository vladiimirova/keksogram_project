const imgUpload = document.querySelector('.img-upload');
const imgUploadForm = imgUpload.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const hashtagsInput = imgUploadOverlay.querySelector('.text__hashtags');
const commentsInput = imgUploadOverlay.querySelector('.text__description');

export function showImgForm() {
    imgUploadOverlay.classList.remove('hidden');  
    document.body.classList.add('modal-open');   
}

export function closeImgForm() {
    imgUploadOverlay.classList.add('hidden');  
    document.body.classList.remove('modal-open');   
    cleanForm();
}

function cleanForm() {
    imgUploadForm.reset();
}

function doValidationHashtags(e) { 
    const regexHashtags = new RegExp(/^(#[A-Za-z0-9]{1,19})$/i);
    const hashtagsValue = hashtagsInput.value.trim();

    if (hashtagsValue.length > 0) {
        const hashtagsArray = hashtagsValue.split(' ');
        const uniqueHashtags = [];

        hashtagsArray.forEach((hashtag) => {
            if (!hashtag.startsWith('#')) {
                hashtagsInput.setCustomValidity('Хеш-тег повинен починатися із символу #');
                e.preventDefault();
                return;
            }
            if (hashtag === '#') {
                hashtagsInput.setCustomValidity('Хеш-тег не може складатися тільки із символу #');
                e.preventDefault();
                return;
            }
            if (!regexHashtags.test(hashtag)) {
                hashtagsInput.setCustomValidity('Хештег має починатися з # і містити лише літери або цифри без пробілів чи спецсимволів.');
                e.preventDefault();
                return;
            }            
            if (uniqueHashtags.includes(hashtag)) {
                hashtagsInput.setCustomValidity('Один і той же хеш-тег не може бути використаний двічі');
                e.preventDefault();
                return;
            } 
            uniqueHashtags.push(hashtag);
        });

        if (uniqueHashtags.length > 5) {
            hashtagsInput.setCustomValidity('Не можна вказати більше п\'яти хеш-тегів');
            e.preventDefault();
        }
    }
}

function doValidationComments(e) {
    const commentsValue = commentsInput.value.trim();
    
    if (commentsValue.length > 140) {
        commentsInput.setCustomValidity('Максимальна кількість символів 140');
        e.preventDefault(); 
    }
}

export function doAllValidation(e) {
    doValidationHashtags(e);
    doValidationComments(e);
}
