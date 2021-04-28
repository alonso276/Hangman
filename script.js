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

const correctLetters = [];
const wrongLetters = [];

//*Show hidden words
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

//*Update the wrong letters

function updateWrongLettersEl() {
	// console.log('update wrong');
	wrongLettersEl.innerHTML = `
	
	${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
	${wrongLetters.map((letter) => `<span>${letter}</span>)`)}
	
	`;

	figureParts.forEach((part, index) => {
		const errors = wrongLetters.length;

		//means there's an error as index start at 0

		if (index < errors) {
			part.style.display = 'block';
		} else {
			part.style.display = 'none';
		}
	});

	//*check if we have lost

	if (wrongLetters.length === figureParts.length) {
		finalMessage.innerText = 'Unfortunately you lost! 😩';
		popup.style.display = 'flex';
	}
}

//*Show notification

function showNotification() {
	notification.classList.add('show');

	setTimeout(() => {
		notification.classList.remove('show');
	}, 2000);
}

//*keydown letter press

window.addEventListener('keydown', (e) => {
	// console.log(e.keyCode);

	//only works if I hit a letter
	if (e.keyCode >= 65 && e.keyCode <= 90) {
		// console.log(123);
		//!it gives us the letter
		const letter = e.key;

		if (selectedWord.includes(letter)) {
			if (!correctLetters.includes(letter)) {
				correctLetters.push(letter);

				displayWord();
			} else {
				showNotification();
			}
		} else {
			if (!wrongLetters.includes(letter)) {
				wrongLetters.push(letter);

				updateWrongLettersEl();
			} else {
				showNotification();
			}
		}
	}
});

// *restart game and play again

playAgainBtn.addEventListener('click', () => {
	//Empty arrays
	correctLetters.splice(0);
	wrongLetters.splice(0);

	selectedWord = words[Math.floor(Math.random() * words.length)];

	displayWord();
	updateWrongLettersEl();
	popup.style.display = 'none';
});

displayWord();
