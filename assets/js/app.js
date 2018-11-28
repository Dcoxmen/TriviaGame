$(document).ready(function() {
  //Empty variable for counter
  var questCount = 0;

  // variable for timeout length between questions
  var answerTimeout = 3000;

  //Empty score variables
  var correct = 0;
  var incorrect = 0;
  var missed = 0;

  //This is an empty userAnswer array to be filled.
  var userAnswer = [];

  //Array of question objects grouped by question, choices and answerChoice
  var questions = [
    {
      question: "The real St. Nicholas was born in what modern-day country?",
      choices: ["Germany", "Iraq", "Turkey", "Sweden"],
      answerChoice: 2
    },
    {
      question:
        "Rudolph the Red-Nosed Reindeer was created as a promotion for what department store?",
      choices: [
        "Nordstom",
        "J.C. Penny",
        "Macy's",
        "Montgomery Ward",
        "Saks Fifth Ave"
      ],
      answerChoice: 3
    },
    {
      question:
        "What song does Lucy ask Schroeder to play on his piano in  A Charlie Brown Christmas ?",
      choices: [
        "Jingle Bells",
        "Silent Night",
        "Joy to the World",
        "Frosty the Snowman"
      ],
      answerChoice: 0
    },
    {
      question: "Eggnog was first consumed in what U.S. city?",
      choices: [
        "Provincetown, Massachusetts",
        "Jamestown, Virginia",
        "Boston, Massachusetts",
        "New York, New York"
      ],
      answerChoice: 1
    },
    {
      question: "Who tried to steal Christmas from the Whos of Whoville?",
      choices: [
        "Scrooge",
        "Abominable Snowman",
        "Old Man Potter",
        "Grinch",
        "Horton Who"
      ],
      answerChoice: 3
    },
    {
      question: "Which State produces the most of the nations Christmas Trees?",
      choices: ["Massachusetts", "Oregon", "Washington", "New York"],
      answerChoice: 1
    },
    {
      question:
        "In The Twelve Days of Christmas, there are how many drummers drumming?",
      choices: ["12", "8", "11", "4", "7"],
      answerChoice: 0
    }
  ];

  //Function that submits the answer
  function submitAnswer() {
    $("#submit").on("click", function(e) {
      e.preventDefault();
      userAnswer.length = 0;

      //Push user answer value to question
      var userPick = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      userAnswer.push(userPick);
      console.log(userAnswer);
      nextQuestion();
    });
  }

  //Timer variable and increment variable that uses timerRun and decrement functions. Adjust question length in timeleft variable
  var timeLeft = 10;
  var increment;

  function timerRun() {
    increment = setInterval(decrement, 1000);
  }

  function decrement() {
    timeLeft--;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    if (timeLeft === 0) {
      timerStop();
      userAnswer.length = 0;
      //Push user answer to question
      var userPick = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      userAnswer.push(userPick);
      console.log(userAnswer);
      nextQuestion();
    }
  }
  //Reset timer function display
  function timerReset() {
    timeLeft = 10;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
  }
  //Display timer function
  function displayTimer() {
    $("#time-left").html("Your Holiday Knowledge Review");
  }
  //Stop Timer function
  function timerStop() {
    clearInterval(increment);
  }

  //Function to display the response radio button options
  function createRadios() {
    var responseOptions = $("#responses");
    //Empty array for user answer
    responseOptions.empty();

    for (var i = 0; i < questions[questCount].choices.length; i++) {
      responseOptions.append(
        '<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' +
          [i] +
          '"><div class="twd-opt">' +
          questions[questCount].choices[i] +
          "</div></input><br></label>"
      );
    }
  }

  //Function to display the question
  function questionDisplay() {
    questionClear();
    timerReset();
    $(".marked-question").html(questions[questCount].question);
    //Calling the function to display response radio button
    createRadios();
    //Creating submit button
    $("#submit-btn").append(
      '<button type="submit" class="btn btn-default" id="submit">' +
        "Submit" +
        "</button>"
    );
    timerRun();
    submitAnswer();
  }

  //Display start of game and display start button
  function displayStart() {
    $("#content").append(
      '<a href="#" class="btn btn-primary btn-lg" id="start-button">' +
        "Start" +
        "</a>"
    );
    //Start the game
    $("#start-button").on("click", function(event) {
      event.preventDefault();
      //Displays the first question and reset timer
      startQuestion();
      timerReset();
    });
  }

  //Reset for end of game zero out all variables and reset timer
  function reset() {
    questCount = 0;
    correct = 0;
    incorrect = 0;
    missed = 0;
    userAnswer = [];
    timerReset();
  }

  //Display end of game results.
  function displayEnd() {
    questionClear();
    $("#content").append(
      "<h3>" +
        "Correct answers: " +
        correct +
        "</h3><br><h3>" +
        "Incorrect answers: " +
        incorrect +
        "</h3><br><h3>" +
        "Unanswered questions: " +
        missed +
        '</h3><br><br><a href="#" class="btn btn-primary btn-lg" id="restart-button">' +
        "Play Game Again!" +
        "</a>"
    );
    //Restart game
    $("#restart-button").on("click", function(event) {
      event.preventDefault();
      //Displays the first question
      reset();
      questionClear();
      displayStart();
    });
  }

  //Function to clear the question
  function questionClear() {
    var questionDiv = $(".marked-question");
    questionDiv.empty();

    var responsesDiv = $("#responses");
    responsesDiv.empty();

    var submitDiv = $("#submit-btn");
    submitDiv.empty();

    var contentDiv = $("#content");
    contentDiv.empty();

    timerStop();
  }

  //Showing whether answer was right/wrong
  function questionCheck() {
    questionClear();
    var correctAnswer = questions[questCount].answerChoice;
    //if correct append congats and add correct score
    if (userAnswer[0] == questions[questCount].answerChoice) {
      $("#content").append(
        "<h3>" + "Correct answer! You are a christmas genius!" + "</h3>"
      );
      correct++;
      displayTimer();
      //displays time expired and correct answer scores missed answer
    } else if (userAnswer[0] === undefined) {
      $("#content").append(
        "<h3>" +
          "You are Out of Time!" +
          "</h3><br><br><h3>" +
          "The correct answer was: " +
          questions[questCount].choices[correctAnswer] +
          "</h3>"
      );
      missed++;
      displayTimer();
      //displays and counts incorrectly choosen answer
    } else {
      $("#content").append(
        "<h3>" +
          "Sorry, wrong answer." +
          "</h3><br><br><h3>" +
          "The correct answer: " +
          questions[questCount].choices[correctAnswer] +
          "</h3>"
      );
      incorrect++;
      displayTimer();
    }
  }

  //Function to change the question
  function nextQuestion() {
    questionCheck();
    //Incrementing the question count by 1
    questCount++;
    //If the count is the same as the length of the question array, the counts reset to 0
    if (questCount === questions.length) {
      setTimeout(displayEnd, answerTimeout);
    } else {
      setTimeout(questionDisplay, answerTimeout);
    }
  }

  //Function to go to the first question
  function startQuestion() {
    var startContent = $("#content");
    startContent.empty();
    questionDisplay();
  }

  //Displays the start of game
  displayStart();
});
