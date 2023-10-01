// target start button
const startButton = document.getElementById("start-btn");


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

var timer;
var timerCount;

const renderTimer = () => {

    // create section
    const TimerSection = document.createElement("section");
    TimerSection.setAttribute("class", "content-section timer-container");
    TimerSection.setAttribute("id", "timer-container");
    // Create timer 
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


// order of events that are told to happen when the start button is clicked
function handleStartButtonClick() {

    //   initialise local storage
//   initialiseLocalStorage();

    // remove banner section
//   removeBanner();

    // render timer section
  renderTimer ();

    // render question
//   renderQuestion();

    //   Starts the timer
  startTimer();
};




// Attach event listener to start button to call startGame function on click
startButton.addEventListener("click", handleStartButtonClick);