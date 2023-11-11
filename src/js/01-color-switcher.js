const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

let intervalId;

startButton.addEventListener('click', handleStartClick);
stopButton.addEventListener('click', handleStopClick);

stopButton.disabled = true;

function handleStartClick() {
    startButton.disabled = true;
    stopButton.disabled = false;

    intervalId = setInterval(changeBackgroundColor, 1000);
};

function handleStopClick() {
    startButton.disabled = false;
    stopButton.disabled = true;

    clearInterval(intervalId);
};

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
    };

function changeBackgroundColor() {
    body.style.backgroundColor = getRandomHexColor();
}
