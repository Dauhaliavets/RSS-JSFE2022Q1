import { openModal } from "./modal.js";

function createCard({ id, img, name }) {
	const card = document.createElement('div');
	card.classList.add('card');
	card.dataset.id = id;

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

	card.addEventListener('click', (e) => {
		const id = e.currentTarget.dataset.id;
		openModal(id);
	});

	return card;
}

export { createCard };