const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById(
	'final-message-reveal-word'
);

/*from head to leg*/
const figureParts = document.querySelectorAll('.figure-part');

const words = ['application', 'programming', 'interface', 'wizard'];

/*how to generate a random word*/
let selectedWord = words[Math.floor(Math.random() * words.length)];

// console.log(selectedWord);

const correctLetters = ['p', 'r', 'o', 'g', 'r', 'a', 'm', 'm', 'i', 'n', 'g'];
const wrongLetters = [];

//Show hidden words
function displayWord() {
	//! convert string into array ----> .split()
	//! convert array into string --> .join()

	wordEl.innerHTML = `
	
	${selectedWord
		.split('')
		.map(
			(letter) => `
			<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`
		)
		.join('')}`;

	//replace new line with empty st
	const innerWord = wordEl.innerText.replace(/\n/g, '');

	if (innerWord === selectedWord) {
		finalMessage.innerText = 'Congratulations! You won!😃';
		popup.style.display = 'flex';
	}

	// console.log(wordEl.innerText, innerWord);
}

displayWord();
