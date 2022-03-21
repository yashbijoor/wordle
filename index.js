import { words } from "./words.js";
var count = 0; //Keeps track of the number of submits
var guess = []; //keeps track of the user's guess
var flag = 0; //Keeps track of the input row
var mark = 0; //To mark submission of a word
var tracker = 0; //To keep track of the inputs after each new guess
const randomNumber = Math.floor(Math.random() * 12973); //A random number

document.querySelector(".help-btn").addEventListener("click", function () {
  document
    .querySelector(".menu-container")
    .classList.toggle("menu-container-toggle");
  document.querySelector(".keyboard").classList.toggle("background-toggle");
  document.querySelector(".game").classList.toggle("background-toggle");
});

for (var i = 0; i < 28; i++) {
  document.querySelectorAll(".btn")[i].addEventListener("click", function () {
    var buttonInnerHTML = this.innerHTML;
    if (buttonInnerHTML === "Backspace") {
      backspace();
    } else if (buttonInnerHTML === "Enter") {
      enter();
    } else {
      pressed(buttonInnerHTML);
    }
  });
}

const randomWord = words[randomNumber];

const correct = randomWord.split("");

document.addEventListener("keypress", function (event) {
  pressed(event.key);
});

function pressed(x) {
  if (x === "Enter") {
    enter();
  } else {
    if (flag < 6 && count < 30 && tracker != 5) {
      document.querySelectorAll(".input-toggle")[count].innerHTML =
        x.toUpperCase();
      guess.push(x.toLowerCase()); //Push letter into the array
      count++;
      mark = 0;
      tracker++;
    }
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Backspace") {
    backspace();
  }
});

const array = [6, 11, 16, 21, 26, 31];

function backspace() {
  if (count < 0 || mark == 1 || tracker == 0) {
  } else {
    document.querySelectorAll(".input-toggle")[count - 1].innerHTML = "";
    guess.pop(); //Pop the letter off the array
    count--; //Decrement the count
    tracker--;
  }
}

function enter() {
  if (flag <= 5 && count % 5 == 0 && tracker != 0) {
    for (let i = 0; i < 5; i++) {
      if (correct.includes(guess[i])) {
        if (guess[i] === correct[i]) {
          document.querySelectorAll(".input")[i + 5 * flag].style.background =
            "#6AAA64";
          document.querySelectorAll(".input")[i + 5 * flag].style.border =
            "none";
        } else {
          document.querySelectorAll(".input")[i + 5 * flag].style.background =
            "#C9B458";
          document.querySelectorAll(".input")[i + 5 * flag].style.border =
            "none";
        }
      } else {
        document.querySelectorAll(".input")[i + 5 * flag].style.background =
          "#e63946";
        document.querySelectorAll(".input")[i + 5 * flag].style.border = "none";
      }
    }
    flag++;
    guess = [];
    mark = 1;
    tracker = 0;
  }
  if (flag === 6) {
    document.querySelector(".answer").innerHTML = randomWord.toUpperCase();
    document.querySelector(".answer").classList.add("answer-toggle");
  }
  console.log(count);
}

// count = 0;
