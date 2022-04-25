import { PETS } from '../../db/pets.js';
import { createCard } from './createCard.js';
import { shuffle } from './shuffle.js';

const cardsContainer = document.querySelector('.our-friends-cards-container');
const firstPageBtn = document.querySelector('#first-page');
const prevPageBtn = document.querySelector('#prev-page');
const currentPageBlock = document.querySelector('#current-page');
const nextPageBtn = document.querySelector('#next-page');
const lastPageBtn = document.querySelector('#last-page');

let currentPage = 1;
let cardOnPage;

function generateAllCards() {
	let allCards = [];
	const middle = Math.round((PETS.length - 1) / 2);
	let leftArr = [...PETS.slice(0, middle)];
	let rightArr = [...PETS.slice(middle)];

	for (let i = 0; i < 6; i++) {
		let shuffled = [...shuffle(leftArr), ...shuffle(rightArr)];
		allCards.push(...shuffled);
	}

	return allCards;
}

function moveToPage(cards, number, countPages) {
	let startIndex = cardOnPage * (number - 1);
	let endIndex = cardOnPage * number;

	const visibleCards = cards
		.slice(startIndex, endIndex)
		.map((item) => createCard(item));

	cardsContainer.innerHTML = '';
	cardsContainer.append(...visibleCards);

	currentPageBlock.textContent = number;
	switchActiveBtn(countPages);
}

function switchActiveBtn(countPages) {
	firstPageBtn.classList.remove('button-inactive', 'button-active');
	prevPageBtn.classList.remove('button-inactive', 'button-active');
	nextPageBtn.classList.remove('button-inactive', 'button-active');
	lastPageBtn.classList.remove('button-inactive', 'button-active');
	if (currentPage === 1) {
		firstPageBtn.classList.add('button-inactive');
		prevPageBtn.classList.add('button-inactive');
		nextPageBtn.classList.add('button-active');
		lastPageBtn.classList.add('button-active');
	} else if (currentPage === countPages) {
		firstPageBtn.classList.add('button-active');
		prevPageBtn.classList.add('button-active');
		nextPageBtn.classList.add('button-inactive');
		lastPageBtn.classList.add('button-inactive');
	} else {
		firstPageBtn.classList.add('button-active');
		prevPageBtn.classList.add('button-active');
		nextPageBtn.classList.add('button-active');
		lastPageBtn.classList.add('button-active');
	}
}

function controlsInit(cards) {
	const countPages = cards.length / cardOnPage;
	moveToPage(cards, currentPage, countPages);
	switchActiveBtn(countPages);

	firstPageBtn.addEventListener('click', () => {
		currentPage = 1;
		moveToPage(cards, currentPage, countPages);
	});

	prevPageBtn.addEventListener('click', () => {
		if (currentPage > 1) {
			currentPage--;
			moveToPage(cards, currentPage, countPages);
		}
	});

	nextPageBtn.addEventListener('click', () => {
		if (currentPage < countPages) {
			currentPage++;
			moveToPage(cards, currentPage, countPages);
		}
	});

	lastPageBtn.addEventListener('click', () => {
		currentPage = countPages;
		moveToPage(cards, currentPage, countPages);
	});
}

function paginationInit() {
	const cards = generateAllCards();

	const clientWidth = document.documentElement.clientWidth;
	if (clientWidth < 1280 && clientWidth >= 768) {
		cardOnPage = 6;
	} else if (clientWidth < 768) {
		cardOnPage = 3;
	} else {
		cardOnPage = 8;
	}

	// window.addEventListener('resize', (e) => {
	// 	const innerWidth = e.currentTarget.innerWidth;
	// 	if (innerWidth < 1280 && innerWidth >= 768) {
	// 		const newCountCardOnPage = 6;
	// 		if (cardOnPage !== newCountCardOnPage) {
	// 			cardOnPage = newCountCardOnPage;
	// 			controlsInit(cards);
	// 		}
	// 	} else if (innerWidth < 768) {
	// 		const newCountCardOnPage = 3;
	// 		if (cardOnPage !== newCountCardOnPage) {
	// 			cardOnPage = newCountCardOnPage;
	// 			controlsInit(cards);
	// 		}
	// 	} else {
	// 		const newCountCardOnPage = 8;
	// 		if (cardOnPage !== newCountCardOnPage) {
	// 			cardOnPage = newCountCardOnPage;
	// 			controlsInit(cards);
	// 		}
	// 	}
	// });

	controlsInit(cards);
}

paginationInit();
