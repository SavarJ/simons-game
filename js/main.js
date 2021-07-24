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
      new Audio("sounds/" + color + ".mp3").play();
    }
  }
  animate(button);
  addToList(color);
}

function animate(button) {
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

  if (simons[currentIndex] === userList[currentIndex]) {
    currentIndex++;
  } else {
    //User chose the wrong block
    gameOver();
    return;
  }
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
  new Audio("sounds/wrong.mp3").play();
  $("body").toggleClass("game-over");
  setTimeout(function () {
    $("body").toggleClass("game-over");
  }, 500);
  animateEnding();
}

function animateEnding() {
  // let totaltime = 1;
  // for (let i = 0; i < simons.length; i++) {
  //   console.log(simons[i]);
  //   setTimeout(function () {
  //     animate($("div." + simons[i]));
  //     totaltime += i * 1000;
  //   }, i * 1000);
  // }
  setTimeout(function () {
    location.reload();
  }, 2000);
}

//This is to stop the page from scrolling up/down when using the arrow keys
function stopDefaultScrolling() {
  const keys = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  window.addEventListener("keydown", (event) => {
    if (keys.includes(event.code)) {
      e.preventDefault();
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
