// Store UI elements in variables
const distanceForm = document.getElementById('distance-form');
const result = document.querySelector('.result');

// Store form input elements
const formElements = {
    inputX1: document.getElementById('input_x1'),
    inputY1: document.getElementById('input_y1'),
    inputX2: document.getElementById('input_x2'),
    inputY2: document.getElementById('input_y2'),
};

// Store form message elements
const formMessageElements = {
    x1Message: document.querySelector('.x1_message'),
    y1Message: document.querySelector('.y1_message'),
    x2Message: document.querySelector('.x2_message'),
    y2Message: document.querySelector('.y2_message'),
};

// Store form validation messages
const formMessages = {
    x1: {
        required: 'Providing x1 value is required',
        invalid: 'Invalid value for x1',
        color: 'red',
    },
    y1: {
        required: 'Providing y1 value is required',
        invalid: 'Invalid value for y1',
        color: 'red',
    },
    x2: {
        required: 'Providing x2 value is required',
        invalid: 'Invalid value for x2',
        color: 'red',
    },
    y2: {
        required: 'Providing y2 value is required',
        invalid: 'Invalid value for y2',
        color: 'red',
    },
};

// Store point values
const pointValues = {
    x1Value: null,
    y1Value: null,
    x2Value: null,
    y2Value: null,
};

// Validate form input values
function validateInputValue() {

    // Validate x1
    if (formElements.inputX1.value === '') {
        formMessageElements.x1Message.textContent = formMessages.x1.required;
        formMessageElements.x1Message.style.color = formMessages.x1.color;
    } else if (isNaN(parseInt(formElements.inputX1.value))) {
        formMessageElements.x1Message.textContent = formMessages.x1.invalid;
        formMessageElements.x1Message.style.color = formMessages.x1.color;
    } else {
        pointValues.x1Value = parseInt(formElements.inputX1.value);
        formMessageElements.x1Message.textContent = '';
    }

    // Validate y1
    if (formElements.inputY1.value === '') {
        formMessageElements.y1Message.textContent = formMessages.y1.required;
        formMessageElements.y1Message.style.color = formMessages.y1.color;
    } else if (isNaN(parseInt(formElements.inputY1.value))) {
        formMessageElements.y1Message.textContent = formMessages.y1.invalid;
        formMessageElements.y1Message.style.color = formMessages.y1.color;
    } else {
        pointValues.y1Value = parseInt(formElements.inputY1.value);
        formMessageElements.y1Message.textContent = '';
    }

    // Validate x2
    if (formElements.inputX2.value === '') {
        formMessageElements.x2Message.textContent = formMessages.x2.required;
        formMessageElements.x2Message.style.color = formMessages.x2.color;
    } else if (isNaN(parseInt(formElements.inputX2.value))) {
        formMessageElements.x2Message.textContent = formMessages.x2.invalid;
        formMessageElements.x2Message.style.color = formMessages.x2.color;
    } else {
        pointValues.x2Value = parseInt(formElements.inputX2.value);
        formMessageElements.x2Message.textContent = '';
    }

    // Validate y2
    if (formElements.inputY2.value === '') {
        formMessageElements.y2Message.textContent = formMessages.y2.required;
        formMessageElements.y2Message.style.color = formMessages.y2.color;
    } else if (isNaN(parseInt(formElements.inputY2.value))) {
        formMessageElements.y2Message.textContent = formMessages.y2.invalid;
        formMessageElements.y2Message.style.color = formMessages.y2.color;
    } else {
        pointValues.y2Value = parseInt(formElements.inputY2.value);
        formMessageElements.y2Message.textContent = '';
    }

}

// Calculate distance between two points
function calculateDistance() {
    const { x1Value, x2Value, y1Value, y2Value } = pointValues;

    const deltaX = (x2Value - x1Value);
    const deltaY = (y2Value - y1Value);

    const distance = Math.floor((deltaX * deltaX) + (deltaY * deltaY));
    const finalResult = Math.sqrt(distance);

    return finalResult;
}

distanceForm.addEventListener('submit', e => {
    e.preventDefault();

    validateInputValue();

    const calculatedDistance = calculateDistance();

    // show final result
    if (calculatedDistance) {
        setTimeout(() => {
            result.textContent = `Distance is: ${calculatedDistance}`;
        }, 1000)
    }
});