$(document).ready(function() {
  //Empty variable for counter
  var questionCounter = 0;

  // variable for timeout
  var answerTimeout = 2000;

  //Empty score variables
  var correct = 0;
  var incorrect = 0;
  var missed = 0;

  //This is an empty userAnswer array to be filled.
  var userAnswer = [];

  //Array of questions grouped by question, choices and choicesAnswer
  var questions = [
    {
      question: "The real St. Nicholas was born in what modern-day country?",
      choices: ["Germany", "Iraq", "Turkey", "Sweden"],
      choicesAnswer: 2
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
      choicesAnswer: 3
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
      choicesAnswer: 0
    },
    {
      question: "Eggnog was first consumed in what U.S. city?",
      choices: [
        "Provincetown, Massachusetts",
        "Jamestown, Virginia",
        "Boston, Massachusetts",
        "New York, New York"
      ],
      choicesAnswer: 1
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
      choicesAnswer: 3
    },
    {
      question: "Which State produces the most of the nations Christmas Trees?",
      choices: ["Massachusetts", "Oregon", "Washington", "New York"],
      choicesAnswer: 1
    },
    {
      question:
        "In The Twelve Days of Christmas, there are how many drummers drumming?",
      choices: ["12", "8", "11", "4", "7"],
      choicesAnswer: 0
    }
  ];

  //Function that submits the answer
  function submitAnswer() {
    $("#submit").on("click", function(e) {
      e.preventDefault();
      userAnswer.length = 0;

      //Push user answer value to question
      var userSelection = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      userAnswer.push(userSelection);
      console.log(userAnswer);
      nextQ();
    });
  }

  //Timer variable and increment variable that uses runTimer and decrement functions. Adjust question lenght in timeleft variable
  var timeLeft = 10;
  var increment;

  function runTimer() {
    increment = setInterval(decrement, 1000);
  }

  function decrement() {
    timeLeft--;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
    if (timeLeft === 0) {
      stopTimer();
      userAnswer.length = 0;
      //Push user answer to question
      var userSelection = $(
        "#responses input:radio[name=optionsRadios]:checked"
      ).val();
      userAnswer.push(userSelection);
      console.log(userAnswer);
      nextQ();
    }
  }
  //Reset timer function display
  function resetTimer() {
    timeLeft = 10;
    $("#time-left").html("Time remaining: " + timeLeft + " seconds");
  }
  //Display timer function
  function displayTimer() {
    $("#time-left").html("Answer Review");
  }
  //Stop Timer function
  function stopTimer() {
    clearInterval(increment);
  }

  //Function to display the response radio button options
  function createRadios() {
    var responseOptions = $("#responses");
    //Empty array for user answer
    responseOptions.empty();

    for (var i = 0; i < questions[questionCounter].choices.length; i++) {
      responseOptions.append(
        '<label><input type="radio" name="optionsRadios" id="optionsRadios2" value="' +
          [i] +
          '"><div class="twd-opt">' +
          questions[questionCounter].choices[i] +
          "</div></input><br></label>"
      );
    }
  }

  //Function to display the question
  function displayQ() {
    clearQ();
    resetTimer();
    $(".questionX").html(questions[questionCounter].question);
    //Calling the function to display response radio button
    createRadios();
    //Creating submit button
    $("#submit-div").append(
      '<button type="submit" class="btn btn-default" id="submit">' +
        "Submit" +
        "</button>"
    );
    runTimer();
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
      firstQ();
      resetTimer();
    });
  }

  //Reset for end of game zero out all variables and reset timer
  function reset() {
    questionCounter = 0;
    correct = 0;
    incorrect = 0;
    missed = 0;
    userAnswer = [];
    resetTimer();
  }

  //Display end of game results.
  function displayEnd() {
    clearQ();
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
      clearQ();
      displayStart();
    });
  }

  //Function to clear the question
  function clearQ() {
    var questionDiv = $(".questionX");
    questionDiv.empty();

    var responsesDiv = $("#responses");
    responsesDiv.empty();

    var submitDiv = $("#submit-div");
    submitDiv.empty();

    var contentDiv = $("#content");
    contentDiv.empty();

    stopTimer();
  }

  //Showing whether answer was right/wrong
  function checkQ() {
    clearQ();
    var correctAnswer = questions[questionCounter].choicesAnswer;
    //if correct append congats and add correct score
    if (userAnswer[0] == questions[questionCounter].choicesAnswer) {
      $("#content").append(
        "<h3>" + "Congratulations! You chose the right answer!" + "</h3>"
      );
      correct++;
      displayTimer();
      //displays time expired and correct answer scores missed answer
    } else if (userAnswer[0] === undefined) {
      $("#content").append(
        "<h3>" +
          "Time's up!" +
          "</h3><br><br><h3>" +
          "The correct answer was: " +
          questions[questionCounter].choices[correctAnswer] +
          "</h3>"
      );
      missed++;
      displayTimer();
      //displays and counts incorrectly choosen answer
    } else {
      $("#content").append(
        "<h3>" +
          "You chose the wrong answer." +
          "</h3><br><br><h3>" +
          "The correct answer was: " +
          questions[questionCounter].choices[correctAnswer] +
          "</h3>"
      );
      incorrect++;
      displayTimer();
    }
  }

  //Function to change the question
  function nextQ() {
    checkQ();
    //Incrementing the question count by 1
    questionCounter++;
    //If the count is the same as the length of the question array, the counts reset to 0
    if (questionCounter === questions.length) {
      setTimeout(displayEnd, answerTimeout);
    } else {
      setTimeout(displayQ, answerTimeout);
    }
  }

  //Function to go to the first question
  function firstQ() {
    var startContent = $("#content");
    startContent.empty();
    displayQ();
  }

  //Displays the start of game
  displayStart();
});
