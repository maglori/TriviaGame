var Timer = $('#Timer');
var Question = $('#Question').children().eq(0);
//set answers to the correct input text.
var Answer1 = $('#Question').children().eq(1).children('span').eq(0);
var Answer2 = $('#Question').children().eq(1).children('span').eq(1);
var Answer3 = $('#Question').children().eq(1).children('span').eq(2);
var Answer4 = $('#Question').children().eq(1).children('span').eq(3);
var timesUp = false;
var rightAnswer = false;
var wrongAnswer = false;
var randomQuest;
var timeInterval;

var counter = 25;

var triviaPool = [ 
{
	"Question":"Question 1",
	"Answer 1":"Answer 1",
	"Answer 2":"Answer 2",
	"Answer 3":"Answer 3",
	"Answer 4":"Answer 4",
	"Correct":"Answer 4"
},
{
	"Question":"Question 2",
	"Answer 1":"Answer 1",
	"Answer 2":"Answer 2",
	"Answer 3":"Answer 3",
	"Answer 4":"Answer 4",
	"Correct":"Answer 1"
},
{
	"Question":"Question 3",
	"Answer 1":"Answer 1",
	"Answer 2":"Answer 2",
	"Answer 3":"Answer 3",
	"Answer 4":"Answer 4",
	"Correct":"Answer 3"
},
{
	"Question":"Question 4",
	"Answer 1":"Answer 1",
	"Answer 2":"Answer 2",
	"Answer 3":"Answer 3",
	"Answer 4":"Answer 4",
	"Correct":"Answer 2"
}];



$(document).ready(function() {

//timer at beginning of game
Timer.html('Time remaining: ' + counter + ' seconds');

$("#button").click(function() {
	userAnswer = $("input[name='answer']:checked").val();
	if (randomQuest["Correct"] == userAnswer){
		rightAnswer = true;
	}
	else {
		wrongAnswer = true;
	}
	gameEnd();
	counter = 0;
	clearInterval(timerInterval);
});

//code to run when we want to populate the questionnaire and timer.
var populate = function(){
	counter = 25
	Timer.html('Time remaining: ' + counter + ' seconds');
	randomQuest = triviaPool[Math.floor(Math.random() * (triviaPool.length))];
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
		setTimeout(populate, 4000);
	}
	else if (rightAnswer === true ) {
		hideForm();
		$('#container').append('<h4>Woo!! You guessed right!!</h4>')
		rightAnswer = false;
		setTimeout(populate, 4000);
	}
	else if (wrongAnswer === true) {
		hideForm();
		$('#container').append('<h4>Boo!! You guessed wrong!! The right answer was: ' + randomQuest["Correct"] + '</h4>')
		wrongAnswer = false;
		setTimeout(populate, 4000);
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