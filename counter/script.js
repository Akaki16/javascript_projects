'use strict';

// UI variables
const counterValue = document.querySelector('.counter-value');

const increaseBtn = document.querySelector('.increase-btn');
const resetBtn = document.querySelector('.reset-btn');
const decreaseBtn = document.querySelector('.decrease-btn');

// set counter initial value
let counter = 0;

// increase counter
increaseBtn.addEventListener('click', () => {
    increaseCounter();
    updateCounterValue();
});

// decrease counter
decreaseBtn.addEventListener('click', () => {
    decreaseCounter();
    updateCounterValue();
});

// reset counter
resetBtn.addEventListener('click', () => {
    resetCounter();
    updateCounterValue();
});

function increaseCounter()
{
    counter++;
}

function decreaseCounter()
{
    counter--;
}

function resetCounter()
{
    counter = 0;
}

function updateCounterValue()
{
    counterValue.textContent = counter;
}