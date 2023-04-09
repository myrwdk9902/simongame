// global variables
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false;
var level = 0;

// keypress functions
$(document).keypress(function (){
    if (!started) {
        nextSequence();
        started = true;
        $("#level-title").text("Level "+ level);
    }   
});
// button click functions
$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});
// sequence function
function nextSequence () {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level++;
    $("#level-title").text("Level "+ level);  
}
//play sound function
function playSound(name){
    var audio = new Audio ("sounds/"+name+".mp3");
    audio.play();
}

//animation function
function animatePress(currentColour){
        $("#"+ currentColour).addClass("pressed");
        setTimeout(function(){
            $("#"+ currentColour).removeClass("pressed");
        },100);
}
// check answer function
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else {
        var audio = new Audio ("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}
// start over functions
function startOver() {
    level = 0
    gamePattern = [];
    started = false;
}