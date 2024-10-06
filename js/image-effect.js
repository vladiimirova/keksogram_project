const image = document.querySelector('.img-upload__preview img');
const effectLevel = document.querySelector('.effect-level__value');
const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const hiddenEffectLevel = document.querySelector('.img-upload__effect-level');

noUiSlider.create(slider, {
    start: 1,
    tooltips: {
        to: formatTooltipValue 
    },
    range: {
        'min': 0,
        'max': 100
    },
    step: 1,
    format: {
        to: function(value) {
            return value.toFixed(1);
        },
        from: function(value) {
            return parseFloat(value);
        }
    }
});

function formatTooltipValue(value) {
    const selectedEffect = document.querySelector('.effects__radio:checked').value;

    if (selectedEffect === 'marvin') {
        return value.toFixed(0) + '%'; 
    } else if (selectedEffect === 'phobos') {
        return value.toFixed(1) + 'px'; 
    } else {
        return value.toFixed(1); 
    }
}

export function updateSliderOptions(effect) {
    let options;

    switch (effect) {
        case 'chrome':
        case 'sepia':
            options = { min: 0, max: 1, step: 0.1 };
            break;
        case 'marvin':
            options = { min: 0, max: 100, step: 1 };
            break;
        case 'phobos':
            options = { min: 0, max: 3, step: 0.1 };
            break;
        case 'heat':
            options = { min: 1, max: 3, step: 0.1 };
            break;
        default:
            toggleEffectVisibility(false); 
            image.style.filter = '';
            return;
    }

    slider.noUiSlider.updateOptions({
        range: { 'min': options.min, 'max': options.max },
        step: options.step,
    });
  
    setSliderValues(options.max);

    toggleEffectVisibility(true); 
}

function setSliderValues(maxValue) {
    slider.noUiSlider.set(maxValue); 
    effectLevel.value = maxValue;
    hiddenEffectLevel.value = maxValue; 
} 

export function resetSlider() {
    setSliderValues(slider.noUiSlider.options.range.max); 
    toggleEffectVisibility(false); 
}

slider.noUiSlider.on('update', function(values, handle) {
    const currentValue = values[handle];
    
    effectLevel.value = currentValue;
    hiddenEffectLevel.value = currentValue;

    const selectedEffect = document.querySelector('.effects__radio:checked').value;
  
    image.style.filter = getFilterValue(selectedEffect, currentValue);
});

function getFilterValue(selectedEffect, currentValue) {
    switch (selectedEffect) {
        case 'chrome':
            return `grayscale(${currentValue})`;
        case 'sepia':
            return `sepia(${currentValue})`;
        case 'marvin':
            return `invert(${currentValue}%)`;
        case 'phobos':
            return `blur(${currentValue}px)`;
        case 'heat':
            return `brightness(${currentValue})`;
        default:
            return '';
    }
}

export function handleEffectChange(event) {
    if (event.target.matches('.effects__radio')) {
        const selectedEffect = event.target.value;
        updateSliderOptions(selectedEffect);
    }
}

function toggleEffectVisibility(isVisible) {
    if (isVisible) {
        imgUploadEffect.classList.remove('hidden');
    } else {
        imgUploadEffect.classList.add('hidden');
    }
}