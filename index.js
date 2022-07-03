const getWord = document.querySelector('.getWord')
// const word = document.querySelector('.word')
const board = document.querySelector('.board')
// const guess = document.querySelector('.guess')
const letters = document.querySelectorAll('.letter')
const letter1 = document.querySelector('.letter1')
const letter2 = document.querySelector('.letter2')
const letter3 = document.querySelector('.letter3')
const letter4 = document.querySelector('.letter4')
const letter5 = document.querySelector('.letter5')
const inputs = document.querySelectorAll('input')
// const choices = document.querySelector('.choices')
const labels = document.querySelectorAll('label')

let answer
let split
let wrongTime = 0
let correct = 0
let winTime = 0
const wrong = document.querySelector('.wrong')
const win = document.querySelector('.win')

let url = 'https://random-word-api.herokuapp.com/word?length=5'

async function getData(url) {
  console.log('game starts')
  try {
    let response = await fetch(url)
    let data = await response.json();
    answer = data[0]
    console.log('answer: ', answer)
    split = [...data[0]]
    // console.log(split)
    letter1.innerText = ''
    letter2.innerText = ''
    letter3.innerText = ''
    letter4.innerText = ''
    letter5.innerText = ''
    inputs.forEach(item => {
      item.removeAttribute("disabled")
    })
    // word.innerText = answer.toUpperCase()
    wrongTime = 0
    wrong.innerText = wrongTime
  } catch (error) {
    console.log(error)
  }
}

getWord.addEventListener('click', function () {
  getData(url)
})

// guess.addEventListener('click', function () {
//   let guessLetter = document.querySelectorAll('input[name="choice"]')
//   console.log(guessLetter)
//   guessLetter.forEach(letter => {
//     if (letter.checked) {
//       console.log('select:', letter.value)
//       check(letter.value)
//     }
//   })
// })

function check(letter) {
  if (split[0] === letter) {
    letter1.innerText = letter
    correct++
  }
  if (split[1] === letter) {
    letter2.innerText = letter
    correct++
  }
  if (split[2] === letter) {
    letter3.innerText = letter
    correct++
  }
  if (split[3] === letter) {
    letter4.innerText = letter
    correct++
  }
  if (split[4] === letter) {
    letter5.innerText = letter
    correct++
  }
  if (split[0] === letter || split[1] === letter || split[2] === letter || split[3] === letter || split[4] === letter){
    inputs[letter.charCodeAt(0) - 97].setAttribute("disabled", true)
  }
  if (correct === 5) {
    alert(`Bingo！ Answer is ${answer}.`)
    correct = 0
    getData(url)
    winTime++
    win.innerText = winTime
  }
  if (split[0] !== letter && split[1] !== letter && split[2] !== letter && split[3] !== letter && split[4] !== letter) {
    // console.log(inputs)
    inputs[letter.charCodeAt(0) - 97].setAttribute("disabled", true)
    wrongTime++
    wrong.innerText = wrongTime
  }

}

// choices.addEventListener('click', function(e){
//   console.log(e.target.value)
// })

labels.forEach(label => {
  label.addEventListener('click', function (e) {
    if(!answer){
      return
    }
    let letter = e.target.getAttribute('for')
    // console.log('test', letter)
    check(letter)
  })
})