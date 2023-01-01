'use strict';

// UI variables
const bgColor = document.querySelector('.bg-color');
const generateBtn = document.getElementById('generate-btn');

// store background colors
const colors = ['#8fbc6e', '#e0e8ac', '#8a4547', '#2c1c22', '#56665a', '#273035', '#c17761', '#e7405a'];

generateBtn.addEventListener('click', displayRandomColor);

function displayRandomColor()
{
    const randomColor = getRandomColor(colors);
    bgColor.textContent = randomColor;
    document.body.style.backgroundColor = randomColor;
}

function getRandomColor(array)
{
    if (array.length > 0)
    {
        return array[Math.floor(Math.random() * array.length)];
    }
}