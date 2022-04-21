import { PETS } from '../../db/pets.js';
const modal = document.querySelector('.modal');

function createModalTemplate({
	id,
	name,
	img,
	type,
	breed,
	description,
	age,
	inoculations,
	diseases,
	parasites,
}) {
	const template = `
	<div class="modal-image-wrapper">
		<img class="modal-image" src=${img} alt=${name}/>
	</div>
	<div class="modal-content">
		<h3 class="modal-content__name">${name}</h3>
		<h4 class="modal-content__subname">
			<span class="type">${type}</span>
			<span>-</span>
			<span class="breed">${breed}</span>
		</h4>
		<p class="modal-content__description">
			${description}
		</p>
		<ul class="modal-content__about-list">
			<li class="modal-about-list__item">
				<span class="modal-item-title">Age: </span
				><span class="modal-item-descr">${age}</span>
			</li>
			<li class="modal-about-list__item">
				<span class="modal-item-title">Inoculations: </span
				><span class="modal-item-descr">${inoculations}</span>
			</li>
			<li class="modal-about-list__item">
				<span class="modal-item-title">Diseases: </span
				><span class="modal-item-descr">${diseases}</span>
			</li>
			<li class="modal-about-list__item">
				<span class="modal-item-title">Parasites: </span
				><span class="modal-item-descr">${parasites}</span>
			</li>
		</ul>
	</div>
`;

	const modalTemplate = document.createElement('div');
	modalTemplate.classList.add("modal-window");
	modalTemplate.setAttribute('id', id);

	const btnClose = document.createElement('a');
	btnClose.classList.add('button', 'button-close');
	btnClose.addEventListener('click', closeModal);

	modalTemplate.insertAdjacentHTML('afterbegin', template);
	modalTemplate.insertAdjacentElement('beforeend', btnClose)

	return modalTemplate;
}

function openModal(petsId) {
	const pet = PETS.filter((item) => item.id === petsId);
	const template = createModalTemplate(...pet);
	modal.appendChild(template);
	modal.classList.add('modal-overlay-show');
}

function closeModal() {
	modal.innerHTML = '';
	modal.classList.remove('modal-overlay-show');
}

modal.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal')) {
		closeModal();
	}
})

export { openModal };
