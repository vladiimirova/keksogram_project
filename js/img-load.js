const previewImage = document.querySelector('.img-upload__preview img');

export function loadImagePreview(event) {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function (e) {
      previewImage.src = e.target.result; 
    };

    reader.readAsDataURL(file); 
  }
}

