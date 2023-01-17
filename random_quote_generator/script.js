'use strict';

const quotes = [
    {
        id: 1,
        text: "The wisest mind has something yet to learn.",
        author: "George Santayana",
    },
    {
        id: 2,
        text: "The only true wisdom is in knowing you know nothing.",
        author: "Socrates",
    },
    {
        id: 3,
        text: "The more you know, the more you realize you know nothing",
        author: "Socrates",
    },
    {
        id: 4,
        text: "Wisdom is not a product of schooling but of the lifelong attempt to acquire it.",
        author: "Albert Einstein",
    },
    {
        id: 5,
        text: "The only real wisdom is in knowing you know nothing.",
        author: "Socrates",
    },
    {
        id: 6,
        text: "The more you know, the more you realize you don't know.",
        author: "Aristotle",
    },
    {
        id: 7,
        text: "The greatest wisdom is seeing through appearances.",
        author: "Arthur Schopenhauer",
    },
    {
        id: 8,
        text: "The wisest mind has something yet to learn.",
        author: "George Santayana",
    },
    {
        id: 9,
        text: "Wise men speak because they have something to say; fools because they have to say something.",
        author: "Plato",
    },
    {
        id: 10,
        text: "Wisdom is the supreme part of happiness.",
        author: "Sophocles",
    },
    {
        id: 11,
        text: "Wisdom is not a matter of age, but of will.",
        author: " Seneca",
    },
    {
        id: 12,
        text: "A wise man never knows all, only fools know everything.",
        author: " African Proverb",
    },
    {
        id: 13,
        text: "Motivation is the fuel, necessary to keep the human engine running.",
        author: "Zig Ziglar",
    },
    {
        id: 14,
        text: "Discipline is the bridge between goals and accomplishment",
        author: "Jim Rohn",
    },
];

const colors = ['#8fbc6e', '#e0e8ac', '#8a4547', '#2c1c22', '#56665a', '#273035', '#c17761', '#e7405a'];

const generateBtn = document.querySelector('.generate-btn');
const quoteText = document.querySelector('.quote-text');
const quoteAuthor = document.querySelector('.quote-author');
const tweetBtn = document.querySelector('.tweet-btn');

// show default quote and author
quoteText.textContent = quotes[0].text;
quoteAuthor.textContent = quotes[0].author;

// generate random quotes
generateBtn.addEventListener('click', showRandomQuotes);

// tweet quote
tweetBtn.addEventListener('click', (e) => {
    tweetQuote(e);
});

function getRandomQuote()
{
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function getRandomColor()
{
    return colors[Math.floor(Math.random() * colors.length)];
}

function showRandomQuotes()
{
    const randomQuote = getRandomQuote();
    quoteText.textContent = randomQuote.text;
    quoteAuthor.textContent = randomQuote.author;
    showRandomColors();
}

function showRandomColors()
{
    const randomColor = getRandomColor();
    document.body.style.backgroundColor = randomColor;
}

function tweetQuote(event)
{
    const quoteText = event.target.parentElement.parentElement.children[0].innerHTML;
    const quoteAuthor = event.target.parentElement.parentElement.children[2].innerHTML;
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText}&via=${quoteAuthor}`;

    window.open(twitterURL);
}