const secContainer = document.getElementsByClassName("secContainer")[0];
const minContainer = document.getElementsByClassName("minContainer")[0];
const startButton = document.getElementById("start");
const replayButton = document.getElementById("replay");
const settingsButton = document.getElementById("settings");

// store the time id to stop the setInterval function
let timeInterval;

//milliseconds elapsed since the button was clicked
let elapsedMilliseconds;

// pomodoro time to countdown
let pomodoroTime = 24;

startButton.addEventListener("click", startTimer);
replayButton.addEventListener("click", reset);
settingsButton.addEventListener("click", addClass);

function startTimer() {
  let clickTime = Date.now();
  timeInterval = setInterval(() => {
    const currentTime = Date.now();

    // milliseconds elapsed after the button was clicked
    elapsedMilliseconds = currentTime - clickTime;

    // seconds elapsed after the button was clicked and keep the range between 0-59
    let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000) % 60;

    // minutes elapsed after the button was clicked
    let elapsedMinutes = Math.floor(elapsedMilliseconds / (60 * 1000));

    // start the seconds from 59 and end with 0
    elapsedSeconds = 59 - elapsedSeconds;

    // start with pomodoro Time and end with 0
    elapsedMinutes = pomodoroTime - elapsedMinutes;

    // if the elapsedSecond is  single digit, add padding of 0 otherwise elapsedSecond
    secContainer.innerHTML =
      elapsedSeconds.toString().length == 2
        ? elapsedSeconds
        : `0${elapsedSeconds}`;

    // if the elapsedMinute is  single digit, add padding of 0 otherwise elapsedMinute
    minContainer.innerHTML =
      elapsedMinutes.toString().length == 2
        ? elapsedMinutes
        : `0${elapsedMinutes}`;

    if (minContainer.innerHTML == 0 && secContainer.innerHTML == 0) {
      clearInterval(timeInterval);
      new Audio("../Audio/alarm.mp3").play();
    }
  }, 100);
}

function reset() {
  clearInterval(timeInterval);
  document.querySelector(".minContainer").innerHTML = pomodoroTime + 1;
  document.querySelector(".secContainer").innerHTML = "00";
}

function addClass(event) {
  document.getElementsByClassName("offmodal")[0].classList.remove("offmodal");
}
