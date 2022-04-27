const burgerBtn = document.querySelector('.header-burger-menu');
const nav = document.querySelector('.header-nav');
const navItemLinks = document.querySelectorAll('.nav-list__item-link');
const overlay = document.querySelector('.body__overlay');
const body = document.querySelector('body');
const html = document.querySelector('html');

function handlerBurgerClick() {
	html.classList.toggle('html__lock');
	body.classList.toggle('body_active');
	burgerBtn.classList.toggle('burger-btn_active');
	nav.classList.toggle('nav_active');
}

function closeMenu() {
	if (nav.classList.contains('nav_active')) {
		html.classList.remove('html__lock');
		body.classList.remove('body_active');
		burgerBtn.classList.remove('burger-btn_active');
		nav.classList.remove('nav_active');
	}
}

burgerBtn.addEventListener('click', handlerBurgerClick);
navItemLinks.forEach((link) => link.addEventListener('click', closeMenu));
overlay.addEventListener('click', closeMenu);
