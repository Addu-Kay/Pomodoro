const secContainer = document.getElementsByClassName("seconds")[0];
const minContainer = document.getElementsByClassName("minutes")[0];
const startButton = document.getElementById("start-button");
const alarm = new Audio("./Audio/alarm.mp3");

// Store the time id to stop the setInterval function
let timeInterval;

// Milliseconds elapsed since the button was clicked
let elapsedMilliseconds;

// Pomodoro time to countdown
let pomodoroTime = 24;

// to check whether the timer is running
let isRunning = false;

function startTimer() {
  let clickTime = Date.now();
  startButton.textContent = "Quit";
  isRunning = !isRunning;
  if (!isRunning) {
    clearInterval(timeInterval);
    reset();
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
    secContainer.textContent = String(elapsedSeconds).padStart(2, "0");

    // If the elapsedMinutes is a single digit, add padding of 0 otherwise use elapsedMinutes
    minContainer.textContent = String(elapsedMinutes).padStart(2, "0");


    if (elapsedMinutes < 0) {
      clearInterval(timeInterval);
      alarm.play();
      startButton.textContent = "Start";
      let initialPomodoro = pomodoroTime + 1;
      initialPomodoro = String(initialPomodoro).padStart(2, "0");
      minContainer.textContent = initialPomodoro;
      secContainer.textContent = "00";
    }
  }, 10);
}

// reset time back to pomodoroTime
function reset() {
  clearInterval(timeInterval);
  startButton.textContent = "Start";
  let initialPomodoro = pomodoroTime + 1;
  initialPomodoro = String(initialPomodoro).padStart(2, "0");
  minContainer.textContent = initialPomodoro;
  secContainer.textContent = "00";
  isRunning = false;
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
  const input = document.querySelector("input");
  if (input.value == "" || input.value <= "0") {
    input.value = 25;
  }
  console.log(input.value);
  pomodoroTime = Number(input.value) - 1;
  reset();
}
