// set var dom
const currentAnswer = document.getElementById("currentAnswer");
const gameResult = document.getElementById("gameResult");
const currentQuestion = document.getElementById("currentQuestion");
const green = document.getElementById("green");
const red = document.getElementById("red");
//set element audio
const restartSound = document.getElementById("restartSound");
const submitSound = document.getElementById("submitSound");
const successSound = new Audio(
  "https://www.pacdv.com/sounds/applause-sounds/app-29.wav"
);
const failureSound = new Audio(
  "https://www.pacdv.com/sounds/voices/no-thats-not-gonna-do-it.wav"
);
const noAnswerSound = new Audio(
  "https://www.pacdv.com/sounds/mechanical_sound_effects/glass_breaking_2.wav"
);

let resultComp = 0;
let correctCount = 0;
let failCount = 0;

const correctLimit = 3;
const failLimit = 3;

// show firts compute
computeMultiplication();
displayMessage(green, correctCount);
displayMessage(red, failCount);

/**
 * compute multilipcation and display
 */
function computeMultiplication() {
  var factorOne = Math.floor(Math.random() * 10);
  var factorTwo = Math.floor(Math.random() * 10);

  resultComp = factorOne * factorTwo;
  displayMessage(currentQuestion, `${factorOne} X ${factorTwo}`);
}
/**
 * display message in div
 * @param {*} text
 */
function displayMessage(element, text) {
  element.innerText = text;
}

// click submit
function handleSubmit() {
  // check limit in correctCount
  if (correctCount >= correctLimit) {
    successSound.play();
    displayMessage(
      gameResult,
      "Great job! Play again to strengthen your knowledge"
    );
    return false;
  }
  // check limit in failCount
  if (failCount === failLimit) {
    failureSound.play();
    displayMessage(gameResult, "You can do better, try again");
    return false;
  }
  // check if empty text box
  if (currentAnswer.value === "" || currentAnswer.value === "undifined") {
    displayMessage(gameResult, "Please enter your answer and press Submit");
    noAnswerSound.play();
    return false;
  } else {
    displayMessage(gameResult, "");
  }

  if (+currentAnswer.value != resultComp) {
    failCount++;
    displayMessage(red, failCount);
  } else {
    correctCount++;
    displayMessage(green, correctCount);
  }

  computeMultiplication();
  currentAnswer.value = "";
  submitSound.play();
}

// click restart
function handleRestart() {
  restartSound.play();
  computeMultiplication();
  resultComp = correctCount = failCount = 0;

  displayMessage(green, correctCount);
  displayMessage(red, failCount);
  displayMessage(gameResult, "");
  currentAnswer.value = "";
}
