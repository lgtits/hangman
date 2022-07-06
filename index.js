const startBtn = document.querySelector(".start-btn");
const board = document.querySelector(".board");
const letters = document.querySelectorAll(".letter");
const letter1 = document.querySelector(".letter1");
const letter2 = document.querySelector(".letter2");
const letter3 = document.querySelector(".letter3");
const letter4 = document.querySelector(".letter4");
const letter5 = document.querySelector(".letter5");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const win = document.querySelector(".win");
const lose = document.querySelector(".lose");
const description = document.querySelector(".description");
const vocabularies = document.querySelector(".vocabularies");
const pictures = document.querySelectorAll(".status");
let definitionDescription;
let answer;
let split;
let wrongTime = 0;
let correct = 0;
let winTime = 0;
let loseTime = 0;
let processing = false;

let url = "https://random-word-api.herokuapp.com/word?length=5";

async function getData(url) {
  console.log("game starts");
  pictures.forEach((element) => element.classList.remove("show"));
  processing = true;
  startBtn.innerText = 'Loading...'
  if (answer) {
    vocabularies.innerHTML += `<li>
      <span class="vocabulary">${answer}: </span>
      <span class="meaning">${definitionDescription}</span>
    </li>`;
  }
  try {
    let response = await fetch(url);
    let data = await response.json();
    answer = data[0];
    console.log("answer: ", answer);
    split = [...data[0]];
    letter1.innerText = "";
    letter2.innerText = "";
    letter3.innerText = "";
    letter4.innerText = "";
    letter5.innerText = "";
    inputs.forEach((item) => {
      item.removeAttribute("disabled");
    });
    labels.forEach((item) => {
      item.removeAttribute("disabled");
    });
    wrongTime = 0;
    getDefinition(answer);
  } catch (error) {
    console.log(error);
  }
}

async function getDefinition(word) {
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let definition = await response.json();
    definitionDescription = definition[0].meanings[0].definitions[0].definition;
    description.innerText = definitionDescription;
    processing = false;
      startBtn.innerText = "Start Game";
  } catch (error) {
    console.log("Error:", error);
    answer = "";
    getData(url);
    // definitionDescription = "no definition.";
    // description.innerText = definitionDescription;
    // processing = false;
  }
}

startBtn.addEventListener("click", function () {
  if (processing === true) {
    return;
  }
  getData(url);
});

function check(letter) {
  if (split[0] === letter) {
    letter1.innerText = letter;
    correct++;
  }
  if (split[1] === letter) {
    letter2.innerText = letter;
    correct++;
  }
  if (split[2] === letter) {
    letter3.innerText = letter;
    correct++;
  }
  if (split[3] === letter) {
    letter4.innerText = letter;
    correct++;
  }
  if (split[4] === letter) {
    letter5.innerText = letter;
    correct++;
  }
  if (
    split[0] === letter ||
    split[1] === letter ||
    split[2] === letter ||
    split[3] === letter ||
    split[4] === letter
  ) {
    inputs[letter.charCodeAt(0) - 97].setAttribute("disabled", true);
    labels[letter.charCodeAt(0) - 97].setAttribute("disabled", true);
  }
  if (correct === 5) {
    alert(`Yes! Answer is ${answer}.`);
    correct = 0;
    getData(url);
    if (wrongTime < 9) {
      winTime++;
      win.innerText = winTime;
      console.log('you win')
    }
  }
  if (
    split[0] !== letter &&
    split[1] !== letter &&
    split[2] !== letter &&
    split[3] !== letter &&
    split[4] !== letter
  ) {
    inputs[letter.charCodeAt(0) - 97].setAttribute("disabled", true);
    labels[letter.charCodeAt(0) - 97].setAttribute("disabled", true);
    wrongTime++;
    getPicture(wrongTime);
  }
}

labels.forEach((label) => {
  label.addEventListener("click", function (e) {
    if (!answer || processing) {
      return;
    }
    if (e.target.getAttribute("disabled")) {
      return;
    }
    let letter = e.target.getAttribute("for");
    check(letter);
  });
});

function getPicture(wrongTime) {
  for (let i = 0; i <= 9; i++)
    if (wrongTime === i) {
      pictures[i - 1].classList.add("show");
      if (i > 1) {
        pictures[i - 2].classList.remove("show");
      }
      if (wrongTime === 9) {
        console.log("you lose");
        alert("you lose !");
        loseTime++;
        lose.innerText = loseTime;
      }
    }
}
