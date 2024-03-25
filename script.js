// GAME

let studentScore = 0
let ouzeraScore = 0
let roundWinner = ''

function playRound(studentSelection, ouzeraSelection) {
  if (studentSelection === ouzeraSelection) {
    roundWinner = 'tie'
  }
  if (
    (studentSelection === 'OPERATING SYSTEM' && ouzeraSelection === 'NETWORKING') ||
    (studentSelection === 'NETWORKING' && ouzeraSelection === 'INFORMATION SYSTEM') ||
    (studentSelection === 'INFORMATION SYSTEM' && ouzeraSelection === 'OPERATING SYSTEM')
  ) {
    studentScore++
    roundWinner = 'student'
  }
  if (
    (ouzeraSelection === 'OPERATING SYSTEM' && studentSelection === 'NETWORKING') ||
    (ouzeraSelection === 'NETWORKING' && studentSelection === 'INFORMATION SYSTEM') ||
    (ouzeraSelection === 'INFORMATION SYSTEM' && studentSelection === 'OPERATING SYSTEM')
  ) {
    ouzeraScore++
    roundWinner = 'ouzera'
  }
  updateScoreMessage(roundWinner, studentSelection, ouzeraSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'OPERATING SYSTEM'
    case 1:
      return 'INFORMATION SYSTEM'
    case 2:
      return 'NETWORKING'
  }
}

function isGameOver() {
  return studentScore === 5 || ouzeraScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const studentScorePara = document.getElementById('studentScore')
const ouzeraScorePara = document.getElementById('ouzeraScore')
const studentSign = document.getElementById('studentSign')
const ouzeraSign = document.getElementById('ouzeraSign')
const osBtn = document.getElementById('osBtn')
const informationSystemBtn = document.getElementById('informationSystemBtn')
const networkingBtn = document.getElementById('networkingBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

osBtn.addEventListener('click', () => handleClick('OPERATING SYSTEM'))
informationSystemBtn.addEventListener('click', () => handleClick('INFORMATION SYSTEM'))
networkingBtn.addEventListener('click', () => handleClick('NETWORKING'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(studentSelection) {
  if (isGameOver()) {
    openEndgameModal()
    return
  }

  const ouzeraSelection = getRandomChoice()
  playRound(studentSelection, ouzeraSelection)
  updateChoices(studentSelection, ouzeraSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(studentSelection, ouzeraSelection) {
  switch (studentSelection) {
    case 'OPERATING SYSTEM':
      studentSign.textContent = '👨‍💻'
      break
    case 'INFORMATION SYSTEM':
      studentSign.textContent = '🗃️'
      break
    case 'NETWORKING':
      studentSign.textContent = '🌐'
      break
  }

  switch (ouzeraSelection) {
    case 'OPERATING SYSTEM':
      ouzeraSign.textContent = '👨‍💻'
      break
    case 'INFORMATION SYSTEM':
      ouzeraSign.textContent = '🗃️'
      break
    case 'NETWORKING':
      ouzeraSign.textContent = '🌐'
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "It's a tie!"
  } else if (roundWinner === 'student') {
    scoreInfo.textContent = 'You won!'
  } else if (roundWinner === 'ouzera') {
    scoreInfo.textContent = 'You lost!'
  }

  studentScorePara.textContent = `Student: ${studentScore}`
  ouzeraScorePara.textContent = `Ouzera: ${ouzeraScore}`
}

function updateScoreMessage(winner, studentSelection, ouzeraSelection) {
  if (winner === 'student') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      studentSelection
    )} beats ${ouzeraSelection.toLowerCase()}`
    return
  }
  if (winner === 'ouzera') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      studentSelection
    )} is beaten by ${ouzeraSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    studentSelection
  )} ties with ${ouzeraSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return studentScore > ouzeraScore
    ? (endgameMsg.textContent = 'You won! BSEHTEK')
    : (endgameMsg.textContent = 'Welcome to Rattrapage')
}

function restartGame() {
  studentScore = 0
  ouzeraScore = 0
  scoreInfo.textContent = 'Choose your weapon'
  scoreMessage.textContent = 'First to score 5 points wins the game'
  studentScorePara.textContent = 'Student: 0'
  ouzeraScorePara.textContent = 'Ouzera: 0'
  studentSign.textContent = '❔'
  ouzeraSign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}