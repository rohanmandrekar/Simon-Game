
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

$(document).on("keydown",function(){
	if (gameStart == false){
	$('h1').text("Level "+level);
	gameStart=true;
	nextSequence();
	}
});

$(".btn").on("click", function(){
	
	$('h1').text("Level "+level);
	var userChosenColour = $(this).attr('id');
	$(this).fadeOut(100).fadeIn(100);
	userClickedPattern.push(userChosenColour);
	playSound(userChosenColour);
	animatePress(userChosenColour);
	if(checkAnswer(userClickedPattern.length)==true){
		if(userClickedPattern.length == level){
		setTimeout(nextSequence(),1000);
	}
	}
	else{
		playSound('wrong');
		$('body').addClass("game-over");
		$('h1').text("Game Over, Press Any Key to Restart");
		setTimeout(()=>{
			$('body').removeClass("game-over");
		},200);
		startOver();

	}

});

function nextSequence(){
	level+=1;
	userClickedPattern = [];
	var randomNumber= Math.floor(Math.random()*3);
	var randomChosenColour = buttonColors[randomNumber];
	gamePattern.push(randomChosenColour);
	playSound(randomChosenColour);
	animatePress(randomChosenColour);
	$('#'+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}

function playSound(chosenColour){
	var sound= new Audio('sounds/'+chosenColour+'.mp3');
	sound.play();
}

function animatePress(currentColour){

	$("#"+currentColour).addClass("pressed");
	setTimeout(()=>{
		$("#"+currentColour).removeClass("pressed");
	},50);
}

function checkAnswer(currentLevel){
	console.log(currentLevel);
	console.log("user clicked "+userClickedPattern);
	console.log("game "+gamePattern);
	if (userClickedPattern[currentLevel-1]==gamePattern[currentLevel-1]){
		console.log("here");
			return true;
			}
	else{
		return false;
	}
}

function startOver(){
	level=0;
	gamePattern=[];
	userClickedPattern=[];
	gameStart = false;
}