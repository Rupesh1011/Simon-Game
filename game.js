var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","yellow","blue","green"];
var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
      nextSequence();
      started = true;
    }
  });

function nextSequence(){
    userClickedPattern = [];
    $("#level-title").text("level " + level);
    level +=1;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100); 

    playSound(randomChosenColour);

}     




$(".btn").click(function handler(event){
    var userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);

    $("#" + userChosenColour).fadeOut(100).fadeIn(100); 

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    switch(name){
    
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;

        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;

        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;

        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break;

        default:
            break;
    }
}

function animatePress(currentColour){
    currentColour = userClickedPattern[userClickedPattern.length - 1];

    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}



