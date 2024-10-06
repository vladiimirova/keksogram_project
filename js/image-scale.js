import { valueStep, scale, numForDrob } from "./constants.js";
const controlValue = document.querySelector(".scale__control--value");
const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleImg = imgUploadPreview.querySelector('img');
const controlSmaller = document.querySelector(".scale__control--smaller");
const controlBigger = document.querySelector(".scale__control--bigger");

export function adjustImageSize(event) {
    const value = controlValue.value;
    const numValue = parseInt(value);

    if (event.target === controlSmaller && numValue > scale.min) {
        const newSmallerValue = numValue - valueStep;
        controlValue.value = `${newSmallerValue}%`;
        updateImageStyle(newSmallerValue);
    } else if (event.target === controlBigger && numValue < scale.max) {
        const newBiggerValue = numValue + valueStep;
        controlValue.value = `${newBiggerValue}%`;
        updateImageStyle(newBiggerValue);
    }
}

export function updateImageStyle(newValue) {
    const valueForScale = newValue / numForDrob; 
    scaleImg.style.cssText = `
        transform: scale(${valueForScale}) 
    `;
}
