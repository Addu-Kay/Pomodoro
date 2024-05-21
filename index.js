const secContainer = document.getElementsByClassName("seconds")[0];
const minContainer = document.getElementsByClassName("minutes")[0];
const startButton = document.getElementById("start-button");
const replayButton = document.getElementById("replay-button");
const settingsButton = document.getElementById("settings-button");
const closeButton = document.getElementById("close-button");
const saveButton = document.getElementById("save-button");
const alarm = new Audio("./Audio/alarm.mp3");

// Store the time id to stop the setInterval function
let timeInterval;

// Milliseconds elapsed since the button was clicked
let elapsedMilliseconds;

// Pomodoro time to countdown
let pomodoroTime = 24;

// to check whether the timer is running
let isQuitting = true;

startButton.addEventListener("click", startTimer);
replayButton.addEventListener("click", reset);
settingsButton.addEventListener("click", showSettingsModal);
closeButton.addEventListener("click", closeSettingsModal);
saveButton.addEventListener("click", savePomodoroTime);

function startTimer() {
  let clickTime = Date.now();
  startButton.innerHTML = "Quit";
  isQuitting = !isQuitting;
  if (isQuitting) {
    clearInterval(timeInterval);
    reset();
    startButton.innerHTML = "Start";
    return;
  }

  timeInterval = setInterval(() => {
    const currentTime = Date.now();

    // Milliseconds elapsed after the button was clicked
    elapsedMilliseconds = currentTime - clickTime;

    // Seconds elapsed after the button was clicked and keep the range between 0-59
    let elapsedSeconds = Math.floor(elapsedMilliseconds / 1000) % 60;

    // Minutes elapsed after the button was clicked
    let elapsedMinutes = Math.floor(elapsedMilliseconds / (60 * 1000));

    // Start the seconds from 59 and end with 0
    elapsedSeconds = 59 - elapsedSeconds;

    // Start with pomodoroTime and end with 0
    elapsedMinutes = pomodoroTime - elapsedMinutes;

    // If the elapsedSeconds is a single digit, add padding of 0 otherwise use elapsedSeconds
    secContainer.innerHTML =
      elapsedSeconds.toString().length == 2
        ? elapsedSeconds
        : `0${elapsedSeconds}`;

    // If the elapsedMinutes is a single digit, add padding of 0 otherwise use elapsedMinutes
    minContainer.innerHTML =
      elapsedMinutes.toString().length == 2
        ? elapsedMinutes
        : `0${elapsedMinutes}`;

    if (minContainer.innerHTML == 0 && secContainer.innerHTML == 0) {
      clearInterval(timeInterval);
      // new Audio("../Audio/alarm.mp3").play();
      alarm.play();
      startButton.innerHTML = "Start";
      minContainer.innerHTML =
        `${pomodoroTime + 1}`.length == 2
          ? pomodoroTime + 1
          : `0${pomodoroTime + 1}`;
    }
  }, 100);
}

// reset time back to pomodoroTime
function reset() {
  clearInterval(timeInterval);
  minContainer.innerHTML =
    `${pomodoroTime + 1}`.length == 2
      ? pomodoroTime + 1
      : `0${pomodoroTime + 1}`;
  secContainer.innerHTML = "00";
}

// show settingsModal
function showSettingsModal() {
  const settingsModal = document.querySelector(".settings-modal");
  settingsModal.classList.add("show");
}

// close settingsModal
function closeSettingsModal() {
  const settingsModal = document.querySelector(".settings-modal");
  settingsModal.classList.remove("show");
}

function savePomodoroTime() {
  const settingsModal = document.querySelector(".settings-modal");
  settingsModal.classList.remove("show");
  pomodoroTime = Number(document.querySelector("input").value) - 1;
  reset();
}
