$(document).ready(function () {
    var options = [
        {
            question: "Vehicles from which country use the international registration letters WG?",
            choice: ["Grenada", "West Germany", "Paris", "South Africa"],
            answer: 0,
        },
        {
            question: "What's the common term for a cerebrovascular accident?",
            choice: ["Heart attack", "Collapsed lung", "Stroke", "Suffocation"],
            answer: 2,
        },
        {
            question: "Kopi luwak is a very expensive type of what?",
            choice: ["Spice", "Caviar", "Coffee", "Rice variety"],
            answer: 2,
        },
        {
            question: "Which planet spins the fastest?",
            choice: ["Mars", "Earth", "Jupiter", "The Moon"],
            answer: 2,
        },
        {
            question: "Which country gave the United States the 'Statue of Liberty'?",
            choice: ["England", "France", "Canada", "Germany"],
            answer: 1,
        },
        {
            question: "What number does 'giga' stand for?",
            choice: ["One billion", "Ten thousand", "Ten million", "One hundred million",],
            answer: 0,
        },
        {
            question: "What mathematical symbol did math whiz Ferdinand von Lindemann determine to be a transcendental number in 1882?",
            choice: ["Square root", "Theta", "Infinity", "Pi"],
            answer: 3,
        },
        {
            question: "What temperature does water boil at? ",
            choice: ["200 C", "300 C", "100 C", "75 C"],
            answer: 2,
        },
        {
            question: "Where is the smallest bone in the body?",
            choice: ["Ear", "Finger", "Toe", "Nose"],
            answer: 0,
        },
        {
            question: "How many dots are there on two six-sided dice?",
            choice: ["36", "38", "52", "42"],
            answer: 3,
        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];



    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
        $("#start").hide();
        runTimer();
        displayQuestion();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })
    //timer start
    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random() * options.length);
        pick = options[index];



        //iterate through answer array and display

        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);
            //assign array position to it so can check answer
            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);
            //		
        }



        //click function to select answer and outcomes
        $(".answerchoice").on("click", function () {
            //grab array position from userGuess
            userGuess = parseInt($(this).attr("data-guessvalue"));

            //correct guess or wrong guess outcomes
            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Correct!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        // $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 15;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);


    }

    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();

    })

})