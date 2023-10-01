var startButton = document.getElementById("start-button");
var resetScoreButton = document.getElementById("reset-score-button");

var gameAreaEl = document.getElementById("game-area");

var winCountEl = document.getElementById("winCount");
var lossCountEl = document.getElementById("lossCount");

var countdownEl = document.getElementById("countdown");
var countdownTextEl = document.getElementById("countdown-text");

const questions = [
    {
        question: "Whats my name?",
        answers: [
        { text: "Fred", correct: false},
        { text: "Ned", correct: false},
        { text: "Steven", correct: true},
        { text: "Magnus", correct: false},
        ]
    },
    {
        question: "Whats my number?",
        answers: [
        { text: "541", correct: false},
        { text: "916", correct: false},
        { text: "707", correct: true},
        { text: "830", correct: false},
        ]
    },
    {
        question: "Whats a child of mines name?",
        answers: [
        { text: "Fred", correct: false},
        { text: "Ned", correct: false},
        { text: "Steven", correct: true},
        { text: "Magnus", correct: false},
        ]
    },
    {
        question: "Whats my favorite food?",
        answers: [
        { text: "Pizza", correct: true},
        { text: "Sallad", correct: false},
        { text: "Candy", correct: false},
        { text: "Hamburger", correct: false},
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " currentQuestion.question;

    currentQuestion.answers.forEach(answer =>) {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);

    }
}




const gameDuration = 60;
const penalty = 5;
const wordList = ["sandwich", "moustache", "cat", "balloon", "grocery", "distribution", "river", "chocolate", "possibility", "article", "poet", "philosophy", "housing", "republic", "construction", "restaurant", "payment", "definition", "pizza", "area", "people", "confusion", "childhood", "breath", "leader", "committee", "teaching", "employer", "coffee", "opinion", "queen", "college", "interaction", "psychology", "proposal", "accident", "discussion", "shopping", "mom", "disaster", "clothes", "potato", "session", "growth", "ear", "orange", "procedure", "affair", "salad", "dealer", "hall", "charity", "assumption", "country"];

var myScore = {
    wins: 0,
    losses: 0
};

var keyPress;
var wordArray = [];
var numberOfLetters = 0;
var countCorrectLetters = 0;
var youWon = false;
var secondsRemaining = 0;


startButton.addEventListener("click", function() {
    playGame();
});


function playGame() {
    countCorrectLetters = 0;
    youWon = false;
    countdownEl.style.color = "black";

    var mysteryWord = getNextWord();
    wordArray = mysteryWord.split("");

    numberOfLetters = wordArray.length;

    clearDivs();

    for (var i = 0; i < numberOfLetters; i++) {
        addDiv("_", i);
    }

    startCountdown();
    document.addEventListener("keydown", resolveKeyPress);
}


function getNextWord() {
    
    wordIndex = JSON.parse(localStorage.getItem("wordIndex"));
    if (!wordIndex) {
        wordIndex = Math.floor(Math.random() * wordList.length);
    }
    wordIndex++;

    if (wordIndex >= wordList.length) {
        wordIndex = 0;
    }
    localStorage.setItem("wordIndex", JSON.stringify(wordIndex));
    
    return wordList[wordIndex];
}


function clearDivs() {
    gameAreaEl.innerHTML = "";
}


function addDiv(text, index) {
    var div = document.createElement("div");
    div.textContent = text;
    div.setAttribute("id", "letter" + index);
    gameAreaEl.appendChild(div);
}


function startCountdown() {

    secondsRemaining = gameDuration;
    countdownEl.textContent = secondsRemaining;
    countdownTextEl.textContent = "seconds remaining";

    var timerInterval = setInterval(function() {

        if (youWon === true) {
            clearInterval(timerInterval);
        }

        secondsRemaining--;
        if (secondsRemaining >= 0 && youWon === false) {
            countdownEl.textContent = secondsRemaining;
        }

        if (secondsRemaining <= 10) {
            countdownEl.style.color = "red";
        }

        if (secondsRemaining <= 0) {
            clearInterval(timerInterval);

            youAreALoser();
            endGame();
        }

    }, 1000);

}


function resolveKeyPress(event) {
    keyPress = event.key;
    checkForMatch(keyPress);
 }


function checkForMatch(key) {
    var correctMatch = false;
    for (var i = 0; i < numberOfLetters; i++) {

        if (wordArray[i] === key && document.getElementById("letter" + i).textContent !== key) {
            document.getElementById("letter" + i).textContent = key;
            countCorrectLetters++;
            correctMatch = true;
        }

    }

    if (correctMatch === false) {
        secondsRemaining -= penalty;
    }

    if (countCorrectLetters === numberOfLetters) {
        youAreAWinner();
        endGame();
    }
}


function youAreALoser() {
    youWon = false;
    myScore.losses++;
    countdownEl.style.color = "black";
    countdownEl.textContent = "Time's up!";
    countdownTextEl.textContent = "";
}


function youAreAWinner() {
    youWon = true;
    myScore.wins++;
}


function endGame() {
    resultMessage(youWon);
    saveScore();
    startButton.textContent = "Play again?";
}


function resultMessage(iWon) {
    var message;
    if (iWon === true) {
        message = "YOU WON!!!🏆";
    } else {
        message = "YOU LOST!!!😖";
    }
    document.removeEventListener("keydown", resolveKeyPress);
    clearDivs();
    addDiv(message, 0);
}


function saveScore() {
    localStorage.setItem("scoreStringify", JSON.stringify(myScore));
    writeScore();
}


function writeScore() {       
    winCountEl.textContent = myScore.wins;
    lossCountEl.textContent = myScore.losses;
}


resetScoreButton.addEventListener("click", function() {
    resetScore();
});


function resetScore () {
    myScore.wins = 0;
    myScore.losses = 0;

    saveScore();
}


function init() {
    startButton.textContent = "Press Here To Test Your JavaScript Knowledge";
    countdownEl.textContent = "Are you ready? The Countdown is about to start!";
    getScore();
}


function getScore() {
    myScore = JSON.parse(localStorage.getItem("scoreStringify"));
    if (!myScore) {
        myScore = {
            wins: 0,
            losses: 0
        };
    }
    writeScore();
}


init();