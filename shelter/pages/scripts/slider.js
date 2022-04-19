const cardsContainer = document.querySelector('.slider-cards');
const leftBtn = document.querySelector('.button-left');
const rightBtn = document.querySelector('.button-right');
const URL = '../../db/pets.json';

function createCard({ img, name }) {
	const card = document.createElement('div');
	card.classList.add('card');

	const cardImage = document.createElement('img');
	cardImage.classList.add('card__image');
	cardImage.setAttribute('src', `${img}`);
	cardImage.setAttribute('alt', `${name}`);

	const cardTitle = document.createElement('h4');
	cardTitle.classList.add('card__title');
	cardTitle.textContent = name;

	const cardBtn = document.createElement('a');
	cardBtn.classList.add('button', 'button_secondary');
	cardBtn.textContent = 'Learn more';

	card.append(cardImage, cardTitle, cardBtn);

	return card;
}

async function getData() {
	let response = await fetch(URL);
	let json = await response.json();
	return json;
}

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

function handlerSliderBtn(e, moveFunction) {
	const direction = e.target.dataset.direction;
	let dataAfterMove = moveFunction(direction)();
	cardsContainer.innerHTML = '';
	cardsContainer.append(...dataAfterMove.map((item) => createCard(item)));
}

async function init() {
	let data = await getData();
	let move = dataClosure(data);

	cardsContainer.append(...data.slice(0, 3).map((item) => createCard(item)));

	leftBtn.addEventListener('click', (e) => handlerSliderBtn(e, move));
	rightBtn.addEventListener('click', (e) => handlerSliderBtn(e, move));
}

init();
