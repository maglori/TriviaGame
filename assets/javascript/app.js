var Timer = $('#Timer');
var Question = $('#Question').children().eq(0);

//set answers to the input text areas.
var Answer1 = $('#Question').children().eq(1).children('span').eq(0);
var Answer2 = $('#Question').children().eq(1).children('span').eq(1);
var Answer3 = $('#Question').children().eq(1).children('span').eq(2);
var Answer4 = $('#Question').children().eq(1).children('span').eq(3);

var timesUp = false;
var rightAnswer = false;
var wrongAnswer = false;

var randomQuest;
var triviaCount = 0;
var timeInterval;
var correctCount = 0;

var counter = 25;

var triviaPool = [ 
{
	"Question":"What is your Name?",
	"Answer 1":"Homer J Simpson",
	"Answer 2":"Sir Robin",
	"Answer 3":"Sir Galahad the Pure",
	"Answer 4":"Sir Lancelot the Brave",
	"Correct":"Sir Lancelot the Brave"
},
{
	"Question":"What is your quest?",
	"Answer 1":"I seek the holy grail",
	"Answer 2":"become a great javascript coder :o)",
	"Answer 3":"make mad $$$",
	"Answer 4":"finish this quiz xD",
	"Correct":"I seek the holy grail"
},
{
	"Question":"What is your favorite color?",
	"Answer 1":"#FFFFFF",
	"Answer 2":"Red",
	"Answer 3":"Blue.. I mean yellow!",
	"Answer 4":"Earth tones",
	"Correct":"Blue.. I mean yellow!"
},
{
	"Question":"What is the top flight velocity of an unladen swallow?",
	"Answer 1":"What would a swallow be laden with?",
	"Answer 2":"What do you mean? African or European?",
	"Answer 3":"4",
	"Answer 4":"I truly don't know",
	"Correct":"What do you mean? African or European?"
}];

$(document).ready(function() {

//timer at beginning of game
Timer.html('Time remaining: ' + counter + ' seconds');

$("#button").click(function() {
	userAnswer = $("input[name='answer']:checked").next().text();
	if (randomQuest["Correct"] === userAnswer){
		rightAnswer = true;
		correctCount++;
	}
	else {
		wrongAnswer = true;
	}
	gameEnd();
	counter = 0;
	clearInterval(timerInterval);
});

var finalScreen = function() {
		clearInterval(timerInterval);
		$("#container").html('<span>Game over! You guessed ' + correctCount + ' right!</span>');
	}

//code to run when we want to populate the questionnaire and timer.
var populate = function(){
	counter = 25;
	Timer.html('Time remaining: ' + counter + ' seconds');
	randomQuest = triviaPool[triviaCount];
	if (triviaCount < triviaPool.length) {
		triviaCount++;
	}
	else {
		finalScreen();
	}
	Question.html(randomQuest.Question);
	Answer1.text(randomQuest["Answer 1"]);
	Answer2.text(randomQuest["Answer 2"]);
	Answer3.text(randomQuest["Answer 3"]);
	Answer4.text(randomQuest["Answer 4"]);
	$("#Question").show();
	timerInterval = setInterval(Countdown, 1000);
	$('h4').remove()
}

populate()


//code to run when the game ends to clear the way for the win/lose screen.
var hideForm = function() {
	$("#Question").hide();
}

//when the time runs out, clear interval.
var timeOut = function() { 
	if (counter === 0) {
	timesUp = true;
	clearInterval(timerInterval);
	}
};


//what to do when the game ends in any of the 3 possible ways
var gameEnd = function() {
	if (timesUp === true) {
		hideForm();
		$('#container').append('<h4>Boo!! Time ran out!! The right answer was: ' + randomQuest["Correct"] + '</h4>')
		timesUp = false;
		setTimeout(populate, 2500);
	}
	else if (rightAnswer === true ) {
		hideForm();
		$('#container').append('<h4>Woo!! You guessed right!!</h4>')
		rightAnswer = false;
		setTimeout(populate, 2500);
	}
	else if (wrongAnswer === true) {
		hideForm();
		$('#container').append('<h4>Boo!! You guessed wrong!! The right answer was: ' + randomQuest["Correct"] + '</h4>')
		wrongAnswer = false;
		setTimeout(populate, 2500);
	}
};	

//timer tick off function that we will run to subtract 1 second at 1 second intervals
var Countdown = function() {
	if (counter > 0) {
		counter--;
		Timer.html('Time remaining: ' + counter + ' seconds');
	};
	timeOut();
	gameEnd();
}

timerInterval = setInterval(Countdown, 1000);

});