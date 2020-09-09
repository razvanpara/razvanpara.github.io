function startGame(event)
{
	setElementsDisabledProperty(".choice", true);
	let userChoice = document.getElementById("userChoice");
	let computerChoice = document.getElementById("computerChoice");
	let result = document.getElementById("message");
	let userChoiceValue = getChoice(event.target.value);
	let computerChoiceValue = getChoice(Math.random());
	userChoice.innerHTML = userChoiceValue;
	computerChoice.innerHTML = "Choosing..."
	setTimeout(()=>{
		computerChoice.innerHTML = computerChoiceValue;
		result.innerHTML = compareChoices(userChoiceValue,computerChoiceValue);
		setElementsDisabledProperty(".choice", false);
	}, 1000);
	
}

function setElementsDisabledProperty(querySelector, value){
	var elements = document.querySelectorAll(querySelector);
	for(let i = 0; i< elements.length; i++){
		elements[i].disabled = value;
	}
}

function getChoice(d)
{
	return d <= 0.33 ? "Rock"
					 : d <= 0.66 ? "Paper"
					             : "Scissors";
}

function compareChoices(user, computer){
	if(user === computer)
	{ 
		return "Tie!";
	}
	else if((user === "Rock" && computer === "Scissors")  ||
		    (user === "Scissors" && computer === "Paper") ||
			(user === "Paper" && computer === "Rock"))
	{
		return "You win!";
	}else
	{
		return "Computer wins!";
	}	
}