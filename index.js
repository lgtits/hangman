const getWord = document.querySelector('.getWord')
const word = document.querySelector('.word')
const board = document.querySelector('.board')
const guess = document.querySelector('.guess')
let answer
let split
let wrongTime = 0
let correct = 0
let winTime = 0
const wrong = document.querySelector('.wrong')
const win = document.querySelector('.win')

let url = 'https://random-word-api.herokuapp.com/word?length=5'

async function getData(url) {
  console.log('start')
  try {
    let response = await fetch(url)
    let data = await response.json();
    answer = data[0]
    console.log('answer: ', answer)
    split = [...data[0]]
    board.innerHTML = ''
    split.forEach(letter => {
      console.log(letter)
      board.innerHTML += `<span class="letter">${letter}</span>`
    });
    word.innerText = answer
  } catch (error) {
    console.log(error)
  }
}

getWord.addEventListener('click', function () {
  getData(url)
})

guess.addEventListener('click', function () {
  let guessLetter = document.querySelectorAll('input[name="choice"]')
  console.log(guessLetter)
  guessLetter.forEach(letter => {
    if (letter.checked) {
      console.log('select:', letter.value)
      check(letter.value)
    }
  })
})

function check(letter){
  let letters = document.querySelectorAll('.letter')

  let index = split.indexOf(letter)
  console.log('index', index)
  if(index >= 0){
    console.log('got: ', letter)
    console.log(letters[index])
    letters[index].classList.add('gotU')
    correct ++
    if(correct === 5 ){
      alert('end')
      correct = 0
      getData(url)
      wrongTime = 0
      winTime ++
      win.innerText = winTime
    }
  } else {
    console.log('no')
    wrongTime ++
    wrong.innerText = wrongTime
  }
}