
let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;
let currentTime;
const timeDisplay = document.getElementById('timeDisplay');
const lapsList = document.getElementById('laps');

document.getElementById('startButton').addEventListener('click', startTimer);
document.getElementById('pauseButton').addEventListener('click', pauseTimer);
document.getElementById('resetButton').addEventListener('click', resetTimer);
document.getElementById('lapButton').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        savedTime = difference ? difference : 0;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        running = false;
        difference = currentTime - startTime + savedTime;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    savedTime = 0;
    timeDisplay.innerHTML = '00:00:00';
    lapsList.innerHTML = '';
}

function getShowTime() {
    currentTime = new Date().getTime();
    difference = currentTime - startTime + savedTime;

    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    timeDisplay.innerHTML = 
        (hours < 10 ? '0' + hours : hours) + ':' + 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds) + ':' + 
        (milliseconds < 10 ? '0' + milliseconds : milliseconds);
}

function recordLap() {
    let lapTime = timeDisplay.innerHTML;
    let lapElement = document.createElement('li');
    lapElement.textContent = lapTime;
    lapsList.appendChild(lapElement);
}
