import { PETS } from '../../db/pets.js';
import { createCard } from './createCard.js';
import { shuffle } from './shuffle.js';

const cardsContainer = document.querySelector('.slider-cards');
const leftBtn = document.querySelector('.button-left');
const rightBtn = document.querySelector('.button-right');

function dataClosure(data) {
	const step = 3;
	const count = data.length;
	let startPosition = 0;
	let endPosition = startPosition + step;
	let dataCards;

	return function (direction) {
		switch (direction) {
			case 'left':
				return function () {
					if (startPosition - step < 0) {
						startPosition = startPosition + count - step;
						endPosition = endPosition - step;
						dataCards = [
							...data.slice(startPosition),
							...data.slice(0, endPosition),
						];
					} else {
						if (endPosition - step < 0) {
							endPosition = endPosition + count - step;
							startPosition = endPosition - step;
							dataCards = data.slice(startPosition, endPosition);
						} else {
							startPosition = startPosition - step;
							endPosition = endPosition - step;
							dataCards = data.slice(startPosition, endPosition);
						}
					}
					return dataCards;
				};

			case 'right':
				return function () {
					if (startPosition + step > count - 1) {
						startPosition = startPosition - count + step;
						endPosition = endPosition + step;
						dataCards = data.slice(startPosition, endPosition);
					} else {
						if (endPosition + step > count - 1) {
							startPosition = startPosition + step;
							endPosition = endPosition - count + step;
							dataCards = [
								...data.slice(startPosition),
								...data.slice(0, endPosition),
							];
						} else {
							endPosition = endPosition + step;
							startPosition = startPosition + step;
							dataCards = data.slice(startPosition, endPosition);
						}
					}
					return dataCards;
				};

			default:
				break;
		}
	};
}

let move = dataClosure(shuffle(PETS));

function handlerBtnLeft(e) {
	const direction = e.target.dataset.direction;
	let dataAfterMove = move(direction)();

	if (direction === 'left') {
		leftBtn.removeEventListener('click', handlerBtnLeft);
		rightBtn.removeEventListener('click', handlerBtnRight);

		dataAfterMove.forEach((item) =>
			cardsContainer.insertAdjacentElement('afterbegin', createCard(item))
		);
		
		cardsContainer.classList.remove('transition-right');
		cardsContainer.classList.add('transition-left');
	}
}

function handlerBtnRight(e) {
	const direction = e.target.dataset.direction;
	let dataAfterMove = move(direction)();

	if (direction === 'right') {
		leftBtn.removeEventListener('click', handlerBtnLeft);
		rightBtn.removeEventListener('click', handlerBtnRight);

		dataAfterMove.forEach((item) =>
			cardsContainer.insertAdjacentElement('beforeend', createCard(item))
		);

		cardsContainer.classList.remove('transition-left');
		cardsContainer.classList.add('transition-right');
	}
}

cardsContainer.append(...PETS.slice(0, 3).map((item) => createCard(item)));

leftBtn.addEventListener('click', handlerBtnLeft);
rightBtn.addEventListener('click', handlerBtnRight);

cardsContainer.addEventListener('animationend', (e) => {
	cardsContainer.classList.remove('transition-left');
	cardsContainer.classList.remove('transition-right');

	const cards = cardsContainer.querySelectorAll('div.card');

	if (e.animationName === 'slide-to-left') {
		cards.forEach((item, ind) => {
			if (ind > 2) item.remove();
		});
	} else {
		cards.forEach((item, ind) => {
			if (ind < 3) item.remove();
		});
	}

	leftBtn.addEventListener('click', handlerBtnLeft);
	rightBtn.addEventListener('click', handlerBtnRight);
});
