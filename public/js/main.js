function pickRandomColor() {
  let randomNum = Math.floor(Math.random() * colorsArr.length);
  return colorsArr[randomNum];
}

function playSound(event) {
  let button = $(this);
  if (event.type === "keydown") {
    if (!contolKeys.includes(event.key)) {
      return;
    }
    button = $("#" + event.key);
  }

  let color;
  for (let i = 0; i < colorsArr.length; i++) {
    if (button.hasClass(colorsArr[i])) {
      color = colorsArr[i];
      new Audio("public/sounds/" + color + ".mp3").play();
    }
  }
  userPressedAnimate(button);
  addToList(color);
}

function userPressedAnimate(button) {
  button.toggleClass("pressed");
  setTimeout(function () {
    button.toggleClass("pressed");
  }, 300);
}

function startGame() {
  $(document).off("keydown");
  stopDefaultScrolling();
  $(".btn").click(playSound);
  $(".btn").addClass("cursor-pointer");
  $(document).keydown(playSound);
  continueGame();
}

function continueGame() {
  $("#level-title").text("Level " + ++level);

  //   Pick random color, add it to the list, and animate it
  let randColor = pickRandomColor();
  simons.push(randColor);
  // animate($(".btn." + randColor));
  $(".btn." + randColor)
    .fadeOut(250)
    .fadeIn(250);
}

function addToList(color) {
  userList.push(color);

  const userChoseCorrectColor = simons[currentIndex] === userList[currentIndex];
  if (!userChoseCorrectColor) {
    gameOver();
    return;
  }

  currentIndex++;

  if (currentIndex == simons.length) {
    //new level
    userList = [];
    currentIndex = 0;
    setTimeout(continueGame, 1000);
  }
}

function gameOver() {
  $(".btn").off("click");
  $(".btn").removeClass("cursor-pointer");
  $(document).off("keydown");
  $("#level-title").text("Game Over! Try Again!");
  new Audio("public/sounds/wrong.mp3").play();
  $("body").toggleClass("game-over");
  setTimeout(function () {
    $("body").toggleClass("game-over");
  }, 500);
  reloadPage(2000);
}

function reloadPage(milsec) {
  setTimeout(function () {
    location.reload();
  }, milsec);
}

//This is to stop the page from scrolling up/down when using the arrow keys
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

let level = 0;
let userList = [];
let simons = [];
let currentIndex = 0;
let colorsArr = ["green", "red", "yellow", "blue"];
let contolKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
$(document).keydown(startGame);
