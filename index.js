var levelCount=0;
var gamePattern = [];
var userPattern = [];
var colors = ["green","red","yellow","blue"];
var started = false;

$(document).on("keydown",function(){
    if(!started){
        nextSequence();
        started=true;
    }
})

$(".btn").on("click",function(key){
    var chosenColor= key.target.id;
    userPattern.push(chosenColor);
    playSound(chosenColor);
    animate(chosenColor);
    checkIfClickedInSequence(userPattern.length-1);
})

function nextSequence(){
    userPattern=[];
    levelCount++;
    $("h1").text("Level "+levelCount);
    var randomNumber= Math.floor(Math.random()*3);
    var randonChosenColor= colors[randomNumber];
    gamePattern.push(randonChosenColor);

    $("#"+randonChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randonChosenColor);
}

function checkIfClickedInSequence(currentLevel){
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
        if (userPattern.length === gamePattern.length){
          setTimeout(function() {
            nextSequence();
          }, 1000);
        }
      } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
  
        setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);
  
        startOver();
      }
}
function playSound(randomChosenColor){
    var audio= new Audio("sounds/"+ randomChosenColor+ ".mp3");
    audio.play();
}

function animate(randomChosenColor){
    $("#"+randomChosenColor).addClass("pressed");
    setTimeout(function(){
        $("#"+randomChosenColor).removeClass("pressed");
    },200);
}

function startOver(){
    gamePattern=[];
    userPattern=0;
    started=false;
    levelCount=0;
}

