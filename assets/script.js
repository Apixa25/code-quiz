// this targets the start button in the HTML
const startButton = document.getElementById("start-btn");

// this points to where on the page I want the timer to be
const TimerSection = document.getElementById("card-timer");

// target banner section
const bannerSection = document.getElementById("banner");

questionContainer = document.getElementById("question-container");

// target main element
const mainElement = document.getElementById("main");

// total time on the clock
let countdownClock = 20;

// current question index
let questionIndex = 0;

// Player Score variable
let playerScore= 10;
let correctLog = 0;
let fullName = ""

var timer;
var timerCount;




// all questions array
const questions = [
    {
        text: "What is JavaScript?",
        options: ["A way to write ancient scrolls", "Programming language used to add interactivity to web pages", "", "A type of font"],
        answer: "Programming language used to add interactivity to web pages",
    },

    {
        text: "what is the symbold for a constant?",
        options: ["item", "const", "let", "var"],
        answer: "const",
    },
];

function renderTimer() {

    // this is going to make a countdown timer appear out of thin air becuase its hidden in the secton part of the HTML
    const TimerSection = document.createElement("section");
    TimerSection.setAttribute("class", "content-section timer-container");
    TimerSection.setAttribute("id", "timer-container");
    // this is the timer element and its name is clock, which now exists in the content section of the HTML 
    const timerElement = document.createElement("div"); 
    timerElement.textContent = "Time Remaining" + countdownClock;
    timerElement.setAttribute("class", "card-timer");
    timerElement.setAttribute("class", "large-font timer-count");
    timerElement.setAttribute("id", "clock");
    timerElement.setAttribute("display", "flex");

    // append h2 and ul to section
    TimerSection.append(timerElement); 

    // append question section to main element
    mainElement.append(TimerSection); 

};  

function startTimer() {
    var timerElement = document.querySelector("#clock");
    startButton.disabled = true;
    const timerTick =  () => {
        if (countdownClock <= 0) {
            clearInterval(clock);

            renderGameOver();

      } else {
        countdownClock -= 1;
        timerElement.textContent = "Time Remaining: " + countdownClock;
    }
};
const clock = setInterval(timerTick, 1000);
};

function renderGameOver() {

    document.querySelector("#clock").remove();
    
    document.getElementById("question-container").remove();
 

      // create section
      const section = document.createElement("section");
      section.setAttribute("class", "high-score-form-section title alert");
      section.setAttribute("name", "high-score-form");
      section.setAttribute("id", "high-score-form");

      // create h1
      const h1 = document.createElement("h1");
      h1.textContent = ("GAME OVER");  

    // create Image
    const img = document.createElement("img");
    img.setAttribute("src", "./images/egghead.jpg");
    img.setAttribute("id", "game-over-image")
    

        // create h2
    const h2 = document.createElement("h2");
    h2.setAttribute("class", "title alert");
    h2.textContent = ("Submit your high score");

    // Create Form Field 

    const form = document.createElement("form");

    const inputDiv = document.createElement("div");
  inputDiv.setAttribute("class", "form-control");


  const input = document.createElement("input");
  input.setAttribute("id", "full-name");
  input.setAttribute("class", "form-input");
  input.setAttribute("type", "text");
  input.setAttribute("placeholder", "Enter full name");

  inputDiv.append(input);

//   Create submit button

  const button = document.createElement("button");
  button.setAttribute("type", "submit");
  button.setAttribute("class", "btn-2");
  button.textContent = "Submit";

  form.append(inputDiv, button);

  section.append(h1, img, h2, form);

  mainElement.append(section);

  // add event listener for form submission
  form.addEventListener("submit", handleFormSubmit);

};


// order of events that are told to happen when the start button is clicked
function handleStartButtonClick() {

    //   initialise local storage
//   initialiseLocalStorage();

    // remove banner section
//   removeBanner();

    // render timer section
  renderTimer();

    // render question
//   renderQuestion();

    //   Starts the timer
  startTimer();
};




// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", handleStartButtonClick);