

var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red","blue","green","yellow"];

var started = false;

var level = 0;


$("body").keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});




$(".btn").click(function(){
   userChosenColour = $(this).attr("id");
   console.log(userChosenColour);
   
   userClickedPattern.push(userChosenColour);
   console.log(userClickedPattern);
   

   var userLastAnswerIndex = userClickedPattern.length - 1;
   console.log(userLastAnswerIndex);
   
   var userLastAnswer = userClickedPattern[userLastAnswerIndex];
   console.log(userLastAnswer);

   animatePress(userChosenColour);
   playSound(userChosenColour);
   checkAnswer(userLastAnswerIndex);
});


function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("success");

        if(userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            },1000);
            
        }
    }
    else {
        console.log("failed");

        audio = new Audio ("./sounds/wrong.mp3");
        audio.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        } , 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    started = false;
    level = 0;
}

function nextSequence() {

    userClickedPattern=[]; 

    level = level + 1;
    $("#level-title").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random()*4);
    console.log(randomNumber);
    
    randomChosenColour = buttonColours[randomNumber];
    console.log(randomChosenColour);
    
    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    
    

    var gameLastIndex = gamePattern.length - 1;
    console.log(gameLastIndex);
   
    var gameLast = gamePattern[gameLastIndex];
    console.log(gameLast);

   animatePress(randomChosenColour);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $('#' + currentColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    $('#' + currentColour).addClass("pressed");
    setTimeout(function() {
        $('#' + currentColour).removeClass("pressed");
    }, 100);
}






