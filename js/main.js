const workDurationElement = document.getElementById("work-duration");
const breakDurationElement = document.getElementById("break-duration");
const decrementWorkButton = document.getElementById("decrement-work");
const incrementWorkButton = document.getElementById("increment-work");
const decrementBreakButton = document.getElementById("decrement-break");
const incrementBreakButton = document.getElementById("increment-break");
const timerDisplay = document.getElementById("timer");
let timerInterval;
let workDuration = parseInt(workDurationElement.textContent);
let breakDuration = parseInt(breakDurationElement.textContent);
let isWorking = false;
let isBreak = false;

decrementWorkButton.addEventListener("click", () => {
    decrementDuration(workDurationElement);
});

incrementWorkButton.addEventListener("click", () => {
    incrementDuration(workDurationElement);
});

decrementBreakButton.addEventListener("click", () => {
    decrementDuration(breakDurationElement);
});

incrementBreakButton.addEventListener("click", () => {
    incrementDuration(breakDurationElement);
});

function incrementDuration(element) {
    clearInterval(timerInterval);
    const currentDuration = parseInt(element.textContent);
    element.textContent = currentDuration + 1;
    timerDisplay.textContent = `${workDurationElement.textContent}:00`;
};

function decrementDuration(element) {
    clearInterval(timerInterval);
    const currentDuration = parseInt(element.textContent);
    if (currentDuration > 1) {
        element.textContent = currentDuration - 1;
        timerDisplay.textContent = `${workDurationElement.textContent}:00`;
    };
};

timerDisplay.addEventListener("click", () =>{
    if (isWorking) {
        clearInterval(timerInterval);
        isWorking = false;
        timerDisplay.textContent = isBreak ? `${breakDurationElement.textContent}:00` : `${workDurationElement.textContent}:00`;
    } else {
        startTimer();
    }
});

function startTimer() {
    isWorking = true;
    let duration = isBreak ? breakDurationElement.textContent : workDurationElement.textContent;
    let seconds = duration * 60;

    timerInterval = setInterval(() => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerDisplay.textContent = `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
        
        if (seconds <= 0) {
            clearInterval(timerInterval);
            isWorking = false;
            isBreak = !isBreak;
            startTimer();
        }
        seconds--;
    }, 1000);
}
