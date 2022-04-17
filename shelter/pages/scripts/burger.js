const burgerBtn = document.querySelector('.header-burger-menu');
const nav = document.querySelector('.header-nav');
const navItemLinks = document.querySelectorAll('.nav-list__item-link');
const html = document.querySelector('html');

const burgerMenuLogo = document.createElement('div');
burgerMenuLogo.classList.add('header-burger-menu-logo');
burgerMenuLogo.innerHTML = `
	<a href="../main/index.html" class="header-logo__link">
		<h1 class="header-logo__title">Cozy House</h1>
		<h3 class="header-logo__subtitle">Shelter for pets in Boston</h3>
	</a>
`;

function handlerBurgerClick() {
	burgerBtn.classList.toggle('burger-btn_active');
	if (nav.classList.contains('nav_active')) {
		burgerMenuLogo.remove();
		nav.classList.remove('nav_active');
		html.classList.remove('fixed-html');
	} else {
		nav.prepend(burgerMenuLogo);
		nav.classList.add('nav_active');
		html.classList.add('fixed-html');
	}
}

function closeMenu() {
	if (nav.classList.contains('nav_active')) {
		burgerBtn.classList.remove('burger-btn_active');
		burgerMenuLogo.remove();
		nav.classList.remove('nav_active');
		html.classList.remove('fixed-html');
	}
}

burgerBtn.addEventListener('click', handlerBurgerClick);
navItemLinks.forEach((link) => link.addEventListener('click', closeMenu));
