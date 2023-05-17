const groundUpArrowEl = document.getElementById("groundUpArrow");
const firstDownArrowEl = document.getElementById("firstDownArrow");
const firstUpArrowEl = document.getElementById("firstUpArrow");
const secondDownArrowEl = document.getElementById("secondDownArrow");
const level0El = document.getElementById("level0");
const level1El = document.getElementById("level1");
const level2El = document.getElementById("level2");
const dingSound = document.getElementById("dingSound");

const upBtns = document.querySelectorAll(".upBtn");
const downBtns = document.querySelectorAll(".downBtn");
let currentLevel = 0;

function playSound() {
    dingSound.currentTime = 0;
    dingSound.play();
}

// Function to move the elevator up
function moveUp() {
    if (currentLevel === 0) {
        groundUpArrowEl.classList.add("onclick-arrow");
        setTimeout(() => {
            currentLevel = 1;
            if (upBtns[0].classList.contains("active")) {
                // Stop at level1 only if UP button is pressed on level1
                firstUpArrowEl.classList.add("onclick-arrow");
                groundUpArrowEl.classList.remove("onclick-arrow");
                level0El.classList.add("d-none");
                level1El.classList.remove("d-none");
                playSound();
            } else {
                // Skip level 1 if UP button is not pressed on level1
                moveUp();
            }
        }, 5000);

    } else if (currentLevel === 1) {
        setTimeout(() => {
            currentLevel = 2;
            firstUpArrowEl.classList.remove("onclick-arrow");
            groundUpArrowEl.classList.remove("onclick-arrow");
            secondDownArrowEl.classList.remove("onclick-arrow");
            level0El.classList.add("d-none");
            level2El.classList.remove("d-none");
            level1El.classList.add("d-none");
            playSound();
        }, 5000);
    }
}

// Function to move the elevator down
function moveDown() {
    firstUpArrowEl.classList.remove("onclick-arrow");
    if (currentLevel === 2) {
        secondDownArrowEl.classList.add("onclick-arrow");
        setTimeout(() => {
            currentLevel = 1;
            secondDownArrowEl.classList.add("onclick-arrow");
            if (downBtns[1].classList.contains("active")) {
                // Stop at level1 only if DOWN button is pressed on level1
                secondDownArrowEl.classList.remove("onclick-arrow");
                firstDownArrowEl.classList.add("onclick-arrow");
                firstUpArrowEl.classList.remove("onclick-arrow");
                level2El.classList.add("d-none");
                level1El.classList.remove("d-none");
                level0El.classList.add("d-none");
                playSound();
            } else {
                //Skip level1 if DOWN button is not pressed on level1
                moveDown();
            }
        }, 5000);
    } else if (currentLevel === 1) {
        setTimeout(() => {
            currentLevel = 0;
            firstUpArrowEl.classList.remove("onclick-arrow");
            firstDownArrowEl.classList.remove("onclick-arrow");
            secondDownArrowEl.classList.remove("onclick-arrow");
            level0El.classList.remove("d-none");
            level2El.classList.add("d-none");
            level1El.classList.add("d-none");
            playSound();
        }, 5000);
    }
}


upBtns.forEach((upBtn) => {
    upBtn.addEventListener("click", () => {
        upBtns.forEach((btn) => btn.classList.remove("active"));
        upBtn.classList.add("active");
        moveUp();
    });
});

downBtns.forEach((downBtn) => {
    downBtn.addEventListener("click", () => {
        downBtns.forEach((btn) => btn.classList.remove("active"));
        downBtn.classList.add("active");
        moveDown();
    });
});