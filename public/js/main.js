let level = 0;
let userList = [];
let simonsList = [];
let currentIndex = 0;
const colorsList = ["green", "red", "yellow", "blue"];
const contolKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
$(document).keydown(startGame);

function startGame() {
  $(document).off("keydown");

  stopDefaultScrolling();
  $(".btn").addClass("cursor-pointer");
  $(".btn").click(playSound);
  $(document).keydown(playSound);

  continueGame();
}

function continueGame() {
  $("#level-title").text(`Level ${++level}`);
  const randColor = pickRandomColor();
  simonsList.push(randColor);
  $(`.btn.${randColor}`).fadeOut(250).fadeIn(250);
}

function pickRandomColor() {
  const randomNum = Math.floor(Math.random() * colorsList.length);
  return colorsList[randomNum];
}

function playSound(event) {
  let button = $(this);
  if (event.type === "keydown") {
    if (!contolKeys.includes(event.key)) {
      return;
    }
    button = $(`#${event.key}`);
  }

  let color = null;
  for (let i = 0; i < colorsList.length; i++) {
    if (button.hasClass(colorsList[i])) {
      color = colorsList[i];
      new Audio(`public/sounds/${color}.mp3`).play();
    }
  }
  animateClass(button, "pressed");
  addToList(color);
}

function animateClass(elemant, classToToggle) {
  elemant.toggleClass(classToToggle);
  setTimeout(function () {
    elemant.toggleClass(classToToggle);
  }, 400);
}

function addToList(color) {
  userList.push(color);
  const userChoseCorrectColor =
    simonsList[currentIndex] === userList[currentIndex];
  if (!userChoseCorrectColor) {
    gameOver();
    return;
  }
  currentIndex++;
  const newLevel = currentIndex === simonsList.length;
  if (newLevel) {
    userList = [];
    currentIndex = 0;
    setTimeout(continueGame, 1000);
  }
}

function gameOver() {
  removeEventListeners();
  $("#level-title").text("Game Over! Try Again!");
  new Audio("public/sounds/wrong.mp3").play();
  animateClass($("body"), "game-over");
  reloadPage(2000);
}

function removeEventListeners() {
  $(".btn").off("click");
  $(".btn").removeClass("cursor-pointer");
  $(document).off("keydown");
}

function reloadPage(milsec) {
  setTimeout(function () {
    location.reload();
  }, milsec);
}

function stopDefaultScrolling() {
  const keysToStopDefault = [
    "Space",
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
  ];
  window.addEventListener("keydown", (event) => {
    if (keysToStopDefault.includes(event.code)) {
      event.preventDefault();
    }
  });
}
