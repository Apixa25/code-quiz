// this targets the start button in the HTML
const startButton = document.getElementById("start-btn");

// this points to where on the page I want the timer to be
const timerArea = document.getElementById("card-timer");

// target banner section in the HTML
const bannerArea = document.getElementById("banner");

var questionContainer = document.getElementById("question-container");

// target main element in the HTML
const mainElement = document.getElementById("main");

// total time on the clock
let countdownClock = 60;
// current question index
let questionIndex = 0;
// how many points each correct answer is worth
let playerScore = 10;
let correctLog = 0;
let initials = "";
var timer;
var timerCount;

// add your questions here
const questions = [
  {
    text: "What is JavaScript?",
    options: [
      "A way to write ancient scrolls",
      "Programming language used to add interactivity to web pages",
      "A coffeeshop from Star Wars",
      "A type of font",
    ],
    answer: "Programming language used to add interactivity to web pages",
  },

  {
    text: "what is the symbold for a constant?",
    options: ["item", "const", "let", "var"],
    answer: "const",
  },
  {
    text: "How do you create a function in JavaScript?",
    options: ["item", "const", "function", "var"],
    answer: "function",
  },
  {
    text: "How do you use loops in JavaScript?",
    options: ["loops", "const", "let", "var"],
    answer: "loops",
  },
  {
    text: "How do you use strings in JavaScript?",
    options: ["item", "const", "let", "strings"],
    answer: "strings",
  },
];
// I learned this way to enter questions and answers from Faisal Mohammed
// event handler function to handle click events in question section
// this function decides what happens next
function clickDoesWhat(event) {
  // get current target
  const currentTarget = event.currentTarget;

  // get target
  const target = event.target;

  // check if click originates from li only
  // check if target element is li element
  if (target.tagName === "LI") {
    // get the option the user clicked on
    const value = target.getAttribute("data-value");

    // get the question the user answered
    const question = questions[questionIndex].text;

    // build an answer object that contains question and answer
    const answer = {
      question,
      value,
      playerScore,
    };

    // store score in local storage
    storeInLS("score", playerScore);

    if (
      answer.value === questions[questionIndex].answer &&
      questionIndex <= questions.length
    ) {
      correctAnswer();
    } else {
      wrongAnswer();
    }

    if (questionIndex < questions.length - 1) {
      // go to next question if not the last question
      // increment the question index by 1
      questionIndex += 1;

      // remove question
      clearQuestion();
      // render question
      showQuestion();
    } else {
      gameOver();
    }
  }
}
// I lerned that I needed this function from Faisal Mohammed
// function to render question to page
function showQuestion() {
  // get current question
  const currentQuestion = questions[questionIndex];

  // create section
  const section = document.createElement("section");
  section.setAttribute("class", "content-section question-container");
  section.setAttribute("id", "question-container");

  // create h2
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "question");
  // TODO: this should be the dynamic question title
  h2.textContent = `${questionIndex + 1}. ${currentQuestion.text}`;

  // create ul and append 4 li
  const ul = document.createElement("ul");
  ul.setAttribute("class", "question-list");

  // TODO: loop over options to create and append li to ul
  const li1 = document.createElement("li");
  li1.setAttribute("class", "list-item");
  li1.setAttribute("data-value", currentQuestion.options[0]);
  li1.textContent = currentQuestion.options[0];

  const li2 = document.createElement("li");
  li2.setAttribute("class", "list-item");
  li2.setAttribute("data-value", currentQuestion.options[1]);
  li2.textContent = currentQuestion.options[1];

  const li3 = document.createElement("li");
  li3.setAttribute("class", "list-item");
  li3.setAttribute("data-value", currentQuestion.options[2]);
  li3.textContent = currentQuestion.options[2];

  const li4 = document.createElement("li");
  li4.setAttribute("class", "list-item");
  li4.setAttribute("data-value", currentQuestion.options[3]);
  li4.textContent = currentQuestion.options[3];

  ul.append(li1, li2, li3, li4);

  // append h2 and ul to section
  section.append(h2, ul);

  // append question section to main element
  mainElement.append(section);

  // add event listener on question section
  section.addEventListener("click", clickDoesWhat);
}
// I learned how to do this from Faisal Mohammed

function gameOver() {
  document.querySelector("#clock").remove();

  document.getElementById("question-container").remove();

  // create section
  const section = document.createElement("section");
  section.setAttribute("class", "high-score-form-section title alert");
  section.setAttribute("name", "high-score-form");
  section.setAttribute("id", "high-score-form");

  // create h1
  const h1 = document.createElement("h1");
  h1.textContent = "GAME OVER";

  // create h2
  const h2 = document.createElement("h2");
  h2.setAttribute("class", "title alert");
  h2.textContent = "Submit your high score";

  // Create Form Field

  const form = document.createElement("form");

  const inputDiv = document.createElement("div");
  inputDiv.setAttribute("class", "form-control");

  const input = document.createElement("input");
  input.setAttribute("id", "Initials");
  input.setAttribute("class", "form-input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter Initials");

  inputDiv.append(input);

  //   Create submit button

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "btn-2");
  button.textContent = "Submit";

  form.append(inputDiv, button);

  section.append(h1, h2, form);

  mainElement.append(section);

  // add event listener for form submission
  form.addEventListener("submit", saveScore);
}

function showTime() {
  // this is going to make a countdown timer appear out of thin air becuase its hidden in the secton part of the HTML
  const timerArea = document.createElement("section");
  timerArea.setAttribute("class", "content-section timer-container");
  timerArea.setAttribute("id", "timer-container");
  // this is the timer element and its name is clock, which now exists in the content section of the HTML
  const timerElement = document.createElement("div");
  timerElement.textContent = "Time Remaining" + countdownClock;
  timerElement.setAttribute("class", "card-timer");
  timerElement.setAttribute("class", "large-font timer-count");
  timerElement.setAttribute("id", "clock");
  timerElement.setAttribute("display", "flex");

  // append h2 and ul to section
  timerArea.append(timerElement);

  // append question section to main element
  mainElement.append(timerArea);
}

function timeStart() {
  var timerElement = document.querySelector("#clock");
  startButton.disabled = true;
  const timerTick = () => {
    if (countdownClock <= 0) {
      clearInterval(clock);

      gameOver();
    } else {
      countdownClock -= 1;
      timerElement.textContent = "Time Remaining: " + countdownClock;
    }
  };
  const clock = setInterval(timerTick, 1000);
}

// function to render the results
function saveScore(event) {
  event.preventDefault();

  // get full name from input
  initials = document.getElementById("Initials").value;

  // validate
  if (initials) {
    // if valid then store feedbackResults in LS
    const score = JSON.parse(localStorage.getItem("score"));

    // push the results back to LS
    storeInLS("allScores", score);

    const final = JSON.parse(localStorage.getItem("allScores"));

    // remove form
    document.getElementById("high-score-form").remove();

    // create section
    const section = document.createElement("section");
    section.setAttribute("class", "high-score-form-section title alert");
    section.setAttribute("name", "high-score-form");

    // create h1
    const h1 = document.createElement("h1");
    //   h1.setAttribute("class", "question");
    h1.textContent = "HIGH SCORES";
    section.append(h1);

    // create h2
    for (var i = 0; i < final.length; i++) {
      let hs1 = document.createElement("h2");
      hs1.setAttribute("class", "title alert");
      hs1.textContent = final[i].name + " " + final[i].score;
      section.append(hs1);
    }

    mainElement.append(section);
  } else {
    alert("Please enter your initials!");
  }
}

// this is what happens if you get the answer right
function correctAnswer() {
  countdownClock += 0;
  playerScore += 10;
  correctLog++;

  if (questionIndex < questions.length) {
    return playerScore;
  } else {
    clearInterval(clock);
    countdownClock = 0;
  }
}

// this is what happens if you get the answer wrong
function wrongAnswer() {
  countdownClock -= 10;
  if (countdownClock <= 0) {
    clearInterval(clock);
    console.log(playerScore);
    // clearQuestion ();
    countdownClock = 0;
  }
}

// function to remove banner from page
function clearBanner() {
  bannerArea.remove();
}

// function to remove question section from page
function clearQuestion() {
  // console.log("remove question");

  document.getElementById("question-container").remove();
}

const initialiseLocalStorage = () => {
  const highScoreFromLS = JSON.parse(localStorage.getItem("score"));
  const allScoresFromLS = JSON.parse(localStorage.getItem("allScores"));

  if (!highScoreFromLS) {
    localStorage.setItem("score", JSON.stringify([]));
  }

  if (!allScoresFromLS) {
    // if not exist set LS to have feedbackResults as an empty array
    localStorage.setItem("allScores", JSON.stringify([]));
  }
};

let storeInLS = (key, value) => {
  const arrayFromLS = JSON.parse(localStorage.getItem(key, value));

  // set scores for high scores table in LS
  if (key === "allScores") {
    arrayFromLS.push({ name: initials, score: value });
    localStorage.setItem(key, JSON.stringify(arrayFromLS));
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// order of events that are told to happen when the start button is clicked
function clickStartButton() {
  //   initialise local storage
  initialiseLocalStorage();

  // remove banner section
  clearBanner();

  // render timer section
  showTime();

  // render question
  showQuestion();

  //   Starts the timer
  timeStart();
}

// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", clickStartButton);
