const words = ["abdul", "bleiker", "programmering", "java", "css", "hangman"];

let playerName = "";
let wordToGuess = "";
let guessedWord = [];
let incorrectGuesses = 0;
let timer = 0;
let timerInterval;

function startGame() {
  playerName = document.getElementById("playerName").value;
  document.getElementById("gameContainer").style.display = "block";
  chooseWord();
  startTimer();
  displayWord();
}

function chooseWord() {
  wordToGuess = words[Math.floor(Math.random() * words.length)];
  guessedWord = Array(wordToGuess.length).fill("_");
}

function displayWord() {
  document.getElementById("wordDisplay").textContent = guessedWord.join(" ");
}

function guessLetter() {
  const guess = document.getElementById("guessInput").value.toLowerCase();
  if (guess.length !== 1 || !guess.match(/[a-z]/)) {
    alert("Please enter a single letter.");
    return;
  }
  
  if (wordToGuess.includes(guess)) {
    for (let i = 0; i < wordToGuess.length; i++) {
      if (wordToGuess[i] === guess) {
        guessedWord[i] = guess;
      }
    }
    displayWord();
    if (!guessedWord.includes("_")) {
      endGame(true);
    }
  } else {
    incorrectGuesses++;
    document.getElementById("incorrectGuesses").textContent = incorrectGuesses;
    if (incorrectGuesses === 6) {
      endGame(false);
    }
  }
  document.getElementById("guessInput").value = "";
}

function startTimer() {
  timerInterval = setInterval(function() {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);
}

function endGame(isWin) {
  clearInterval(timerInterval);
  if (isWin) {
    const score = wordToGuess.length * 10 - timer;
    alert(`Congratulations, ${playerName}! You won with a score of ${score}.`);
  } else {
    alert(`Game over! The word was "${wordToGuess}". Try again, ${playerName}!`);
  }
  resetGame();
}

function resetGame() {
  document.getElementById("gameContainer").style.display = "none";
  document.getElementById("playerName").value = "";
  document.getElementById("incorrectGuesses").textContent = "0";
  document.getElementById("timer").textContent = "0";
  playerName = "";
  wordToGuess = "";
  guessedWord = [];
  incorrectGuesses = 0;
  timer = 0;
}