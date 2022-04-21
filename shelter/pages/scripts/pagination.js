import { PETS } from '../../db/pets.js';
import { createCard } from './createCard.js';

const body = document.querySelector('body');
const cardsContainer = document.querySelector('.our-friends-cards-container');
const firstPage = document.querySelector('#first-page');
const prevPage = document.querySelector('#prev-page');
const currentPageBlock = document.querySelector('#current-page');
const nextPage = document.querySelector('#next-page');
const lastPage = document.querySelector('#last-page');

let currentPage = 1;
let cardOnPage;

function shuffle(array) {
	let curInd = array.length;
	let randInd;

	while (curInd !== 0) {
		randInd = Math.floor(Math.random() * curInd);
		curInd--;
		[array[curInd], array[randInd]] = [array[randInd], array[curInd]];
	}

	return array;
}

function generateAllCards() {
	let allCards = [];
	const middle = Math.round((PETS.length - 1) / 2);
	let leftArr = [...PETS.slice(0, middle)];
	let rightArr = [...PETS.slice(middle)];

	for (let i = 0; i < 6; i++) {
		let shuffled = [...shuffle(leftArr), ...shuffle(rightArr)];
		allCards.push(...shuffled);
	}

	console.log('allPets: ', allCards);
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
	firstPage.classList.remove('button-inactive');
	prevPage.classList.remove('button-inactive');
	nextPage.classList.remove('button-inactive');
	lastPage.classList.remove('button-inactive');
	if (currentPage === 1) {
		firstPage.classList.add('button-inactive');
		prevPage.classList.add('button-inactive');
	} else if (currentPage === countPages) {
		nextPage.classList.add('button-inactive');
		lastPage.classList.add('button-inactive');
	} else {
		firstPage.classList.add('button-active');
		prevPage.classList.add('button-active');
		nextPage.classList.add('button-active');
		lastPage.classList.add('button-active');
	}
}

function controlsInit(cards) {
	const countPages = cards.length / cardOnPage;
	moveToPage(cards, currentPage, countPages);
	switchActiveBtn(countPages);

	firstPage.addEventListener('click', () => {
		currentPage = 1;
		moveToPage(cards, currentPage, countPages);
	});

	prevPage.addEventListener('click', () => {
		if (currentPage > 1) {
			currentPage--;
			moveToPage(cards, currentPage, countPages);
		}
	});

	nextPage.addEventListener('click', () => {
		if (currentPage < countPages) {
			currentPage++;
			moveToPage(cards, currentPage, countPages);
		}
	});

	lastPage.addEventListener('click', () => {
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

	window.addEventListener('resize', (e) => {
		if (
			e.currentTarget.innerWidth < 1280 &&
			e.currentTarget.innerWidth >= 768
		) {
			const newCountCardOnPage = 6;
			if (cardOnPage !== newCountCardOnPage) {
				cardOnPage = newCountCardOnPage;
				controlsInit(cards);
			}
		} else if (e.currentTarget.innerWidth < 768) {
			const newCountCardOnPage = 3;
			if (cardOnPage !== newCountCardOnPage) {
				cardOnPage = newCountCardOnPage;
				controlsInit(cards);
			}
		} else {
			const newCountCardOnPage = 8;
			if (cardOnPage !== newCountCardOnPage) {
				cardOnPage = newCountCardOnPage;
				controlsInit(cards);
			}
		}
	});

	controlsInit(cards);
}

paginationInit();
