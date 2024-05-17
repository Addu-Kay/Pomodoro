const secContainer = document.getElementsByClassName("secContainer")[0];
const minContainer = document.getElementsByClassName("minContainer")[0];
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const button25 = document.getElementById("25");
const button60 = document.getElementById("60");
const button90 = document.getElementById("90");
const submitButton = document.getElementById("submit");

// store the time id to stop the setInterval function
let timeInterval;

//milliseconds elapsed since the button was clicked
let elapsedMilliseconds;

// boolean to check if timer is paused
let isPaused = false;

// pomodoro time to countdown
let pomodoroTime = 24;

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);

button25.addEventListener("click", () => {
  pomodoroTime = 24;
  document.querySelector(".minContainer").innerHTML = 25;
});

button60.addEventListener("click", () => {
  pomodoroTime = 59;
  document.querySelector(".minContainer").innerHTML = 60;
});

button90.addEventListener("click", () => {
  pomodoroTime = 89;
  document.querySelector(".minContainer").innerHTML = 90;
});

submitButton.addEventListener("click", () => {
  pomodoroTime = 24;
  document.querySelector(".minContainer").innerHTML = 25;
})

function startTimer() {
  let clickTime = Date.now();
  timeInterval = setInterval(() => {
    const currentTime = Date.now();
    if (isPaused) {
      clickTime = currentTime - (elapsedMilliseconds + 1000);
      isPaused = false;
    }
    elapsedMilliseconds = currentTime - clickTime;
    let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000) % 60;
    let elapsedMinutes = Math.floor(elapsedMilliseconds / (60 * 1000));
    elapsedSeconds = 59 - elapsedSeconds;
    elapsedMinutes = pomodoroTime - elapsedMinutes;
    secContainer.innerHTML =
      elapsedSeconds.toString().length == 2
        ? elapsedSeconds
        : `0${elapsedSeconds}`;
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

function stopTimer() {
  isPaused = true;
  clearInterval(timeInterval);
}
