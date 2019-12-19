var seconds = 25;
var correct = 0;
var incorrect = 0;
var unanswered = 0;

quizStart();

function quizStart() {
  const startButton = $("<button>")
    .text("Start")
    .addClass("buttonClass")
    .on("click", function() {
      playGame();
    });

  $("#quiz").append(startButton);
}
function playGame() {
  $("#quiz").empty();

  var timer = $("<div>").text(`You've got ${seconds} seconds remaining... `);

  $("#quiz").append(timer);

  interval = setInterval(function() {
    if (seconds === 0) {
      console.log("Your Time Is Up!");
      clearInterval(interval);
      addResults();
      showResults();
    } else {
      seconds--;
      timer.text(`You've got ${seconds} seconds remaining... "`);
    }
  }, 1000);

  for (let i = 0; i < questions.length; i++) {
    // console.log("questions.entries()", questions.entries());
    // console.log("questionChoice", questionChoice);
    // console.log("question", question);
    let triviaQuestion = $("<div>").addClass("questions");
    let question = $("<div>").text(questions[i].question);

    triviaQuestion.append(question);

    for (let j = 0; j < 4; j++) {
      console.log("questions[i]", questions[i]);
      console.log("question", question);
      let label = $("<label class='radio-inline'>").html(
        `<input type="radio" name="${questions[i].name}" value='${questions[i].answers[j]}'> ${questions[i].answers[j]}`
      );

      triviaQuestion.append(label);
    }

    $("#quiz").append(triviaQuestion);
  }
}
const stopButton = $("<button>")
  .text("Done")
  .addClass("buttonClass");

stopButton.on("click", function() {
  clearInterval(interval);
  addResults();
  showResults();
});

$("#quiz").append(stopButton);

function addResults() {
  let answers = $(`[name="${i}"]`);
  let answered = false;
  for (answer of answers) {
    if ($(answer).is(":checked")) {
      answered = true;
      if ($(answer).val() === questions[i].correctAnswer) {
        wins++;
      } else {
        losses++;
      }
    }
  }

  if (!answered) {
    unanswered++;
  }
}

function showResults() {
  $("#quiz").empty();

  const resultsDiv = $("<div>");

  const h1Tag = $("<h1 class='title'>")
    .text("You're Done!!")
    .css("font-size", "30px");
  const correctDisplay = $("<p>")
    .text(`Wins: ${correct}`)
    .css("text-align", "center");
  const incorrectDisplay = $("<p>")
    .text(`Losses: ${incorrect}`)
    .css("text-align", "center");
  const unansweredDisplay = $("<p>")
    .text(`Unanswered: ${unanswered}`)
    .css("text-align", "center");

  resultsDiv.append(h1Tag, correctDisplay, incorrectDisplay, unansweredDisplay);

  $("#game").append(resultsDiv);
}
