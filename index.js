const getWord = document.querySelector(".getWord");
const board = document.querySelector(".board");
const letters = document.querySelectorAll(".letter");
const letter1 = document.querySelector(".letter1");
const letter2 = document.querySelector(".letter2");
const letter3 = document.querySelector(".letter3");
const letter4 = document.querySelector(".letter4");
const letter5 = document.querySelector(".letter5");
const inputs = document.querySelectorAll("input");
const labels = document.querySelectorAll("label");
const wrong = document.querySelector(".wrong");
const win = document.querySelector(".win");
const description = document.querySelector(".description");
const vocabularies = document.querySelector(".vocabularies");
let definitionDescription;
let answer;
let split;
let wrongTime = 0;
let correct = 0;
let winTime = 0;
let processing = false;

let url = "https://random-word-api.herokuapp.com/word?length=5";

async function getData(url) {
  console.log("game starts");
  processing = true;

  if (answer) {
    console.log(answer);
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
    wrong.innerText = wrongTime;
    getDefinition(answer);
  } catch (error) {
    console.log(error);
  }
}

async function getDefinition(word) {
  console.log("get definition of:", word);
  try {
    let response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    let definition = await response.json();
    console.log(
      "definition:",
      definition[0].meanings[0].definitions[0].definition
    );
    definitionDescription = definition[0].meanings[0].definitions[0].definition;
    description.innerText = definitionDescription;
    processing = false;
  } catch (error) {
    console.log("Error:", error);
    answer = ''
    getData(url);
    // definitionDescription = "no definition.";
    // description.innerText = definitionDescription;
    // processing = false;
  }
}

getWord.addEventListener("click", function () {
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
    alert(`Bingo！ Answer is ${answer}.`);
    correct = 0;
    getData(url);
    winTime++;
    win.innerText = winTime;
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
    wrong.innerText = wrongTime;
  }
}

labels.forEach((label) => {
  label.addEventListener("click", function (e) {
    if (!answer) {
      return;
    }
    if (e.target.getAttribute("disabled")) {
      return;
    }
    let letter = e.target.getAttribute("for");
    check(letter);
  });
});
